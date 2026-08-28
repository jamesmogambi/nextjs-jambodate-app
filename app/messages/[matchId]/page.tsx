'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  MoreVertical,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Sparkles,
  Info,
  CheckCheck,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Avatar } from '@/components/ui/Avatar';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { Button } from '@/components/ui/Button';
import { ReportModal } from '@/components/ui/ReportModal';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { formatTimeAgo } from '@/lib/utils';
import { UserProfile } from '@/types';

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.matchId as string;

  const { matches, messages, allProfiles, currentUser, sendMessage, unmatchUser } = useAuth();
  const { toast } = useToast();

  const [inputMessage, setInputMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Identify match and partner profile
  const match = matches.find((m) => m.id === matchId);
  const otherUserId = match?.users.find((id) => id !== currentUser?.id);
  const partnerProfile = allProfiles.find((p) => p.id === otherUserId);

  const matchMessages = messages[matchId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [matchMessages]);

  if (!match || !partnerProfile) {
    return (
      <AppShell>
        <div className="max-w-md mx-auto text-center py-16 space-y-4">
          <p className="text-sm text-[#A8AAA5]">Conversation not found or has been unmatched.</p>
          <Link href="/messages">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Inbox
            </Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(matchId, inputMessage.trim());
    setInputMessage('');
  };

  const handleQuickIcebreaker = (text: string) => {
    sendMessage(matchId, text);
  };

  const handleUnmatch = () => {
    unmatchUser(matchId);
    toast(`Unmatched with ${partnerProfile.name}`, 'info');
    router.push('/messages');
  };

  const icebreakers = [
    'What is your favorite weekend spot in Nairobi?',
    'Are you more of an Artcaffe or Java person?',
    'Loved your profile note on your career journey!',
  ];

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-[#151A18] rounded-2xl border border-[#272D2A] overflow-hidden shadow-2xl">
        {/* Chat Room Top Bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 bg-[#121615] border-b border-[#272D2A] shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/messages" className="p-1.5 rounded-lg text-[#A8AAA5] hover:text-[#F5F3EF] hover:bg-[#1B211E]">
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <Avatar
              src={partnerProfile.photos[0]}
              name={partnerProfile.name}
              size="md"
              isOnline={partnerProfile.isOnline}
            />

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm sm:text-base font-bold text-[#F5F3EF]">
                  {partnerProfile.name}
                </h2>
                <VerificationBadge status={partnerProfile.verificationStatus} />
              </div>
              <p className="text-[11px] text-[#A8AAA5]">
                {partnerProfile.isOnline ? 'Online now' : `Last active ${partnerProfile.lastActive}`} • {partnerProfile.location.split('(')[0]}
              </p>
            </div>
          </div>

          {/* Chat options menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 text-[#A8AAA5] hover:text-[#F5F3EF] rounded-lg hover:bg-[#1B211E] transition-colors cursor-pointer"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0D1110] border border-[#272D2A] shadow-2xl py-1 z-30 text-xs">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setIsReportOpen(true);
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-red-400 hover:bg-[#151A18] flex items-center gap-2 cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4" /> Report / Block User
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    handleUnmatch();
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-[#A8AAA5] hover:text-[#F5F3EF] hover:bg-[#151A18] flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Unmatch
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Safety Header Prompt */}
        <div className="bg-[#0D1110]/60 px-4 py-2 border-b border-[#272D2A] flex items-center justify-between text-[11px] text-[#A8AAA5]">
          <span className="flex items-center gap-1.5 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3FAF72] shrink-0" />
            JamboDate Safe Dating: Never share financial or M-Pesa details.
          </span>
          <span className="text-[#D99A52] font-semibold shrink-0 ml-2">
            {partnerProfile.relationshipIntention}
          </span>
        </div>

        {/* Message Thread History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {matchMessages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs text-[#A8AAA5] mb-4">
                You matched with {partnerProfile.name}! Send the first note to get talking.
              </p>
              <div className="flex flex-col gap-2 max-w-sm mx-auto">
                {icebreakers.map((text, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickIcebreaker(text)}
                    className="p-2.5 rounded-xl bg-[#0D1110] border border-[#272D2A] text-xs text-[#F5F3EF] hover:border-[#D85B7A] hover:bg-[#1B211E] transition-all text-left flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D99A52] shrink-0" />
                    <span>{text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            matchMessages.map((msg) => {
              const isMine = msg.senderId === currentUser?.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      isMine
                        ? 'bg-[#D85B7A] text-white rounded-br-xs'
                        : 'bg-[#1B211E] text-[#F5F3EF] border border-[#272D2A] rounded-bl-xs'
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-[#A8AAA5] px-1">
                    <span>{formatTimeAgo(msg.createdAt)}</span>
                    {isMine && <CheckCheck className="w-3.5 h-3.5 text-[#3FAF72]" />}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 sm:p-4 bg-[#121615] border-t border-[#272D2A] flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Type a thoughtful message to ${partnerProfile.name.split(' ')[0]}...`}
            className="flex-1 bg-[#0D1110] border border-[#272D2A] rounded-xl px-4 py-2.5 text-sm text-[#F5F3EF] placeholder:text-[#A8AAA5]/50 focus:outline-none focus:border-[#D85B7A] transition-colors"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {/* Safety Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetProfile={partnerProfile}
      />
    </AppShell>
  );
}
