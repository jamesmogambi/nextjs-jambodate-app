'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
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
import { RelationshipIntention, KenyanLocation } from '@/types';

export default function EditProfilePage() {
  const router = useRouter();
  const { currentUser, updateProfile } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(currentUser?.name || '');
  const [location, setLocation] = useState<KenyanLocation>(
    (currentUser?.location as KenyanLocation) || 'Nairobi (Kilimani / Kileleshwa)'
  );
  const [relationshipIntention, setRelationshipIntention] = useState<RelationshipIntention>(
    currentUser?.relationshipIntention || 'Serious relationship'
  );
  const [occupation, setOccupation] = useState(currentUser?.occupation || '');
  const [education, setEducation] = useState(currentUser?.education || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [photos, setPhotos] = useState<string[]>(currentUser?.photos || []);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(currentUser?.interests || []);
  const [drinking, setDrinking] = useState<'Never' | 'Socially' | 'Frequently' | 'Prefer not to say'>(
    currentUser?.lifestyle?.drinking || 'Socially'
  );
  const [smoking, setSmoking] = useState<'Non-smoker' | 'Socially' | 'Regular' | 'Trying to quit'>(
    currentUser?.lifestyle?.smoking || 'Non-smoker'
  );
  const [workout, setWorkout] = useState<'Active daily' | 'Often' | 'Sometimes' | 'Never'>(
    currentUser?.lifestyle?.workout || 'Active daily'
  );
  const [kids, setKids] = useState<'Want someday' | 'Don’t want' | 'Have and want more' | 'Have and satisfied'>(
    currentUser?.lifestyle?.kids || 'Want someday'
  );
  const [religion, setReligion] = useState<'Christian' | 'Muslim' | 'Spiritual' | 'Agnostic' | 'Other'>(
    (currentUser?.lifestyle?.religion as any) || 'Christian'
  );
  const [isSaving, setIsSaving] = useState(false);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      if (selectedInterests.length < 8) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        toast('Maximum 8 interests allowed', 'info');
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast('Name cannot be empty', 'error');
      return;
    }
    if (photos.length === 0) {
      toast('Please keep at least 1 profile photo', 'error');
      return;
    }

    setIsSaving(true);
    try {
      updateProfile({
        name,
        location,
        relationshipIntention,
        occupation,
        education,
        bio,
        photos,
        interests: selectedInterests,
        lifestyle: {
          drinking,
          smoking,
          workout,
          kids,
          religion,
        },
      });
      toast('Profile updated successfully!', 'success');
      router.push('/profile');
    } catch (err) {
      toast('Failed to save profile changes.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppShell>
      <form onSubmit={handleSave} className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#272D2A]">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-1.5 rounded-lg text-[#A8AAA5] hover:text-[#F5F3EF] hover:bg-[#1B211E]">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#F5F3EF]">
              Edit Profile
            </h1>
          </div>

          <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>

        {/* Photos Section */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F3EF]">
            Profile Photos
          </h3>
          <PhotoUploader photos={photos} onChange={setPhotos} maxPhotos={6} />
        </div>

        {/* Basic Information */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F3EF]">
            Basic Details
          </h3>

          <FormField label="Display Name" id="edit-name" required>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>

          <FormField label="Location (Kenyan Area)" id="edit-loc" required>
            <Select
              id="edit-loc"
              value={location}
              onChange={(e) => setLocation(e.target.value as KenyanLocation)}
            >
              {KENYAN_COUNTIES_CITIES.map((c) => (
                <option key={c} value={c} className="bg-[#151A18]">
                  {c}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Relationship Intention" id="edit-intent" required>
            <Select
              id="edit-intent"
              value={relationshipIntention}
              onChange={(e) => setRelationshipIntention(e.target.value as RelationshipIntention)}
            >
              {RELATIONSHIP_INTENTIONS.map((int) => (
                <option key={int} value={int} className="bg-[#151A18]">
                  {int}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="About You (Bio)" id="edit-bio">
            <Textarea
              id="edit-bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="What makes your journey unique?"
            />
          </FormField>
        </div>

        {/* Career & Education */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F3EF]">
            Career & Education
          </h3>

          <FormField label="Occupation" id="edit-occ">
            <Input
              id="edit-occ"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </FormField>

          <FormField label="Education" id="edit-edu">
            <Input
              id="edit-edu"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </FormField>
        </div>

        {/* Interests */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F3EF]">
            Interests & Passions
          </h3>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'border-[#D85B7A] bg-[#D85B7A]/20 text-[#E6819B]'
                      : 'border-[#272D2A] bg-[#0D1110] text-[#A8AAA5] hover:border-[#3A423E]'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lifestyle Choices */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F3EF]">
            Lifestyle & Values
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Drinking" id="edit-drink">
              <Select
                id="edit-drink"
                value={drinking}
                onChange={(e) => setDrinking(e.target.value as 'Never' | 'Socially' | 'Frequently' | 'Prefer not to say')}
              >
                <option value="Socially">Socially</option>
                <option value="Never">Never</option>
                <option value="Frequently">Frequently</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </Select>
            </FormField>

            <FormField label="Smoking" id="edit-smoke">
              <Select
                id="edit-smoke"
                value={smoking}
                onChange={(e) => setSmoking(e.target.value as 'Non-smoker' | 'Socially' | 'Regular' | 'Trying to quit')}
              >
                <option value="Non-smoker">Non-smoker</option>
                <option value="Socially">Socially</option>
                <option value="Regular">Regular</option>
                <option value="Trying to quit">Trying to quit</option>
              </Select>
            </FormField>

            <FormField label="Workout" id="edit-work">
              <Select
                id="edit-work"
                value={workout}
                onChange={(e) => setWorkout(e.target.value as 'Active daily' | 'Often' | 'Sometimes' | 'Never')}
              >
                <option value="Active daily">Active daily</option>
                <option value="Often">Often</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Never">Never</option>
              </Select>
            </FormField>

            <FormField label="Children" id="edit-kids">
              <Select
                id="edit-kids"
                value={kids}
                onChange={(e) => setKids(e.target.value as 'Want someday' | 'Don’t want' | 'Have and want more' | 'Have and satisfied')}
              >
                <option value="Want someday">Want someday</option>
                <option value="Don’t want">Don’t want</option>
                <option value="Have and want more">Have and want more</option>
                <option value="Have and satisfied">Have and satisfied</option>
              </Select>
            </FormField>
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-8">
          <Link href="/profile">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="lg" isLoading={isSaving}>
            <Save className="w-4 h-4" /> Save Profile
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
