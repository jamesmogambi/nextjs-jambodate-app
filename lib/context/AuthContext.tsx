'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserProfile,
  UserPreferences,
  UserAccount,
  PhotoRecord,
  MatchRecord,
  MessageRecord,
  ReportRecord,
  BlockRecord,
  LikeRecord,
  VerificationRequest,
  ReportReason,
  Gender,
  RelationshipIntention,
  KenyanLocation,
} from '@/types';
import {
  auth,
  db,
  handleFirestoreError,
  OperationType,
} from '@/lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  getDocFromServer,
} from 'firebase/firestore';
import { uploadToCloudinary, isCloudinaryConfigured, type CloudinaryUploadResult } from '@/lib/cloudinary';
import {
  calculateAge,
  isAdult,
  calculateProfileCompletion,
  type ProfileCompletionResult,
} from '@/lib/utils';

export interface RegisterPayload {
  firstName: string;
  email: string;
  password: string;
  birthDate: string; // YYYY-MM-DD
  gender: Gender;
  county: string;
  phone?: string;
  agreedToTerms?: boolean;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  userAccount: UserAccount | null;
  userPreferences: UserPreferences | null;
  profileCompletion: ProfileCompletionResult;
  isLoading: boolean;
  authError: string | null;
  allProfiles: UserProfile[];
  likes: string[];
  passes: string[];
  matches: MatchRecord[];
  messages: Record<string, MessageRecord[]>;
  reports: ReportRecord[];
  blocks: string[];
  verificationRequests: VerificationRequest[];
  currentMatchCelebration: UserProfile | null;
   likesReceived: number;
  realReceivedLikers: string[];
  matchesCount: number;
  clearMatchCelebration: () => void;
  // Core Auth Operations
  registerWithEmail: (data: RegisterPayload) => Promise<boolean>;
  loginWithEmail: (email: string, password?: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<void>;
   logout: () => Promise<void>;
   // Profile & Onboarding Operations
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (data: Partial<UserPreferences>) => Promise<void>;
  completeOnboarding: (
    profileData: Partial<UserProfile>,
    prefsData?: Partial<UserPreferences>
  ) => Promise<void>;
  uploadPhoto: (file: File, index: number) => Promise<string>;
  // Matching & Messaging Operations
  likeProfile: (targetProfileId: string) => Promise<{ isMatch: boolean; matchedProfile?: UserProfile }>;
  passProfile: (targetProfileId: string) => void;
  sendMessage: (matchId: string, text: string) => void;
  blockUser: (targetProfileId: string) => void;
  reportUser: (targetProfileId: string, reason: ReportReason, details?: string) => void;
  unmatchUser: (matchId: string) => void;
  requestVerification: (selfieUrl: string, idDocumentUrl?: string) => Promise<void>;
  getIdToken: () => Promise<string | null>;
  adminApproveVerification: (requestId: string) => void;
  adminRejectVerification: (requestId: string) => void;
  adminToggleSuspend: (userId: string) => void;
  adminToggleBan: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEYS = {
  CURRENT_USER: 'jambodate_current_user',
  ALL_PROFILES: 'jambodate_all_profiles',
  LIKES: 'jambodate_likes',
  PASSES: 'jambodate_passes',
  MATCHES: 'jambodate_matches',
  MESSAGES: 'jambodate_messages',
  REPORTS: 'jambodate_reports',
  BLOCKS: 'jambodate_blocks',
  VERIFICATIONS: 'jambodate_verifications',
  PREFERENCES: 'jambodate_preferences',
  USER_ACCOUNT: 'jambodate_user_account',
};

async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Social & Matching state
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [passes, setPasses] = useState<string[]>([]);
  const [matches, setMatches] = useState<MatchRecord[]>([]);
  const [messages, setMessages] = useState<Record<string, MessageRecord[]>>({});
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);
  const [currentMatchCelebration, setCurrentMatchCelebration] = useState<UserProfile | null>(null);

   // Firestore-backed like/match counts for authenticated users
   const [realReceivedLikers, setRealReceivedLikers] = useState<string[]>([]);
  const [realSentLikers, setRealSentLikers] = useState<string[]>([]);

