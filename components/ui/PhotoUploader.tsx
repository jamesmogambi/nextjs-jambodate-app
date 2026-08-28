'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Plus, Image as ImageIcon, Loader2, Star, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  onUpload?: (file: File, index: number) => Promise<string>;
  maxPhotos?: number;
  minPhotos?: number;
  id?: string;
}

const SAMPLE_PHOTO_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80',
];

export function PhotoUploader({
  photos,
  onChange,
  onUpload,
  maxPhotos = 6,
  minPhotos = 1,
  id = 'jambodate-photo-uploader',
}: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);

    const remainingSlots = maxPhotos - photos.length;
    if (remainingSlots <= 0) {
      setUploadError(`Maximum of ${maxPhotos} photos allowed.`);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    setIsUploading(true);

    try {
      const newUrls: string[] = [];
      for (let i = 0; i < filesToProcess.length; i++) {
        const file = filesToProcess[i];
        if (onUpload) {
          try {
            const url = await onUpload(file, photos.length + i);
            newUrls.push(url);
          } catch {
            // Local fallback
            const localUrl = await readFileAsDataUrl(file);
            newUrls.push(localUrl);
          }
        } else {
          const localUrl = await readFileAsDataUrl(file);
          newUrls.push(localUrl);
        }
      }
      onChange([...photos, ...newUrls]);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Photo upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) resolve(e.target.result as string);
        else reject(new Error('File reading error'));
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    const next = photos.filter((_, i) => i !== index);
    onChange(next);
  };

  const setAsPrimary = (index: number) => {
    if (index === 0) return;
    const selected = photos[index];
    const rest = photos.filter((_, i) => i !== index);
    onChange([selected, ...rest]);
  };

  const addPreset = (presetUrl: string) => {
    if (photos.length < maxPhotos && !photos.includes(presetUrl)) {
      onChange([...photos, presetUrl]);
    }
  };

  return (
    <div id={id} className="space-y-4">
      {/* Upload Dropzone */}
      {photos.length < maxPhotos && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => {
            if (!isUploading) fileInputRef.current?.click();
          }}
          className={cn(
            'border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all',
            isDragging
              ? 'border-[#D85B7A] bg-[#D85B7A]/10 scale-[1.01]'
              : 'border-[#272D2A] hover:border-[#3A423E] bg-[#151A18]/60 hover:bg-[#151A18]',
            isUploading && 'opacity-60 pointer-events-none'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="w-12 h-12 rounded-full bg-[#1B211E] flex items-center justify-center text-[#D85B7A] mb-3 shadow-inner">
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-[#D85B7A]" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>
          <p className="text-sm font-semibold text-[#F5F3EF]">
            {isUploading ? 'Uploading to Firebase Storage...' : 'Upload Photos (JPEG, PNG, WEBP)'}
          </p>
          <p className="text-xs text-[#A8AAA5] mt-1">
            Drag & drop here or click to browse · {photos.length} of {maxPhotos} photos added
          </p>
          {minPhotos > 0 && photos.length === 0 && (
            <span className="mt-2 text-[11px] text-[#D85B7A] font-medium bg-[#D85B7A]/10 px-2.5 py-0.5 rounded-full">
              At least {minPhotos} photo is required to continue
            </span>
          )}
        </div>
      )}

      {uploadError && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 flex items-center gap-2 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Uploaded Grid */}
      {photos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5]">
              Uploaded Photos ({photos.length}/{maxPhotos})
            </span>
            <span className="text-[11px] text-[#A8AAA5]">
              Click any photo to make it Primary
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((url, index) => (
              <div
                key={index}
                onClick={() => setAsPrimary(index)}
                className={cn(
                  'relative group aspect-[3/4] rounded-xl overflow-hidden border bg-[#151A18] cursor-pointer transition-all',
                  index === 0
                    ? 'border-[#D85B7A] ring-2 ring-[#D85B7A]/40'
                    : 'border-[#272D2A] hover:border-[#3A423E]'
                )}
                title={index === 0 ? 'Primary Profile Photo' : 'Click to make Primary'}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />

                {index === 0 ? (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#D85B7A] text-[#F5F3EF] text-[10px] font-bold shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Primary
                  </span>
                ) : (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0D1110]/80 text-[#A8AAA5] text-[10px] font-medium backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Set Primary
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-[#F5F3EF] hover:bg-red-600 transition-colors opacity-90 group-hover:opacity-100 cursor-pointer"
                  title="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preset Quick Select for convenience in testing */}
      {photos.length < maxPhotos && (
        <div className="pt-2 border-t border-[#272D2A]/60">
          <p className="text-xs text-[#A8AAA5] mb-2 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-[#D99A52]" />
            Quick sample portraits (Kenya presets):
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {SAMPLE_PHOTO_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addPreset(preset)}
                className="w-12 h-14 rounded-lg overflow-hidden border border-[#272D2A] shrink-0 hover:border-[#D85B7A] transition-all opacity-80 hover:opacity-100 cursor-pointer"
                title="Use sample portrait"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preset} alt="sample" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
