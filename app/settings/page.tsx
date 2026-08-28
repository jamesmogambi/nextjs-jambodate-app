'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Settings,
  Shield,
  Bell,
  Eye,
  LogOut,
  Trash2,
  Phone,
  CheckCircle2,
  Sliders,
  Users,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { FormField, Input, Select } from '@/components/ui/FormField';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const { currentUser, logout, switchUser, allProfiles } = useAuth();
  const { toast } = useToast();

  const [minAge, setMinAge] = useState(21);
  const [maxAge, setMaxAge] = useState(38);
  const [distanceKm, setDistanceKm] = useState(50);
  const [showActiveStatus, setShowActiveStatus] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Settings & discovery preferences updated', 'success');
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6 pb-12">
        <div className="pb-4 border-b border-[#272D2A]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EF] tracking-tight">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1">
            Manage your account security, discovery range, and privacy settings.
          </p>
        </div>

        {/* Account Info */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F3EF]">
            Account Information
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-[#272D2A]">
              <span className="text-[#A8AAA5]">Registered Name</span>
              <span className="font-semibold text-[#F5F3EF]">{currentUser?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#272D2A]">
              <span className="text-[#A8AAA5]">Location</span>
              <span className="font-semibold text-[#F5F3EF]">{currentUser?.location}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#272D2A]">
              <span className="text-[#A8AAA5]">Verification</span>
              <span className="font-semibold text-[#3FAF72]">
                {currentUser?.verificationStatus.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#272D2A]">
              <span className="text-[#A8AAA5]">Membership Plan</span>
              <span className="font-semibold text-[#D99A52]">
                {currentUser?.subscriptionTier.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Discovery Filtering Preferences */}
        <form onSubmit={handleSavePreferences} className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F3EF] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#D99A52]" /> Discovery Match Criteria
          </h3>

          <div>
            <label className="text-xs font-semibold text-[#A8AAA5] flex justify-between mb-2">
              <span>Age Range Preference</span>
              <span className="text-[#F5F3EF] font-bold">{minAge} - {maxAge} years</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={18}
                max={60}
                value={minAge}
                onChange={(e) => setMinAge(Math.min(Number(e.target.value), maxAge - 1))}
                className="w-full accent-[#D85B7A]"
              />
              <input
                type="range"
                min={18}
                max={65}
                value={maxAge}
                onChange={(e) => setMaxAge(Math.max(Number(e.target.value), minAge + 1))}
                className="w-full accent-[#D85B7A]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#A8AAA5] flex justify-between mb-2">
              <span>Maximum Distance</span>
              <span className="text-[#F5F3EF] font-bold">{distanceKm} km</span>
            </label>
            <input
              type="range"
              min={5}
              max={150}
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full accent-[#3FAF72]"
            />
          </div>

          <Button type="submit" variant="surface" size="sm">
            Save Preferences
          </Button>
        </form>

        {/* Privacy & Notifications */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F3EF]">
            Privacy & Alerts
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#0D1110] border border-[#272D2A] cursor-pointer">
              <div>
                <p className="font-semibold text-[#F5F3EF]">Show Online Activity</p>
                <p className="text-[#A8AAA5]">Allow mutual matches to see when you are active</p>
              </div>
              <input
                type="checkbox"
                checked={showActiveStatus}
                onChange={(e) => setShowActiveStatus(e.target.checked)}
                className="rounded bg-[#151A18] border-[#272D2A] text-[#D85B7A]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#0D1110] border border-[#272D2A] cursor-pointer">
              <div>
                <p className="font-semibold text-[#F5F3EF]">Email Notifications</p>
                <p className="text-[#A8AAA5]">Receive instant digest of new likes and messages</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="rounded bg-[#151A18] border-[#272D2A] text-[#D85B7A]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#0D1110] border border-[#272D2A] cursor-pointer">
              <div>
                <p className="font-semibold text-[#F5F3EF]">SMS Match Alerts</p>
                <p className="text-[#A8AAA5]">Send SMS on urgent safety alerts or verified matches</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="rounded bg-[#151A18] border-[#272D2A] text-[#D85B7A]"
              />
            </label>
          </div>
        </div>

        {/* Demo Switcher for fast evaluation */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F3EF] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#D99A52]" /> Switch Demo Persona
          </h3>
          <p className="text-xs text-[#A8AAA5]">
            Switch profiles instantly to evaluate mutual likes, chat bubbles, and matching from both sides:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                switchUser('user_current');
                toast('Switched to James Mugambi (Nairobi)', 'info');
              }}
            >
              James Mugambi (Nairobi)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                switchUser('user_wangari');
                toast('Switched to Wangari Kamau (Nairobi)', 'info');
              }}
            >
              Wangari Kamau (Nairobi)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                switchUser('user_brian');
                toast('Switched to Brian Otieno (Nairobi)', 'info');
              }}
            >
              Brian Otieno (Nairobi)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                switchUser('user_amina');
                toast('Switched to Amina Hassan (Mombasa)', 'info');
              }}
            >
              Amina Hassan (Mombasa)
            </Button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#F5F3EF]">Sign Out</h4>
            <p className="text-xs text-[#A8AAA5]">Safely log out of your session on this device.</p>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-1" /> Log Out
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