  // Test connection to Firestore on initialization
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        console.error('Firebase configuration check failed. Error:', error);
        const message = error instanceof Error ? error.message : String(error);
        if (
          message.includes('the client is offline') ||
          message.includes('Could not reach') ||
          message.includes('UNAVAILABLE') ||
          message.includes('NOT_FOUND')
        ) {
          console.error(
            'Please check your Firebase configuration. Verify your NEXT_PUBLIC_FIREBASE_* env vars and Firestore database ID.'
          );
        }
      }
    }
    testConnection();
  }, []);

  // Hydrate initial mock/community data and state
  useEffect(() => {
    try {
      const storedProfiles = localStorage.getItem(STORAGE_KEYS.ALL_PROFILES);
      if (storedProfiles) {
        setAllProfiles(JSON.parse(storedProfiles));
      } else {
        setAllProfiles([]);
      }

      const storedLikes = localStorage.getItem(STORAGE_KEYS.LIKES);
      if (storedLikes) setLikes(JSON.parse(storedLikes));

      const storedPasses = localStorage.getItem(STORAGE_KEYS.PASSES);
      if (storedPasses) setPasses(JSON.parse(storedPasses));

      const storedMatches = localStorage.getItem(STORAGE_KEYS.MATCHES);
      const storedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (storedMatches && storedMessages) {
        setMatches(JSON.parse(storedMatches));
        setMessages(JSON.parse(storedMessages));
      }

      const storedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (storedReports) setReports(JSON.parse(storedReports));

      const storedBlocks = localStorage.getItem(STORAGE_KEYS.BLOCKS);
      if (storedBlocks) setBlocks(JSON.parse(storedBlocks));

      const storedVerifications = localStorage.getItem(STORAGE_KEYS.VERIFICATIONS);
      if (storedVerifications) setVerificationRequests(JSON.parse(storedVerifications));
    } catch (e) {
      console.error('Error hydrating social state', e);
    }
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;
    let unsubscribePrefs: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (user) {
        try {
          // 1. Fetch or listen to Firestore profile: /profiles/{uid}
          const profileRef = doc(db, 'profiles', user.uid);
          unsubscribeProfile = onSnapshot(
            profileRef,
            (snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.data() as UserProfile;
                setCurrentUser(data);
                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data));
              } else {
                // If profile document hasn't been created yet, fall back to locally stored or new placeholder
                const localUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
                if (localUser) {
                  try {
                    const parsed = JSON.parse(localUser);
                    if (parsed.uid === user.uid || parsed.id === user.uid) {
                      setCurrentUser(parsed);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }
              }
            },
            (error) => {
              console.warn('Profile snapshot error:', error);
            }
          );

          // 2. Fetch or listen to User Preferences: /preferences/{uid}
          const prefsRef = doc(db, 'preferences', user.uid);
          unsubscribePrefs = onSnapshot(
            prefsRef,
            (snapshot) => {
              if (snapshot.exists()) {
                setUserPreferences(snapshot.data() as UserPreferences);
              }
            },
            (error) => {
              console.warn('Preferences snapshot error:', error);
            }
          );

          // 3. Fetch private user doc: /users/{uid}
          try {
            const userSnap = await getDoc(doc(db, 'users', user.uid));
            if (userSnap.exists()) {
              setUserAccount(userSnap.data() as UserAccount);
            }
          } catch (err) {
            console.warn('Users collection read error:', err);
          }
        } catch (err) {
          console.error('Error attaching user listeners:', err);
        } finally {
          setIsLoading(false);
        }
      } else {
        // No Firebase user authenticated: no active session. Real sessions are
        // restored from Firestore in the branch above, so stale localStorage is
        // ignored and private routes redirect unauthenticated visitors to home.
        setCurrentUser(null);
        setUserAccount(null);
        setUserPreferences(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
      if (unsubscribePrefs) unsubscribePrefs();
    };
  }, []);

   // Profiles subscription: surface real profiles from Firestore for authenticated users
   useEffect(() => {
    if (!firebaseUser) return undefined;

    const q = query(collection(db, 'profiles'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const realProfiles = snapshot.docs.map((docSnap) => docSnap.data() as UserProfile);
        setAllProfiles(realProfiles);
      },
      (error) => {
        console.warn('Real profiles subscription error:', error);
      }
    );

    return unsubscribe;
  }, [firebaseUser]);

  // Real likes/matches counts subscription (authenticated users only).
  // Per-user subcollections keep the data private to the account owner.
  useEffect(() => {
    if (!firebaseUser) return undefined;

    const uid = firebaseUser.uid;
    const unsubReceived = onSnapshot(
      collection(db, 'users', uid, 'likes_received'),
      (snapshot) => {
        setRealReceivedLikers(snapshot.docs.map((d) => (d.data() as LikeRecord).fromUserId));
      },
      (error) => {
        console.warn('likes_received subscription error:', error);
      }
    );
    const unsubSent = onSnapshot(
      collection(db, 'users', uid, 'likes_sent'),
      (snapshot) => {
        setRealSentLikers(snapshot.docs.map((d) => (d.data() as LikeRecord).toUserId));
      },
      (error) => {
        console.warn('likes_sent subscription error:', error);
      }
    );

    return () => {
      unsubReceived();
      unsubSent();
    };
  }, [firebaseUser]);

   // Save social state changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
      localStorage.setItem(STORAGE_KEYS.PASSES, JSON.stringify(passes));
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
      localStorage.setItem(STORAGE_KEYS.BLOCKS, JSON.stringify(blocks));
      localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(verificationRequests));
    }
  }, [allProfiles, likes, passes, matches, messages, reports, blocks, verificationRequests, isLoading, firebaseUser]);

  // Profile completion calculation
  const profileCompletion = calculateProfileCompletion(currentUser, userPreferences);

   // Firestore-backed like/match counts for authenticated users
   const likesReceived = realReceivedLikers.length;
   const matchesCount = realReceivedLikers.filter((id) => realSentLikers.includes(id)).length;

  const getIdToken = useCallback(async (): Promise<string | null> => {
    if (!firebaseUser) return null;
    try {
      return await firebaseUser.getIdToken();
    } catch {
      return null;
    }
  }, [firebaseUser]);

  // 1. Registration with Email, Password & Kenyan Verification
  const registerWithEmail = async (data: RegisterPayload): Promise<boolean> => {
    setAuthError(null);

    // Strict 18+ enforcement
    if (!data.birthDate || !isAdult(data.birthDate)) {
      const errorMsg = 'JamboDate is strictly for adults aged 18 and older. Underage profiles are not permitted.';
      setAuthError(errorMsg);
      throw new Error(errorMsg);
    }

    if (!data.firstName.trim() || !data.email.trim() || !data.password) {
      const errorMsg = 'Please complete all required registration fields.';
      setAuthError(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      // 1. Create Firebase Auth user
      const credential = await createUserWithEmailAndPassword(auth, data.email.trim(), data.password);
      const uid = credential.user.uid;
      const calculatedAge = calculateAge(data.birthDate);

      // 2. Create private user document in `users/{uid}` (PII isolation)
      const privateUserRecord: UserAccount = {
        uid,
        email: data.email.trim().toLowerCase(),
        firstName: data.firstName.trim(),
        birthDate: data.birthDate,
        gender: data.gender,
        county: data.county,
        phone: data.phone || '',
        agreedToTerms: true,
        agreedToPrivacy: true,
        agreedToGuidelines: true,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, 'users', uid), privateUserRecord);
      } catch (err) {
        console.error('Error saving users record:', err);
      }

      // 3. Create initial public profile in `profiles/{uid}`
      const initialProfile: UserProfile = {
        id: uid,
        uid,
        name: data.firstName.trim(),
        age: calculatedAge,
        birthDate: data.birthDate,
        gender: data.gender,
        location: data.county,
        relationshipIntention: 'Serious relationship',
        bio: '',
        occupation: '',
        education: '',
        languages: ['English', 'Swahili'],
        interests: [],
        lifestyle: {},
        photos: [],
        verificationStatus: 'unverified',
        subscriptionTier: 'free',
        completionPercentage: 25,
        onboardingCompleted: false,
        isOnline: true,
        lastActive: 'Just now',
        createdAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, 'profiles', uid), initialProfile);
      } catch (err) {
        console.error('Error saving profile record:', err);
      }

      // 4. Create default matching preferences in `preferences/{uid}`
      const initialPrefs: UserPreferences = {
        uid,
        ageRange: [Math.max(18, calculatedAge - 5), calculatedAge + 7],
        genderPreference: data.gender === 'Man' ? ['Woman'] : ['Man'],
        preferredLocation: data.county,
        relationshipIntentions: ['Serious relationship', 'Marriage'],
        verifiedOnly: false,
        updatedAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, 'preferences', uid), initialPrefs);
      } catch (err) {
        console.error('Error saving preferences record:', err);
      }

      // Set local state
      setCurrentUser(initialProfile);
      setUserAccount(privateUserRecord);
      setUserPreferences(initialPrefs);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(initialProfile));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setAuthError(message);
      throw err;
    }
  };

  // 2. Email / Password Login
  const loginWithEmail = async (email: string, password?: string): Promise<boolean> => {
    setAuthError(null);

    if (!email.trim() || !password) {
      const message = 'Please enter your email address and password.';
      setAuthError(message);
      throw new Error(message);
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const uid = cred.user.uid;

      // Fetch profile
      try {
        const snap = await getDoc(doc(db, 'profiles', uid));
        if (snap.exists()) {
          const profile = snap.data() as UserProfile;
          setCurrentUser(profile);
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(profile));
        }
      } catch (err) {
        console.warn('Error reading profile doc:', err);
      }
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setAuthError(message);
      throw err;
    }
  };

  // 3. Password Reset
  const sendPasswordReset = async (email: string): Promise<void> => {
    if (!email.trim()) {
      throw new Error('Please enter your email address to reset password.');
    }
    await sendPasswordResetEmail(auth, email.trim());
  };

  // 4. Logout
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('SignOut error:', e);
    }
    setCurrentUser(null);
    setUserAccount(null);
    setUserPreferences(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  // 5. Update Profile
  const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
    if (!currentUser) return;
    const updated: UserProfile = {
      ...currentUser,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    setCurrentUser(updated);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
    setAllProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

    if (firebaseUser?.uid && (currentUser.uid === firebaseUser.uid || currentUser.id === firebaseUser.uid)) {
      try {
        await setDoc(doc(db, 'profiles', firebaseUser.uid), data, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `profiles/${firebaseUser.uid}`);
      }
    }
  };

  // 7. Update Preferences
  const updatePreferences = async (data: Partial<UserPreferences>): Promise<void> => {
    const updated: UserPreferences = {
      ageRange: data.ageRange || userPreferences?.ageRange || [21, 35],
      genderPreference: data.genderPreference || userPreferences?.genderPreference || ['Woman'],
      preferredLocation: data.preferredLocation || userPreferences?.preferredLocation || 'Any',
      relationshipIntentions: data.relationshipIntentions || userPreferences?.relationshipIntentions || ['Serious relationship'],
      verifiedOnly: data.verifiedOnly ?? userPreferences?.verifiedOnly ?? false,
      updatedAt: new Date().toISOString(),
    };
    setUserPreferences(updated);

    if (firebaseUser?.uid) {
      try {
        await setDoc(doc(db, 'preferences', firebaseUser.uid), updated, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `preferences/${firebaseUser.uid}`);
      }
    }
  };

  // 8. Photo Upload with Cloudinary
  const uploadPhoto = async (file: File, index: number): Promise<string> => {
    const uid = firebaseUser?.uid || currentUser?.uid || 'user_demo';
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');

    try {
      // 1. Try Cloudinary upload
      if (isCloudinaryConfigured()) {
        const cloudinaryFolder = `jamboDate_profiles/${uid}`;
        const result: CloudinaryUploadResult = await uploadToCloudinary(
          file,
          cloudinaryFolder
        );

        // 2. Create photo document in `photos` collection
        if (firebaseUser?.uid) {
          const photoDocId = `photo_${timestamp}_${Math.random().toString(36).slice(2, 6)}`;
          try {
            await setDoc(doc(db, 'photos', photoDocId), {
              id: photoDocId,
              userId: uid,
              url: result.secure_url,
              cloudinaryPublicId: result.public_id,
              storagePath: cloudinaryFolder,
              orderIndex: index,
              isPrimary: index === 0,
              createdAt: new Date().toISOString(),
            });
          } catch (err) {
            console.warn('Error writing photo document:', err);
          }
        }

        return result.secure_url;
      }

      // 3. Fallback: read as Data URL so user is never blocked
      console.warn('Cloudinary not configured, using client-side Data URL fallback');
      return readFileAsDataURL(file);
    } catch (error) {
      console.error('Cloudinary upload failed, falling back to Data URL:', error);
      return readFileAsDataURL(file);
    }
  };

  // 9. Complete Onboarding
  const completeOnboarding = async (
    profileData: Partial<UserProfile>,
    prefsData?: Partial<UserPreferences>
  ): Promise<void> => {
    if (!currentUser) return;

    const completion = calculateProfileCompletion(
      { ...currentUser, ...profileData },
      prefsData ? { ...userPreferences, ...prefsData } : userPreferences
    );

    const mergedProfile: UserProfile = {
      ...currentUser,
      ...profileData,
      onboardingCompleted: true,
      completionPercentage: completion.percentage,
      updatedAt: new Date().toISOString(),
    };

    setCurrentUser(mergedProfile);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mergedProfile));
    setAllProfiles((prev) => prev.map((p) => (p.id === mergedProfile.id ? mergedProfile : p)));

    const uid = firebaseUser?.uid || (currentUser.id.startsWith('user_') ? null : currentUser.id);

    if (uid) {
      try {
        // Save to profiles
        await setDoc(doc(db, 'profiles', uid), {
          ...profileData,
          onboardingCompleted: true,
          completionPercentage: completion.percentage,
          updatedAt: new Date().toISOString(),
        }, { merge: true });

        // Update users table onboarding status
        await updateDoc(doc(db, 'users', uid), {
          onboardingCompleted: true,
          updatedAt: new Date().toISOString(),
        });

        // Save preferences
        if (prefsData) {
          await setDoc(doc(db, 'preferences', uid), {
            ...prefsData,
            updatedAt: new Date().toISOString(),
          }, { merge: true });
        }
      } catch (err) {
        console.error('Error updating onboarding in Firestore:', err);
      }
    }
  };

  // Social / Discovery actions
  const clearMatchCelebration = () => setCurrentMatchCelebration(null);

  const likeProfile = async (targetProfileId: string): Promise<{ isMatch: boolean; matchedProfile?: UserProfile }> => {
    if (!currentUser) return { isMatch: false };

    if (!likes.includes(targetProfileId)) {
      setLikes((prev) => [...prev, targetProfileId]);
    }

   // Persist like to Firestore for authenticated users so the
   // sidebar counts reflect real activity. Best-effort — never blocks the flow.
   if (firebaseUser && currentUser.uid === firebaseUser.uid) {
      const likeId = `like_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const record: LikeRecord = {
        id: likeId,
        fromUserId: currentUser.uid,
        toUserId: targetProfileId,
        createdAt: new Date().toISOString(),
      };
      try {
        await addDoc(collection(db, 'users', targetProfileId, 'likes_received'), record);
        await addDoc(collection(db, 'users', currentUser.uid, 'likes_sent'), record);
      } catch (err) {
        console.warn('Failed to persist like to Firestore:', err);
      }
    }

    // Real mutual matching requires a Firestore round-trip to check whether the
    // target user has also liked the current user; that wiring is not present
    // yet, so a like is persisted but does not immediately create a match.
    return { isMatch: false };
  };

  const passProfile = (targetProfileId: string) => {
    if (!passes.includes(targetProfileId)) {
      setPasses((prev) => [...prev, targetProfileId]);
    }
  };

  const sendMessage = (matchId: string, text: string) => {
    if (!currentUser || !text.trim()) return;
    const match = matches.find((m) => m.id === matchId);
    if (!match) return;

    const recipientId = match.users.find((u) => u !== currentUser.id) || '';

    const newMsg: MessageRecord = {
      id: `msg_${Date.now()}`,
      matchId,
      senderId: currentUser.id,
      recipientId,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setMessages((prev) => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), newMsg],
    }));

    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId
          ? {
              ...m,
              lastMessage: text.trim(),
              lastMessageAt: new Date().toISOString(),
              lastMessageSenderId: currentUser.id,
            }
          : m
      )
    );
  };

  const blockUser = (targetProfileId: string) => {
    if (!blocks.includes(targetProfileId)) {
      setBlocks((prev) => [...prev, targetProfileId]);
    }
    setMatches((prev) => prev.filter((m) => !m.users.includes(targetProfileId)));
  };

  const reportUser = (targetProfileId: string, reason: ReportReason, details?: string) => {
    if (!currentUser) return;
    const targetProfile = allProfiles.find((p) => p.id === targetProfileId);
    const newReport: ReportRecord = {
      id: `rep_${Date.now()}`,
      reporterId: currentUser.id,
      reporterName: currentUser.name,
      reportedUserId: targetProfileId,
      reportedUserName: targetProfile ? targetProfile.name : 'Unknown User',
      reason,
      details,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setReports((prev) => [newReport, ...prev]);
    blockUser(targetProfileId);
  };

  const unmatchUser = (matchId: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== matchId));
  };

  const requestVerification = async (selfieUrl: string, idDocumentUrl?: string): Promise<void> => {
    if (!currentUser) return;

    const newReq: VerificationRequest = {
      id: `ver_req_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhoto: currentUser.photos[0] || '',
      selfieUrl,
      idDocumentUrl,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    // Optimistic local + persistence state update
    setVerificationRequests((prev) => [newReq, ...prev]);
    updateProfile({ verificationStatus: 'pending' });

    // Persist the verification request to Firestore so the moderation
    // team / admin dashboard can surface it.
    try {
      await addDoc(collection(db, 'verification_requests'), newReq);
    } catch (err) {
      console.error('Error saving verification request to Firestore:', err);
    }

    // Trigger the server-side email notifications (admin + user ack).
    // Email delivery is best-effort here; the request is already recorded.
    try {
      await fetch('/api/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.name,
          userEmail: userAccount?.email || firebaseUser?.email || '',
          userPhoto: newReq.userPhoto,
          selfieUrl,
          idDocumentUrl,
          submittedAt: newReq.submittedAt,
        }),
      });
    } catch (err) {
      console.error('Error triggering verification email notifications:', err);
    }
  };

  const adminApproveVerification = (requestId: string) => {
    const req = verificationRequests.find((r) => r.id === requestId);
    if (!req) return;
    setVerificationRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'verified' } : r))
    );
    setAllProfiles((prev) =>
      prev.map((p) => (p.id === req.userId ? { ...p, verificationStatus: 'verified' } : p))
    );
    if (currentUser && currentUser.id === req.userId) {
      setCurrentUser((prev) => (prev ? { ...prev, verificationStatus: 'verified' } : null));
    }
  };

  const adminRejectVerification = (requestId: string) => {
    const req = verificationRequests.find((r) => r.id === requestId);
    if (!req) return;
    setVerificationRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'rejected' } : r))
    );
    setAllProfiles((prev) =>
      prev.map((p) => (p.id === req.userId ? { ...p, verificationStatus: 'rejected' } : p))
    );
  };

  const adminToggleSuspend = (userId: string) => {
    setAllProfiles((prev) =>
      prev.map((p) => (p.id === userId ? { ...p, isSuspended: !p.isSuspended } : p))
    );
  };

  const adminToggleBan = (userId: string) => {
    setAllProfiles((prev) =>
      prev.map((p) => (p.id === userId ? { ...p, isBanned: !p.isBanned } : p))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        firebaseUser,
        userAccount,
        userPreferences,
        profileCompletion,
        isLoading,
        authError,
        allProfiles,
        likes,
        passes,
        matches,
        messages,
        reports,
         blocks,
         verificationRequests,
         currentMatchCelebration,
         likesReceived,
         realReceivedLikers,
         matchesCount,
         getIdToken,
         clearMatchCelebration,
        registerWithEmail,
        loginWithEmail,
        sendPasswordReset,
         logout,
         updateProfile,
        updatePreferences,
        completeOnboarding,
        uploadPhoto,
        likeProfile,
        passProfile,
        sendMessage,
        blockUser,
        reportUser,
        unmatchUser,
        requestVerification,
        adminApproveVerification,
        adminRejectVerification,
        adminToggleSuspend,
        adminToggleBan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
