'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Ban,
  Clock,
  ExternalLink,
  Eye,
  Filter,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { formatTimeAgo } from '@/lib/utils';
import { VerificationRequest, ReportRecord, UserProfile } from '@/types';

export default function AdminDashboardPage() {
  const {
    allProfiles,
    reports,
    verificationRequests,
    adminApproveVerification,
    adminRejectVerification,
    adminToggleSuspend,
    adminToggleBan,
  } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'verifications' | 'reports' | 'users'>('verifications');
  const [selectedVerification, setSelectedVerification] = useState<VerificationRequest | null>(null);

  // Metrics
  const totalUsers = allProfiles.length + 420; // real demo baseline
  const verifiedUsers = allProfiles.filter((p) => p.verificationStatus === 'verified').length + 310;
  const pendingVerifications = verificationRequests.filter((v) => v.status === 'pending').length;
  const activeReportsCount = reports.filter((r) => r.status === 'pending').length;

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="pb-4 border-b border-[#272D2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-[#D85B7A]/20 text-[#D85B7A]">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D85B7A]">
                JamboDate Internal Operations
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EF] tracking-tight">
              Trust & Safety Moderation Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#A8AAA5]">
              Real-time surveillance, verification decisions, and community safety enforcement.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#151A18] border border-[#272D2A]">
            <button
              onClick={() => setActiveTab('verifications')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'verifications'
                  ? 'bg-[#272D2A] text-[#F5F3EF]'
                  : 'text-[#A8AAA5] hover:text-[#F5F3EF]'
              }`}
            >
              Verifications ({pendingVerifications})
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'reports'
                  ? 'bg-[#272D2A] text-[#F5F3EF]'
                  : 'text-[#A8AAA5] hover:text-[#F5F3EF]'
              }`}
            >
              Incident Reports ({activeReportsCount})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'users'
                  ? 'bg-[#272D2A] text-[#F5F3EF]'
                  : 'text-[#A8AAA5] hover:text-[#F5F3EF]'
              }`}
            >
              Members Directory
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#151A18] border border-[#272D2A]">
            <div className="flex items-center justify-between text-[#A8AAA5] mb-1">
              <span className="text-xs font-medium">Total Registered</span>
              <Users className="w-4 h-4 text-[#A8AAA5]" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F3EF]">{totalUsers}</p>
            <p className="text-[11px] text-[#3FAF72] mt-0.5">+14 today across Kenya</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#151A18] border border-[#272D2A]">
            <div className="flex items-center justify-between text-[#A8AAA5] mb-1">
              <span className="text-xs font-medium">Verified Singles</span>
              <ShieldCheck className="w-4 h-4 text-[#3FAF72]" />
            </div>
            <p className="text-2xl font-extrabold text-[#3FAF72]">{verifiedUsers}</p>
            <p className="text-[11px] text-[#A8AAA5] mt-0.5">74% community adoption</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#151A18] border border-[#272D2A]">
            <div className="flex items-center justify-between text-[#A8AAA5] mb-1">
              <span className="text-xs font-medium">Pending Verifications</span>
              <Clock className="w-4 h-4 text-[#D99A52]" />
            </div>
            <p className="text-2xl font-extrabold text-[#D99A52]">{pendingVerifications}</p>
            <p className="text-[11px] text-[#A8AAA5] mt-0.5">Average wait: 18 mins</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#151A18] border border-[#272D2A]">
            <div className="flex items-center justify-between text-[#A8AAA5] mb-1">
              <span className="text-xs font-medium">Active Reports</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-extrabold text-red-400">{activeReportsCount}</p>
            <p className="text-[11px] text-red-400/80 mt-0.5">Zero tolerance action</p>
          </div>
        </div>

        {/* Tab 1: Verifications Queue */}
        {activeTab === 'verifications' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#F5F3EF]">
              Verification Queue ({verificationRequests.length})
            </h3>

            {verificationRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verificationRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 rounded-2xl bg-[#151A18] border border-[#272D2A] flex flex-col justify-between space-y-4 shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar src={req.userPhoto} name={req.userName} size="md" />
                        <div>
                          <h4 className="text-sm font-bold text-[#F5F3EF]">{req.userName}</h4>
                          <p className="text-[11px] text-[#A8AAA5]">
                            Submitted {formatTimeAgo(req.submittedAt)}
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant={
                          req.status === 'verified'
                            ? 'green'
                            : req.status === 'rejected'
                            ? 'rose'
                            : 'gold'
                        }
                        size="sm"
                      >
                        {req.status.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Comparison Thumbnails */}
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div>
                        <p className="text-[10px] text-[#A8AAA5] mb-1">Uploaded Profile Photo</p>
                        <div className="aspect-[3/3.8] rounded-xl overflow-hidden border border-[#272D2A] bg-black">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={req.userPhoto} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#A8AAA5] mb-1">Live Pose Selfie</p>
                        <div className="aspect-[3/3.8] rounded-xl overflow-hidden border border-[#272D2A] bg-black">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={req.selfieUrl} alt="Selfie" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    {req.notes && (
                      <p className="text-xs text-[#A8AAA5] bg-[#0D1110] p-2 rounded-lg border border-[#272D2A]">
                        Note: {req.notes}
                      </p>
                    )}

                    {/* Action buttons */}
                    {req.status === 'pending' ? (
                      <div className="flex items-center gap-2 pt-2 border-t border-[#272D2A]">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            adminRejectVerification(req.id);
                            toast(`Rejected verification for ${req.userName}`, 'info');
                          }}
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </Button>
                        <Button
                          variant="green"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            adminApproveVerification(req.id);
                            toast(`Approved verification for ${req.userName}`, 'success');
                          }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve Single
                        </Button>
                      </div>
                    ) : (
                      <p className="text-center text-xs text-[#A8AAA5] pt-2 border-t border-[#272D2A]">
                        Reviewed & Finalized
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#A8AAA5] py-8 text-center bg-[#151A18] rounded-2xl border border-[#272D2A]">
                No pending verification requests in queue.
              </p>
            )}
          </div>
        )}

        {/* Tab 2: Incident Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#F5F3EF]">
              Incident & Abuse Reports ({reports.length})
            </h3>

            {reports.length > 0 ? (
              <div className="divide-y divide-[#272D2A] rounded-2xl border border-[#272D2A] bg-[#151A18] overflow-hidden">
                {reports.map((report) => (
                  <div key={report.id} className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-red-500/20 text-red-400">
                          <AlertTriangle className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-[#F5F3EF]">
                            Reported: <span className="text-red-400">{report.reportedUserName}</span>
                          </h4>
                          <p className="text-xs text-[#A8AAA5]">
                            Filed by {report.reporterName} • {formatTimeAgo(report.createdAt)}
                          </p>
                        </div>
                      </div>

                      <Badge variant="rose" size="sm">
                        {report.reason}
                      </Badge>
                    </div>

                    {report.details && (
                      <p className="text-xs text-[#F5F3EF]/90 bg-[#0D1110] p-3 rounded-xl border border-[#272D2A] leading-relaxed">
                        &quot;{report.details}&quot;
                      </p>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          adminToggleBan(report.reportedUserId);
                          toast(`Action taken on ${report.reportedUserName}`, 'success');
                        }}
                      >
                        <Ban className="w-3.5 h-3.5" /> Suspend / Ban User
                      </Button>
                      <Button
                        variant="surface"
                        size="sm"
                        onClick={() => toast(`Report #${report.id} resolved`, 'info')}
                      >
                        Mark Reviewed
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#A8AAA5] py-8 text-center bg-[#151A18] rounded-2xl border border-[#272D2A]">
                No active abuse reports.
              </p>
            )}
          </div>
        )}

        {/* Tab 3: Users Directory */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#F5F3EF]">
              Community Members
            </h3>

            <div className="divide-y divide-[#272D2A] rounded-2xl border border-[#272D2A] bg-[#151A18] overflow-hidden">
              {allProfiles.map((user) => (
                <div key={user.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar src={user.photos[0]} name={user.name} size="md" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#F5F3EF] truncate">{user.name}</span>
                        <span className="text-xs text-[#A8AAA5]">({user.age})</span>
                        <Badge
                          variant={user.verificationStatus === 'verified' ? 'green' : 'outline'}
                          size="sm"
                        >
                          {user.verificationStatus}
                        </Badge>
                        {user.isSuspended && <Badge variant="rose" size="sm">Suspended</Badge>}
                        {user.isBanned && <Badge variant="rose" size="sm">Banned</Badge>}
                      </div>
                      <p className="text-xs text-[#A8AAA5] truncate">
                        {user.location} • {user.relationshipIntention}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant={user.isSuspended ? 'outline' : 'destructive'}
                      size="sm"
                      onClick={() => {
                        adminToggleSuspend(user.id);
                        toast(`Toggled suspension for ${user.name}`, 'info');
                      }}
                    >
                      {user.isSuspended ? 'Unsuspend' : 'Suspend'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
