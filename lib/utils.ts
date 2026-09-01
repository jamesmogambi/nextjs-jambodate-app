import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthDateString: string): number {
  if (!birthDateString) return 24;
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : 24;
}

export function formatTimestamp(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' });
}

export const formatTimeAgo = formatTimestamp;

export function isAdult(birthDateString: string): boolean {
  if (!birthDateString) return false;
  return calculateAge(birthDateString) >= 18;
}

const DUMMY_IMAGE_HOSTS = ['images.unsplash.com', 'source.unsplash.com'];

export function filterRealPhotos(photos: string[]): string[] {
  return photos.filter((url) => !DUMMY_IMAGE_HOSTS.some((host) => url.includes(host)));
}

export interface ProfileCompletionResult {
  percentage: number;
  completedCount: number;
  totalCriteria: number;
  missingFields: string[];
}

export function calculateProfileCompletion(
  profile: {
    name?: string;
    birthDate?: string;
    gender?: string;
    location?: string;
    relationshipIntention?: string;
    bio?: string;
    occupation?: string;
    education?: string;
    languages?: string[];
    interests?: string[];
    lifestyle?: {
      children?: string;
      wantChildren?: string;
      smoking?: string;
      drinking?: string;
      religion?: string;
      relationshipStatus?: string;
    };
    photos?: string[];
  } | null,
  preferences?: {
    ageRange?: [number, number];
    genderPreference?: string[];
    preferredLocation?: string;
    relationshipIntentions?: string[];
  } | null
): ProfileCompletionResult {
  if (!profile) {
    return {
      percentage: 0,
      completedCount: 0,
      totalCriteria: 10,
      missingFields: ['Basic details', 'Photos', 'Intention', 'About you', 'Lifestyle', 'Preferences'],
    };
  }

  const missing: string[] = [];
  let score = 0;

  // 1. Basic Info (Name, DOB 18+, Gender, Location) - 15 points
  if (profile.name?.trim() && profile.birthDate && profile.gender && profile.location) {
    score += 15;
  } else {
    missing.push('Basic identity & location');
  }

  // 2. Relationship Intention - 10 points
  if (profile.relationshipIntention?.trim()) {
    score += 10;
  } else {
    missing.push('Relationship intention');
  }

  // 3. Bio - 15 points
  if (profile.bio && profile.bio.trim().length >= 20) {
    score += 15;
  } else {
    missing.push('Personal bio (min 20 characters)');
  }

  // 4. Career & Education - 10 points
  if (profile.occupation?.trim() && profile.education?.trim()) {
    score += 10;
  } else if (profile.occupation?.trim() || profile.education?.trim()) {
    score += 5;
    missing.push('Occupation or education');
  } else {
    missing.push('Occupation and education');
  }

  // 5. Languages & Interests - 10 points
  const hasLanguages = profile.languages && profile.languages.length > 0;
  const hasInterests = profile.interests && profile.interests.length >= 2;
  if (hasLanguages && hasInterests) {
    score += 10;
  } else {
    missing.push('Languages and at least 2 interests');
  }

  // 6. Lifestyle Habits - 15 points
  const lifestyle = profile.lifestyle || {};
  let lifestyleCount = 0;
  if (lifestyle.children || lifestyle.wantChildren) lifestyleCount++;
  if (lifestyle.smoking) lifestyleCount++;
  if (lifestyle.drinking) lifestyleCount++;
  if (lifestyle.religion) lifestyleCount++;
  if (lifestyle.relationshipStatus) lifestyleCount++;

  if (lifestyleCount >= 4) {
    score += 15;
  } else if (lifestyleCount >= 2) {
    score += 10;
    missing.push('Complete all lifestyle answers');
  } else {
    missing.push('Lifestyle habits & family goals');
  }

  // 7. Dating Preferences - 10 points
  if (
    preferences?.genderPreference?.length ||
    preferences?.relationshipIntentions?.length ||
    preferences?.ageRange
  ) {
    score += 10;
  } else {
    missing.push('Dating preferences');
  }

  // 8. Photos - 15 points
  const photoCount = profile.photos?.length || 0;
  if (photoCount >= 3) {
    score += 15;
  } else if (photoCount >= 1) {
    score += 10;
    missing.push('Add more photos (3+ recommended)');
  } else {
    missing.push('Upload profile photos');
  }

  const percentage = Math.min(100, Math.max(0, score));

  return {
    percentage,
    completedCount: Math.round((percentage / 100) * 8),
    totalCriteria: 8,
    missingFields: missing,
  };
}

