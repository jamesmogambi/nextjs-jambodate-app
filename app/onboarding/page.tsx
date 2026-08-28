'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MapPin,
  Heart,
  Briefcase,
  GraduationCap,
  Languages,
  ShieldCheck,
  Camera,
  Check,
  AlertCircle,
  FileText,
  Lock,
  Compass,
  Sliders,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FormField, Input, Select, Textarea } from '@/components/ui/FormField';
import { PhotoUploader } from '@/components/ui/PhotoUploader';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/components/ui/Toast';
import {
  KENYAN_COUNTIES_CITIES,
  RELATIONSHIP_INTENTIONS,
  KENYAN_LANGUAGES,
  SAMPLE_INTERESTS,
} from '@/lib/data/kenyanProfiles';
import { calculateAge, isAdult, calculateProfileCompletion } from '@/lib/utils';
import { Gender, RelationshipIntention, KenyanLocation, RelationshipStatus } from '@/types';

const TOTAL_STEPS = 7;

const STEP_TITLES = [
  'Basic Information',
  'Relationship Intention',
  'About Me',
  'Lifestyle & Values',
  'Dating Preferences',
  'Profile Photos',
  'Privacy & Guidelines',
];

export default function OnboardingPage() {
  const router = useRouter();
  const { currentUser, userPreferences, completeOnboarding, uploadPhoto } = useAuth();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Basic Information
  const [firstName, setFirstName] = useState(currentUser?.name || '');
  const [birthDate, setBirthDate] = useState(currentUser?.birthDate || '1998-06-15');
  const [gender, setGender] = useState<Gender>(currentUser?.gender || 'Woman');
  const [location, setLocation] = useState<string>(currentUser?.location || 'Nairobi (Kilimani / Kileleshwa)');

  // Step 2: Relationship Intention
  const [relationshipIntention, setRelationshipIntention] = useState<RelationshipIntention>(
    currentUser?.relationshipIntention || 'Serious relationship'
  );

  // Step 3: About Me
  const [bio, setBio] = useState(
    currentUser?.bio ||
      'Passionate about thoughtful conversation, weekend road trips across Kenya, and finding someone genuine to share life’s adventures with.'
  );
  const [occupation, setOccupation] = useState(currentUser?.occupation || '');
  const [education, setEducation] = useState(currentUser?.education || '');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    currentUser?.languages?.length ? currentUser.languages : ['English', 'Swahili']
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    currentUser?.interests?.length ? currentUser.interests : ['Karura Trail Running', 'Specialty Coffee']
  );

  // Step 4: Lifestyle
  const [children, setChildren] = useState<'None' | 'Have children' | 'Prefer not to say'>(
    currentUser?.lifestyle?.children || 'None'
  );
  const [wantChildren, setWantChildren] = useState<
    'Want someday' | 'Don’t want' | 'Have and want more' | 'Open to children' | 'Not sure'
  >(currentUser?.lifestyle?.wantChildren || 'Want someday');
  const [smoking, setSmoking] = useState<'Non-smoker' | 'Socially' | 'Regular' | 'Trying to quit'>(
    currentUser?.lifestyle?.smoking || 'Non-smoker'
  );
  const [drinking, setDrinking] = useState<'Never' | 'Socially' | 'Frequently' | 'Prefer not to say'>(
    currentUser?.lifestyle?.drinking || 'Socially'
  );
  const [religion, setReligion] = useState<string>(currentUser?.lifestyle?.religion || 'Christian');
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus>(
    currentUser?.lifestyle?.relationshipStatus || 'Single'
  );

  // Step 5: Dating Preferences
  const [prefAgeMin, setPrefAgeMin] = useState<number>(userPreferences?.ageRange?.[0] || 22);
  const [prefAgeMax, setPrefAgeMax] = useState<number>(userPreferences?.ageRange?.[1] || 36);
  const [prefGender, setPrefGender] = useState<Gender[]>(
    userPreferences?.genderPreference?.length
      ? userPreferences.genderPreference
      : gender === 'Man'
      ? ['Woman']
      : ['Man']
  );
  const [prefLocation, setPrefLocation] = useState<string>(
    userPreferences?.preferredLocation || 'Nairobi (Kilimani / Kileleshwa)'
  );
  const [prefIntentions, setPrefIntentions] = useState<RelationshipIntention[]>(
    userPreferences?.relationshipIntentions?.length
      ? userPreferences.relationshipIntentions
      : ['Serious relationship', 'Marriage']
  );

  // Step 6: Photos
  const [photos, setPhotos] = useState<string[]>(
    currentUser?.photos?.length
      ? currentUser.photos
      : ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80']
  );

  // Step 7: Privacy & Terms
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [agreedPrivacy, setAgreedPrivacy] = useState(true);
  const [agreedGuidelines, setAgreedGuidelines] = useState(true);

  // Dynamic Profile Completion Calculation
  const profileCompletion = useMemo(() => {
    return calculateProfileCompletion(
      {
        name: firstName,
        birthDate,
        gender,
        location,
        relationshipIntention,
        bio,
        occupation,
        education,
        languages: selectedLanguages,
        interests: selectedInterests,
        lifestyle: {
          children,
          wantChildren,
          smoking,
          drinking,
          religion,
          relationshipStatus,
        },
        photos,
      },
      {
        ageRange: [prefAgeMin, prefAgeMax],
        genderPreference: prefGender,
        preferredLocation: prefLocation,
        relationshipIntentions: prefIntentions,
      }
    );
  }, [
    firstName,
    birthDate,
    gender,
    location,
    relationshipIntention,
    bio,
    occupation,
    education,
    selectedLanguages,
    selectedInterests,
    children,
    wantChildren,
    smoking,
    drinking,
    religion,
    relationshipStatus,
    photos,
    prefAgeMin,
    prefAgeMax,
    prefGender,
    prefLocation,
    prefIntentions,
  ]);

  // Validation per step
  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        if (!firstName.trim()) {
          toast('Please enter your first name', 'error');
          return false;
        }
        if (!birthDate || !isAdult(birthDate)) {
          toast('You must be 18 or older to continue', 'error');
          return false;
        }
        if (!gender || !location) {
          toast('Please select gender and location', 'error');
          return false;
        }
        return true;
      case 2:
        if (!relationshipIntention) {
          toast('Please choose your relationship intention', 'error');
          return false;
        }
        return true;
      case 3:
        if (!bio.trim() || bio.trim().length < 15) {
          toast('Please write at least 15 characters about yourself', 'error');
          return false;
        }
        if (selectedLanguages.length === 0) {
          toast('Please select at least one language', 'error');
          return false;
        }
        return true;
      case 4:
        return true; // All lifestyle fields have defaults
      case 5:
        if (prefGender.length === 0) {
          toast('Please select at least one preferred gender', 'error');
          return false;
        }
        if (prefIntentions.length === 0) {
          toast('Please select at least one preferred intention', 'error');
          return false;
        }
        return true;
      case 6:
        if (photos.length < 1) {
          toast('Please upload at least 1 profile photo to proceed', 'error');
          return false;
        }
        return true;
      case 7:
        if (!agreedTerms || !agreedPrivacy || !agreedGuidelines) {
          toast('Please agree to all community and safety policies', 'error');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const togglePrefGender = (g: Gender) => {
    setPrefGender((prev) =>
      prev.includes(g) ? (prev.length > 1 ? prev.filter((item) => item !== g) : prev) : [...prev, g]
    );
  };

  const togglePrefIntention = (intention: RelationshipIntention) => {
    setPrefIntentions((prev) =>
      prev.includes(intention)
        ? prev.length > 1
          ? prev.filter((item) => item !== intention)
          : prev
        : [...prev, intention]
    );
  };

  const handleSubmitOnboarding = async () => {
    if (!validateStep(7)) return;

    setIsSubmitting(true);
    try {
      const age = calculateAge(birthDate);

      await completeOnboarding(
        {
          name: firstName.trim(),
          age,
          birthDate,
          gender,
          location,
          relationshipIntention,
          bio: bio.trim(),
          occupation: occupation.trim(),
          education: education.trim(),
          languages: selectedLanguages,
          interests: selectedInterests,
          lifestyle: {
            children,
            wantChildren,
            smoking,
            drinking,
            religion,
            relationshipStatus,
          },
          photos,
          onboardingCompleted: true,
          completionPercentage: profileCompletion.percentage,
        },
        {
          ageRange: [prefAgeMin, prefAgeMax],
          genderPreference: prefGender,
          preferredLocation: prefLocation,
          relationshipIntentions: prefIntentions,
          verifiedOnly: false,
        }
      );

      toast('Hongera! Your JamboDate profile is ready. Karibu to Discovery!', 'success');
      router.push('/discover');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error finalizing onboarding';
      toast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1110] text-[#F5F3EF] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header & Step Indicator */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151A18] border border-[#272D2A] text-xs text-[#D99A52] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Step {currentStep} of {TOTAL_STEPS}: {STEP_TITLES[currentStep - 1]}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F3EF]">
            Complete Your JamboDate Profile
          </h1>
          <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1">
            Setting intentional foundations for genuine dating in Kenya.
          </p>
        </div>

        {/* Profile Completion Meter (Prominently displays 'Your profile is 80% complete') */}
        <div className="bg-[#151A18] border border-[#272D2A] rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5F3EF] flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  profileCompletion.percentage >= 80 ? 'bg-[#3FAF72]' : 'bg-[#D99A52]'
                }`}
              />
              Your profile is {profileCompletion.percentage}% complete
            </span>
            <span className="text-xs font-semibold text-[#D85B7A]">
              {profileCompletion.percentage >= 80 ? 'Excellent profile strength!' : 'Almost there!'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-[#0D1110] rounded-full overflow-hidden border border-[#272D2A]">
            <div
              className="h-full bg-gradient-to-r from-[#D85B7A] via-[#D99A52] to-[#3FAF72] transition-all duration-500 rounded-full"
              style={{ width: `${profileCompletion.percentage}%` }}
            />
          </div>

          {/* Encouraging helper text */}
          {profileCompletion.missingFields.length > 0 && (
            <p className="text-[11px] text-[#A8AAA5] mt-2 flex items-center gap-1">
              <Info className="w-3 h-3 text-[#D99A52] shrink-0" />
              <span>
                Boost your match rate: add{' '}
                <strong className="text-[#F5F3EF]">
                  {profileCompletion.missingFields.slice(0, 2).join(' & ')}
                </strong>{' '}
                to reach 100%.
              </span>
            </p>
          )}
        </div>

        {/* Step Progress Tracker Tabs */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-8">
          {STEP_TITLES.map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-[#D85B7A]'
                    : isCompleted
                    ? 'bg-[#3FAF72]'
                    : 'bg-[#272D2A]'
                }`}
                title={`Step ${stepNum}: ${title}`}
              />
            );
          })}
        </div>

        {/* Main Step Form Card */}
        <div className="bg-[#151A18] border border-[#272D2A] rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-[#272D2A] pb-3 mb-4">
                <h2 className="text-lg font-bold text-[#F5F3EF] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#D85B7A]" /> Basic Information
                </h2>
                <p className="text-xs text-[#A8AAA5] mt-0.5">
                  Confirm your name, age, and county. Your real birthdate is kept strictly private.
                </p>
              </div>

              <FormField label="First Name" id="onb-name" required>
                <Input
                  id="onb-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Wangari or Kevin"
                  required
                />
              </FormField>

              <FormField
                label="Date of Birth"
                id="onb-dob"
                required
                helperText="Must be 18 years or older to register on JamboDate"
              >
                <Input
                  id="onb-dob"
                  type="date"
                  value={birthDate}
                  max={new Date(Date.now() - 18 * 365.25 * 24 * 3600 * 1000).toISOString().split('T')[0]}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </FormField>

              {birthDate && (
                <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A] text-xs flex items-center justify-between">
                  <span className="text-[#A8AAA5]">Calculated Age:</span>
                  <span className="font-bold text-[#3FAF72] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {calculateAge(birthDate)} years old (18+ Verified)
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Gender" id="onb-gender" required>
                  <Select
                    id="onb-gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    options={[
                      { value: 'Woman', label: 'Woman' },
                      { value: 'Man', label: 'Man' },
                      { value: 'Non-binary', label: 'Non-binary' },
                      { value: 'Prefer not to say', label: 'Prefer not to say' },
                    ]}
                  />
                </FormField>

                <FormField label="County / City" id="onb-location" required>
                  <Select
                    id="onb-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    options={KENYAN_COUNTIES_CITIES.map((loc) => ({ value: loc, label: loc }))}
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* STEP 2: Relationship Intention */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-[#272D2A] pb-3 mb-4">
                <h2 className="text-lg font-bold text-[#F5F3EF] flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#D85B7A]" /> Relationship Intention
                </h2>
                <p className="text-xs text-[#A8AAA5] mt-0.5">
                  Clear intentions prevent wasted time. Be honest about what you are seeking on JamboDate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {RELATIONSHIP_INTENTIONS.map((intention) => {
                  const isSelected = relationshipIntention === intention;
                  const descriptions: Record<string, string> = {
                    Marriage: 'Looking for a life partner to marry and build a lifelong future with.',
                    'Serious relationship': 'Committed long-term partnership leading to deep companionship.',
                    Dating: 'Getting to know someone special with openness to explore where it leads.',
                    Friendship: 'Building meaningful social and intellectual connections first.',
                  };

                  return (
                    <div
                      key={intention}
                      onClick={() => setRelationshipIntention(intention)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#D85B7A] bg-[#D85B7A]/10 shadow-xs'
                          : 'border-[#272D2A] hover:border-[#3A423E] bg-[#0D1110]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-[#F5F3EF]">{intention}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#D85B7A]" />}
                      </div>
                      <p className="text-xs text-[#A8AAA5] leading-relaxed">
                        {descriptions[intention]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: About Me */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-[#272D2A] pb-3 mb-4">
                <h2 className="text-lg font-bold text-[#F5F3EF] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#D85B7A]" /> About Me
                </h2>
                <p className="text-xs text-[#A8AAA5] mt-0.5">
                  Share your background, passions, languages, and what makes your rhythm unique.
                </p>
              </div>

              <FormField
                label="Short Bio"
                id="onb-bio"
                required
                helperText="Introduce yourself authentically. Mention your values and how you spend free time."
              >
                <Textarea
                  id="onb-bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Share a bit about yourself..."
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Occupation" id="onb-occ">
                  <Input
                    id="onb-occ"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </FormField>

                <FormField label="Education" id="onb-edu">
                  <Input
                    id="onb-edu"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. BSc Economics, Strathmore"
                  />
                </FormField>
              </div>

              {/* Languages */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] block mb-2">
                  Languages Spoken
                </label>
                <div className="flex flex-wrap gap-2">
                  {KENYAN_LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#D85B7A] text-[#F5F3EF]'
                            : 'bg-[#0D1110] border border-[#272D2A] text-[#A8AAA5] hover:text-[#F5F3EF]'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] block mb-2">
                  Interests & Passions
                </label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
                  {SAMPLE_INTERESTS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#D99A52] text-[#0D1110] font-semibold'
                            : 'bg-[#0D1110] border border-[#272D2A] text-[#A8AAA5] hover:text-[#F5F3EF]'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Lifestyle */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-[#272D2A] pb-3 mb-4">
                <h2 className="text-lg font-bold text-[#F5F3EF] flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#D85B7A]" /> Lifestyle & Values
                </h2>
                <p className="text-xs text-[#A8AAA5] mt-0.5">
                  Family goals, social habits, faith, and relationship history.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Current Children" id="onb-children">
                  <Select
                    id="onb-children"
                    value={children}
                    onChange={(e) => setChildren(e.target.value as any)}
                    options={[
                      { value: 'None', label: 'No children' },
                      { value: 'Have children', label: 'Have children' },
                      { value: 'Prefer not to say', label: 'Prefer not to say' },
                    ]}
                  />
                </FormField>

                <FormField label="Want Children" id="onb-want-children">
                  <Select
                    id="onb-want-children"
                    value={wantChildren}
                    onChange={(e) => setWantChildren(e.target.value as any)}
                    options={[
                      { value: 'Want someday', label: 'Want children someday' },
                      { value: 'Don’t want', label: 'Do not want children' },
                      { value: 'Have and want more', label: 'Have and want more' },
                      { value: 'Open to children', label: 'Open to children' },
                      { value: 'Not sure', label: 'Not sure yet' },
                    ]}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Drinking Habits" id="onb-drinking">
                  <Select
                    id="onb-drinking"
                    value={drinking}
                    onChange={(e) => setDrinking(e.target.value as any)}
                    options={[
                      { value: 'Socially', label: 'Drink Socially' },
                      { value: 'Never', label: 'Non-drinker' },
                      { value: 'Frequently', label: 'Frequently' },
                      { value: 'Prefer not to say', label: 'Prefer not to say' },
                    ]}
                  />
                </FormField>

                <FormField label="Smoking Habits" id="onb-smoking">
                  <Select
                    id="onb-smoking"
                    value={smoking}
                    onChange={(e) => setSmoking(e.target.value as any)}
                    options={[
                      { value: 'Non-smoker', label: 'Non-smoker' },
                      { value: 'Socially', label: 'Social smoker' },
                      { value: 'Regular', label: 'Regular smoker' },
                      { value: 'Trying to quit', label: 'Trying to quit' },
                    ]}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Religion / Faith Preference" id="onb-religion">
                  <Select
                    id="onb-religion"
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    options={[
                      { value: 'Christian', label: 'Christian' },
                      { value: 'Muslim', label: 'Muslim' },
                      { value: 'Spiritual', label: 'Spiritual but not religious' },
                      { value: 'Traditional', label: 'African Traditional Beliefs' },
                      { value: 'Agnostic', label: 'Agnostic / Atheist' },
                      { value: 'Other', label: 'Other' },
                    ]}
                  />
                </FormField>

                <FormField label="Relationship Status" id="onb-status">
                  <Select
                    id="onb-status"
                    value={relationshipStatus}
                    onChange={(e) => setRelationshipStatus(e.target.value as RelationshipStatus)}
                    options={[
                      { value: 'Single', label: 'Single' },
                      { value: 'Never married', label: 'Never married' },
                      { value: 'Divorced', label: 'Divorced' },
                      { value: 'Widowed', label: 'Widowed' },
                      { value: 'Separated', label: 'Separated' },
                    ]}
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* STEP 5: Dating Preferences */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-[#272D2A] pb-3 mb-4">
                <h2 className="text-lg font-bold text-[#F5F3EF] flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#D85B7A]" /> Dating Preferences
                </h2>
                <p className="text-xs text-[#A8AAA5] mt-0.5">
                  Tailor who you will discover on JamboDate based on age, gender, location, and intentions.
                </p>
              </div>

              {/* Preferred Age Range */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] block mb-2">
                  Preferred Age Range ({prefAgeMin} – {prefAgeMax} years old)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Minimum Age" id="onb-age-min">
                    <Select
                      id="onb-age-min"
                      value={String(prefAgeMin)}
                      onChange={(e) => setPrefAgeMin(Number(e.target.value))}
                      options={Array.from({ length: 35 }, (_, i) => 18 + i).map((a) => ({
                        value: String(a),
                        label: `${a} years old`,
                      }))}
                    />
                  </FormField>

                  <FormField label="Maximum Age" id="onb-age-max">
                    <Select
                      id="onb-age-max"
                      value={String(prefAgeMax)}
                      onChange={(e) => setPrefAgeMax(Number(e.target.value))}
                      options={Array.from({ length: 35 }, (_, i) => 22 + i).map((a) => ({
                        value: String(a),
                        label: `${a} years old`,
                      }))}
                    />
                  </FormField>
                </div>
              </div>

              {/* Preferred Gender */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] block mb-2">
                  Preferred Gender
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['Woman', 'Man', 'Non-binary'] as Gender[]).map((g) => {
                    const isSelected = prefGender.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => togglePrefGender(g)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#D85B7A] text-[#F5F3EF]'
                            : 'bg-[#0D1110] border border-[#272D2A] text-[#A8AAA5]'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Location */}
              <FormField label="Preferred Location / County" id="onb-pref-location">
                <Select
                  id="onb-pref-location"
                  value={prefLocation}
                  onChange={(e) => setPrefLocation(e.target.value)}
                  options={[
                    { value: 'Anywhere in Kenya', label: 'Anywhere in Kenya' },
                    ...KENYAN_COUNTIES_CITIES.map((c) => ({ value: c, label: c })),
                  ]}
                />
              </FormField>

              {/* Preferred Relationship Intentions */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] block mb-2">
                  Preferred Intentions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {RELATIONSHIP_INTENTIONS.map((intent) => {
                    const isSelected = prefIntentions.includes(intent);
                    return (
                      <button
                        key={intent}
                        type="button"
                        onClick={() => togglePrefIntention(intent)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer text-left flex items-center justify-between ${
                          isSelected
                            ? 'border-[#D85B7A] bg-[#D85B7A]/10 text-[#F5F3EF]'
                            : 'border-[#272D2A] bg-[#0D1110] text-[#A8AAA5]'
                        }`}
                      >
                        <span>{intent}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#D85B7A]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Photos */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-[#272D2A] pb-3 mb-4">
                <h2 className="text-lg font-bold text-[#F5F3EF] flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#D85B7A]" /> Profile Photos
                </h2>
                <p className="text-xs text-[#A8AAA5] mt-0.5">
                  Upload authentic photos of yourself. At least 1 photo is required; up to 6 supported.
                </p>
              </div>

              <PhotoUploader
                photos={photos}
                onChange={setPhotos}
                onUpload={uploadPhoto}
                maxPhotos={6}
                minPhotos={1}
              />
            </div>
          )}

          {/* STEP 7: Privacy and Terms */}
          {currentStep === 7 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-[#272D2A] pb-3 mb-4">
                <h2 className="text-lg font-bold text-[#F5F3EF] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#3FAF72]" /> Privacy & Community Guidelines
                </h2>
                <p className="text-xs text-[#A8AAA5] mt-0.5">
                  JamboDate is rooted in mutual respect, identity verification, and anti-harassment safeguards.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="space-y-3 text-xs text-[#A8AAA5]">
                <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-start gap-3">
                  <Lock className="w-4 h-4 text-[#D99A52] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#F5F3EF] mb-0.5">Data Privacy Guarantee</h4>
                    <p>
                      Your private phone number, exact birthdate, and email address are never displayed
                      publicly or sold to third parties.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#3FAF72] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#F5F3EF] mb-0.5">Community Safety Standards</h4>
                    <p>
                      Zero tolerance for financial scams, extortion, catfish deception, or abusive conduct.
                      Violators are permanently banned.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkbox Agreements */}
              <div className="pt-3 space-y-3">
                <label className="flex items-start gap-3 text-xs text-[#A8AAA5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded bg-[#0D1110] border-[#272D2A] text-[#D85B7A] focus:ring-0"
                    required
                  />
                  <span>
                    I agree to the <strong>Terms of Service</strong> governing membership, matching, and platform accountability.
                  </span>
                </label>

                <label className="flex items-start gap-3 text-xs text-[#A8AAA5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedPrivacy}
                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                    className="mt-0.5 rounded bg-[#0D1110] border-[#272D2A] text-[#D85B7A] focus:ring-0"
                    required
                  />
                  <span>
                    I agree to the <strong>Privacy Policy</strong> and consent to secure profile hosting on Firebase Cloud.
                  </span>
                </label>

                <label className="flex items-start gap-3 text-xs text-[#A8AAA5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedGuidelines}
                    onChange={(e) => setAgreedGuidelines(e.target.checked)}
                    className="mt-0.5 rounded bg-[#0D1110] border-[#272D2A] text-[#D85B7A] focus:ring-0"
                    required
                  />
                  <span>
                    I commit to the <strong>JamboDate Community Guidelines</strong> to treat every member with dignity, respect, and honesty.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#272D2A]">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleBack}
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < TOTAL_STEPS ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
              >
                Next: {STEP_TITLES[currentStep]} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleSubmitOnboarding}
                isLoading={isSubmitting}
              >
                Complete Onboarding & Enter JamboDate <Check className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
