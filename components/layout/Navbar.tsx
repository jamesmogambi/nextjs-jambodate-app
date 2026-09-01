"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#272D2A] bg-[#0D1110]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#D85B7A] flex items-center justify-center shrink-0 shadow-sm shadow-[#D85B7A]/30">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.557 0 3.046.726 4 1.958 1.046-1.232 2.443-1.958 4-1.958 2.786 0 5.25 2.322 5.25 5.25 0 3.924-2.438 7.11-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#F5F3EF]">
              JamboDate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A8AAA5]">
            <a
              href="#how-it-works"
              className="hover:text-[#F5F3EF] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#intentions"
              className="hover:text-[#F5F3EF] transition-colors"
            >
              Intentions
            </a>
            <a
              href="#safety"
              className="hover:text-[#F5F3EF] transition-colors flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-[#3FAF72]" /> Safety First
            </a>
            <a
              href="#boost"
              className="hover:text-[#F5F3EF] transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D99A52]" /> JamboDate Gold
            </a>
            <a href="#faq" className="hover:text-[#F5F3EF] transition-colors">
              FAQ
            </a>
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="md">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="md">
                Create Free Profile
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl border border-[#272D2A] text-[#A8AAA5] hover:text-[#F5F3EF] hover:bg-[#151A18] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-[#272D2A] bg-[#151A18] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm text-[#A8AAA5] hover:text-[#F5F3EF]"
          >
            How It Works
          </a>
          <a
            href="#intentions"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm text-[#A8AAA5] hover:text-[#F5F3EF]"
          >
            Relationship Intentions
          </a>
          <a
            href="#safety"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm text-[#A8AAA5] hover:text-[#F5F3EF]"
          >
            Safety & Verification
          </a>
          <a
            href="#premium"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm text-[#A8AAA5] hover:text-[#F5F3EF]"
          >
            JamboDate Gold & Plus
          </a>
          <a
            href="#faq"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm text-[#A8AAA5] hover:text-[#F5F3EF]"
          >
            Frequently Asked Questions
          </a>
          <div className="pt-3 border-t border-[#272D2A] flex flex-col gap-2">
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Create Free Profile
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
