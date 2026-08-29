export type RelationshipIntention = 
  | 'Marriage' 
  | 'Serious relationship' 
  | 'Dating' 
  | 'Friendship';

export type Gender = 'Man' | 'Woman' | 'Non-binary' | 'Prefer not to say';

export type KenyanLocation = 
  | 'Nairobi (Westlands)'
  | 'Nairobi (Kilimani / Kileleshwa)'
  | 'Nairobi (Karen / Langata)'
  | 'Nairobi (CBD / Parklands)'
  | 'Nairobi (Roysambu / Thika Road)'
  | 'Mombasa (Nyali)'
  | 'Mombasa (Old Town / Island)'
  | 'Kisumu (Milimani)'
  | 'Nakuru (Milimani / Town)'
  | 'Eldoret'
  | 'Machakos'
  | 'Naivasha'
  | 'Other';

export type ReportReason =
  | 'Fake profile'
  | 'Scam'
  | 'Harassment'
  | 'Spam'
  | 'Inappropriate content'
  | 'Threatening behavior'
  | 'Underage user'
  | 'Other';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export type BoostPlanId = '1_day' | '1_week' | '1_month';
export type BoostStatus = 'active' | 'expired' | 'failed' | 'pending';

export type SubscriptionTier = 'free' | 'plus' | 'gold';

export type RelationshipStatus = 'Single' | 'Never married' | 'Divorced' | 'Widowed' | 'Separated';

export interface UserPreferences {
  uid?: string;
  ageRange: [number, number];
  distanceMaxKm?: number;
  genderPreference: Gender[];
  preferredLocation?: string;
  relationshipIntentions: RelationshipIntention[];
  verifiedOnly: boolean;
  updatedAt?: string;
}

export interface PhotoRecord {
  id: string;
  userId: string;
  url: string;
  storagePath?: string;
  orderIndex: number;
  isPrimary: boolean;
  createdAt: string;
}

export interface UserAccount {
  uid: string;
  email: string;
  firstName: string;
  birthDate: string; // YYYY-MM-DD
  gender: Gender;
  county: string;
  phone?: string;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  agreedToGuidelines: boolean;
  onboardingCompleted: boolean;
  boostActive?: boolean | null;
  boostPlan?: BoostPlanId | null;
  boostStartedAt?: string | null;
  boostExpiresAt?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile {
  id: string;
  uid: string;
  name: string;
  age: number;
  birthDate: string; // YYYY-MM-DD
  gender: Gender;
  location: KenyanLocation | string;
  relationshipIntention: RelationshipIntention;
  bio: string;
  occupation: string;
  education: string;
  languages: string[];
  interests: string[];
  lifestyle: {
    children?: 'None' | 'Have children' | 'Prefer not to say';
    wantChildren?: 'Want someday' | 'Don’t want' | 'Have and want more' | 'Open to children' | 'Not sure';
    smoking?: 'Non-smoker' | 'Socially' | 'Regular' | 'Trying to quit';
    drinking?: 'Never' | 'Socially' | 'Frequently' | 'Prefer not to say';
    religion?: 'Christian' | 'Muslim' | 'Spiritual' | 'Traditional' | 'Agnostic' | 'Other' | string;
    relationshipStatus?: RelationshipStatus;
    workout?: 'Active daily' | 'Often' | 'Sometimes' | 'Never';
    kids?: 'Want someday' | 'Don’t want' | 'Have and want more' | 'Have and satisfied';
  };
  photos: string[];
  verificationStatus: VerificationStatus;
  subscriptionTier: SubscriptionTier;
  completionPercentage?: number;
  onboardingCompleted?: boolean;
   isOnline?: boolean;
   lastActive?: string;
   compatibility?: number;
   isAdmin?: boolean;
   isSuspended?: boolean;
   isBanned?: boolean;
   boostActive?: boolean | null;
   boostPlan?: BoostPlanId | null;
   boostStartedAt?: string | null;
   boostExpiresAt?: string | null;
   createdAt: string;
   updatedAt?: string;
 }

export interface UserAuth {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified: boolean;
}

export interface LikeRecord {
  id: string;
  fromUserId: string;
  toUserId: string;
  createdAt: string;
}

export interface PassRecord {
  id: string;
  fromUserId: string;
  toUserId: string;
  createdAt: string;
}

export interface MatchRecord {
  id: string;
  users: [string, string]; // [user1Id, user2Id]
  lastMessage?: string;
  lastMessageAt?: string;
  lastMessageSenderId?: string;
  createdAt: string;
  unreadCountByUser?: Record<string, number>;
}

export interface MessageRecord {
  id: string;
  matchId: string;
  senderId: string;
  recipientId: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface ReportRecord {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  reason: ReportReason;
  details?: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
}

export interface BlockRecord {
  id: string;
  blockerId: string;
  blockedUserId: string;
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  selfieUrl: string;
  idDocumentUrl?: string;
  submittedAt: string;
  status: VerificationStatus;
  notes?: string;
}

export interface BoostRecord {
  id: string;
  userId: string;
  planId: BoostPlanId;
  durationDays: number;
  price: number;
  currency: string;
  startedAt: string | null;
  expiresAt: string | null;
  status: BoostStatus;
  paymentId: string;
  createdAt: string | null;
}

export interface UserBoostFields {
  boostActive?: boolean | null;
  boostPlan?: BoostPlanId | null;
  boostStartedAt?: string | null;
  boostExpiresAt?: string | null;
}
