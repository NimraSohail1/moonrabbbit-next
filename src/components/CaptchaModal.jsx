'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Check, AlertCircle, Headphones, Info, ShieldCheck } from 'lucide-react';

// Curated high-res real challenge puzzles with Unsplash CDN images
const CHALLENGES = [
  {
    id: 'airplane',
    title: 'airplanes',
    subtitle: 'Select all images with',
    hint: 'Click verify once there are none left.',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Airplane landing' },
      { id: 2, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Sports car' },
      { id: 3, url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Airplane flying' },
      { id: 4, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Mountain peak' },
      { id: 5, url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Jet engine airplane' },
      { id: 6, url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Speed boat' },
      { id: 7, url: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Commercial flight' },
      { id: 8, url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Train railway' },
      { id: 9, url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Classic automobile' },
    ],
  },
  {
    id: 'boat',
    title: 'boats or ships',
    subtitle: 'Select all images with',
    hint: 'Click verify once there are none left.',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Sailing boat' },
      { id: 2, url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Train railway' },
      { id: 3, url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Motor yacht' },
      { id: 4, url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Airplane' },
      { id: 5, url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Fishing boat' },
      { id: 6, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Mountain river' },
      { id: 7, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Sports car' },
      { id: 8, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Wooden boat on shore' },
      { id: 9, url: 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Modern train' },
    ],
  },
  {
    id: 'train',
    title: 'trains',
    subtitle: 'Select all images with',
    hint: 'Click verify once there are none left.',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'High-speed locomotive' },
      { id: 2, url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Airplane' },
      { id: 3, url: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Cargo train' },
      { id: 4, url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Boat' },
      { id: 5, url: 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Express train' },
      { id: 6, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Mountains' },
      { id: 7, url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Vintage steam train' },
      { id: 8, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Sports car' },
      { id: 9, url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Airplane flying' },
    ],
  },
  {
    id: 'car',
    title: 'cars',
    subtitle: 'Select all images with',
    hint: 'Click verify once there are none left.',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Sports car' },
      { id: 2, url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Classic automobile' },
      { id: 3, url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Train railway' },
      { id: 4, url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Muscle car' },
      { id: 5, url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Airplane' },
      { id: 6, url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Supercar' },
      { id: 7, url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Speed boat' },
      { id: 8, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Mountain peak' },
      { id: 9, url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Jet airplane' },
    ],
  },
  {
    id: 'mountain',
    title: 'mountains',
    subtitle: 'Select all images with',
    hint: 'Click verify once there are none left.',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Snow mountain peak' },
      { id: 2, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Sports car' },
      { id: 3, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Yosemite mountain valley' },
      { id: 4, url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Airplane' },
      { id: 5, url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Night snowy mountain' },
      { id: 6, url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Train' },
      { id: 7, url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=350&q=80', isTarget: true, label: 'Alpine mountain peak' },
      { id: 8, url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Boat' },
      { id: 9, url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=350&q=80', isTarget: false, label: 'Automobile' },
    ],
  },
];

export default function CaptchaModal({
  onVerify,
  onExpire,
  onError,
}) {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const currentChallenge = CHALLENGES[challengeIndex];

  // Open puzzle modal when clicking checkbox
  const handleCheckboxClick = () => {
    if (isVerified) {
      // Toggle off / reset
      setIsVerified(false);
      setSelectedIds(new Set());
      if (onExpire) onExpire();
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSelectedIds(new Set());

    // Pick random challenge
    const randomIndex = Math.floor(Math.random() * CHALLENGES.length);
    setChallengeIndex(randomIndex);

    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(true);
    }, 450);
  };

  // Toggle selection on an image square
  const handleToggleImage = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    if (errorMessage) setErrorMessage('');
  };

  // Switch to another challenge
  const handleReloadChallenge = () => {
    setSelectedIds(new Set());
    setErrorMessage('');
    setChallengeIndex((prev) => (prev + 1) % CHALLENGES.length);
  };

  // Verify answer
  const handleVerifyAnswer = () => {
    const targetImages = currentChallenge.images.filter((img) => img.isTarget);
    const targetIds = new Set(targetImages.map((img) => img.id));

    // Check if user selected all targets and no distractors
    const allTargetsSelected = targetImages.every((img) => selectedIds.has(img.id));
    const noDistractorsSelected = Array.from(selectedIds).every((id) => targetIds.has(id));

    if (allTargetsSelected && noDistractorsSelected && selectedIds.size > 0) {
      // SUCCESS!
      setIsModalOpen(false);
      setIsVerified(true);
      setErrorMessage('');
      const token = `verified-human-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      if (onVerify) onVerify(token);
    } else {
      // ERROR - shake & load next challenge
      setIsShaking(true);
      setErrorMessage('Please try again by selecting all correct images.');
      setTimeout(() => {
        setIsShaking(false);
        // Switch to a new challenge after brief delay
        setChallengeIndex((prev) => (prev + 1) % CHALLENGES.length);
        setSelectedIds(new Set());
      }, 700);
    }
  };

  return (
    <div className="relative inline-block select-none my-2">
      
      {/* 1. AUTHENTIC "I AM HUMAN" CHECKBOX WIDGET */}
      <div
        onClick={handleCheckboxClick}
        className={`w-[302px] h-[74px] bg-[#f9f9f9] hover:bg-[#ffffff] text-[#222222] border rounded-[3px] px-3.5 py-2 flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.12)] cursor-pointer transition-all duration-200 ${
          isVerified
            ? 'border-[#34a853]/60 bg-[#f6fff8]'
            : 'border-[#d3d3d3] hover:border-[#b0b0b0]'
        }`}
      >
        {/* Left Side: Checkbox / Spinner / Green Tick */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-7 h-7 rounded-[2px] flex items-center justify-center transition-all duration-200 ${
              isVerified
                ? 'bg-[#0f9d58] text-white shadow-sm scale-105'
                : 'bg-white border-2 border-[#c1c1c1] hover:border-[#8e8e8e]'
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[#4285f4] border-t-transparent rounded-full animate-spin" />
            ) : isVerified ? (
              <Check className="w-5 h-5 stroke-[3.2] text-white animate-in zoom-in-50 duration-200" />
            ) : null}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[14px] font-sans font-medium text-[#222222] leading-tight">
              {isVerified ? 'I am human' : 'I am human'}
            </span>
            <span className="text-[10px] text-gray-500 font-sans mt-0.5">
              {isVerified ? 'Verification passed' : 'Click checkbox to verify'}
            </span>
          </div>
        </div>

        {/* Right Side: Security Logo & Privacy Terms */}
        <div className="flex flex-col items-center justify-center text-center pl-2 pr-0.5 border-l border-gray-200">
          <div className="w-7 h-7 flex items-center justify-center text-[#4285f4]">
            {isVerified ? (
              <ShieldCheck className="w-6 h-6 text-[#0f9d58]" />
            ) : (
              <svg viewBox="0 0 48 48" className="w-6 h-6 fill-[#0070ba]">
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-2 30.5v-7h4v7h-4zm0-11V13.5h4v10h-4z" />
              </svg>
            )}
          </div>
          <span className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-tighter leading-none mt-0.5">
            hCaptcha
          </span>
          <div className="flex gap-1 text-[8px] text-gray-400 leading-none mt-1">
            <span>Privacy</span>
            <span>•</span>
            <span>Terms</span>
          </div>
        </div>
      </div>

      {/* 2. AUTHENTIC 3X3 IMAGE SELECTION CHALLENGE PUZZLE POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-3 animate-in fade-in duration-200">
          
          <div
            className={`w-full max-w-[370px] bg-white rounded-[4px] shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden border border-gray-300 select-none ${
              isShaking ? 'animate-shake' : ''
            }`}
          >
            {/* Header Banner */}
            <div className="bg-[#1a73e8] text-white p-4 text-left">
              <div className="text-[13px] font-sans font-normal opacity-90 leading-tight">
                {currentChallenge.subtitle}
              </div>
              <div className="text-[22px] font-sans font-bold capitalize tracking-tight leading-tight mt-0.5">
                {currentChallenge.title}
              </div>
              <div className="text-[11px] font-sans opacity-85 mt-1 leading-tight">
                {currentChallenge.hint}
              </div>
            </div>

            {/* Error / Feedback Banner */}
            {errorMessage && (
              <div className="bg-[#fce8e6] text-[#c5221f] text-[12px] font-sans font-medium px-4 py-2 text-left flex items-center gap-1.5 border-b border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 3x3 Image Grid */}
            <div className="p-2.5 bg-[#f5f5f5]">
              <div className="grid grid-cols-3 gap-1.5 bg-white p-1 rounded-[2px] border border-gray-200">
                {currentChallenge.images.map((img) => {
                  const isSelected = selectedIds.has(img.id);
                  return (
                    <button
                      type="button"
                      key={img.id}
                      onClick={() => handleToggleImage(img.id)}
                      className={`relative aspect-square overflow-hidden rounded-[2px] cursor-pointer transition-all duration-150 focus:outline-none ${
                        isSelected
                          ? 'ring-4 ring-[#1a73e8] ring-inset scale-[0.94] opacity-95'
                          : 'hover:opacity-90 hover:scale-[0.98]'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-full object-cover object-center pointer-events-none"
                        loading="eager"
                      />

                      {/* Selected Checkmark Badge */}
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 bg-[#1a73e8] text-white rounded-full p-0.5 shadow-md flex items-center justify-center animate-in zoom-in-75 duration-150">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Blue tint overlay when selected */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#1a73e8]/25 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Controls Toolbar */}
            <div className="px-4 py-3 bg-white border-t border-gray-200 flex items-center justify-between">
              {/* Left Icons */}
              <div className="flex items-center gap-3 text-gray-500">
                <button
                  type="button"
                  onClick={handleReloadChallenge}
                  title="Get a new challenge"
                  className="p-1 hover:text-[#1a73e8] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4.5 h-4.5" />
                </button>
                <button
                  type="button"
                  onClick={() => alert('Please select all squares matching the prompt, then click Verify.')}
                  title="Audio Challenge"
                  className="p-1 hover:text-[#1a73e8] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <Headphones className="w-4.5 h-4.5" />
                </button>
                <button
                  type="button"
                  onClick={() => alert('Click on each matching image tile to place a checkmark, then click Verify.')}
                  title="Help / Info"
                  className="p-1 hover:text-[#1a73e8] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <Info className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Right Action Button (Verify / Skip) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-800 text-[12px] font-sans font-medium px-2 py-1.5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleVerifyAnswer}
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-sans font-bold text-[13px] px-5 py-2 rounded-[2px] transition-colors uppercase tracking-wider shadow-sm cursor-pointer active:scale-95"
                >
                  {selectedIds.size === 0 ? 'Skip' : 'Verify'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export { CaptchaModal as HCaptchaWidget, CaptchaModal as ReCaptchaWidget };
