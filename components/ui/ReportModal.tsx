'use client';

import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { ReportReason, UserProfile } from '@/types';
import { Modal } from './Modal';
import { Button } from './Button';
import { FormField, Select, Textarea } from './FormField';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from './Toast';

const REPORT_REASONS: ReportReason[] = [
  'Fake profile',
  'Scam',
  'Harassment',
  'Spam',
  'Inappropriate content',
  'Threatening behavior',
  'Underage user',
  'Other',
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProfile: UserProfile | null;
}

export function ReportModal({ isOpen, onClose, targetProfile }: ReportModalProps) {
  const { reportUser } = useAuth();
  const { toast } = useToast();
  const [reason, setReason] = useState<ReportReason>('Fake profile');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!targetProfile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      reportUser(targetProfile.id, reason, details);
      toast(`Report submitted for ${targetProfile.name}. They have also been blocked for your safety.`, 'success');
      onClose();
    } catch (err) {
      toast('Failed to submit report. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Report ${targetProfile.name}`}
      description="Help us maintain JamboDate as a safe, authentic Kenyan community. Reports are reviewed by our moderation team within 2 hours."
      maxWidth="md"
      id="report-user-modal"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Submitting this report will automatically block this user and remove them from your matches.</span>
        </div>

        <FormField label="Reason for report" required id="report-reason">
          <Select
            id="report-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value as ReportReason)}
          >
            {REPORT_REASONS.map((r) => (
              <option key={r} value={r} className="bg-[#151A18] text-[#F5F3EF]">
                {r}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Additional Details"
          id="report-details"
          helperText="Provide specific context or messages to help our trust & safety team."
        >
          <Textarea
            id="report-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe what occurred..."
            rows={3}
          />
        </FormField>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#272D2A]">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="destructive" isLoading={isSubmitting}>
            <ShieldAlert className="w-4 h-4" /> Submit Report & Block
          </Button>
        </div>
      </form>
    </Modal>
  );
}
