'use client';

import React, { useState } from 'react';
import CaptchaModal from '@/components/CaptchaModal';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaAlert, setCaptchaAlert] = useState(false);

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaChecked) {
      setCaptchaAlert(true);
      return;
    }

    setStatus({ submitting: true, submitted: false });

    setTimeout(() => {
      setStatus({ submitting: false, submitted: true });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
      });
      setCaptchaChecked(false);
    }, 1000);
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-270px)] select-none bg-black overflow-hidden flex flex-col items-center justify-center py-12 sm:py-20 px-4">
      
      {/* Mountain Wallpaper (Strictly scoped to Contact section only) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: "url('/assets/pexels-marek-piwnicki-3907296-36183772-scaled.jpg')",
        }}
      />

      {/* Subtle Atmospheric Tint Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/10 pointer-events-none z-0" />



      {/* Frosted Glass Form Card Container (Exact Replica of Reference) */}
      <div className="relative z-10 w-full max-w-[760px] mx-auto bg-white/15 backdrop-blur-2xl border border-white/25 rounded-[32px] p-8 sm:p-12 md:p-14 shadow-[0_24px_60px_rgba(0,0,0,0.5)] space-y-7">
        
        {/* Contact Wooden Plaque (Left-aligned as in reference) */}
        <div className="flex justify-start">
          <img
            src="/assets/aged_wooden_plank_contact-e1780840422598.png"
            alt="Contact"
            className="w-[180px] sm:w-[220px] md:w-[250px] h-auto object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)]"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Form Body */}
        <div className="w-full">
          {status.submitted ? (
            <div className="w-full bg-[#e6fcb8] border border-[#d6f09e] text-[#1a1a1a] px-5 sm:px-6 py-4.5 rounded-[2px] text-[14.5px] sm:text-[15.5px] font-sans leading-relaxed text-left shadow-sm animate-fade-in">
              Thanks for contacting us! We will be in touch with you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              
              {/* Full Name */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="fullName" className="block text-white text-[15px] sm:text-[16px] font-bold tracking-tight">
                  Full Name <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-[#344658]/75 hover:bg-[#3a4e62]/80 focus:bg-[#3a4e62]/90 text-white text-[15px] sm:text-[16px] px-4 sm:px-5 py-3 sm:py-3.5 rounded-[12px] border border-white/10 outline-none focus:border-white/30 transition-all placeholder:text-gray-300/60 shadow-inner"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="block text-white text-[15px] sm:text-[16px] font-bold tracking-tight">
                  Email Address <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="sample@yourcompanydomain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#344658]/75 hover:bg-[#3a4e62]/80 focus:bg-[#3a4e62]/90 text-white text-[15px] sm:text-[16px] px-4 sm:px-5 py-3 sm:py-3.5 rounded-[12px] border border-white/10 outline-none focus:border-white/30 transition-all placeholder:text-gray-300/60 shadow-inner"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="phone" className="block text-white text-[15px] sm:text-[16px] font-bold tracking-tight">
                  Phone Number <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#344658]/75 hover:bg-[#3a4e62]/80 focus:bg-[#3a4e62]/90 text-white text-[15px] sm:text-[16px] px-4 sm:px-5 py-3 sm:py-3.5 rounded-[12px] border border-white/10 outline-none focus:border-white/30 transition-all placeholder:text-gray-300/60 shadow-inner"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="message" className="block text-white text-[15px] sm:text-[16px] font-bold tracking-tight">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#344658]/75 hover:bg-[#3a4e62]/80 focus:bg-[#3a4e62]/90 text-white text-[15px] sm:text-[16px] px-4 sm:px-5 py-3.5 rounded-[14px] border border-white/10 outline-none focus:border-white/30 transition-all placeholder:text-gray-300/60 shadow-inner resize-y"
                />
              </div>

              {/* Official Live Internet hCaptcha Widget */}
              <div className="pt-1.5 flex flex-col items-start gap-1">
                <CaptchaModal
                  onVerify={() => {
                    setCaptchaChecked(true);
                    setCaptchaAlert(false);
                  }}
                  onExpire={() => {
                    setCaptchaChecked(false);
                  }}
                  theme="light"
                />

                {captchaAlert && !captchaChecked && (
                  <p className="text-red-400 text-xs font-medium animate-shake">
                    * Please verify that you are human before submitting.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-left">
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="bg-white hover:bg-[#f2f2f2] text-black font-semibold text-[16px] sm:text-[17px] py-2.5 sm:py-3 px-10 rounded-[8px] transition-all cursor-pointer disabled:opacity-50 shadow-[0_3px_10px_rgba(0,0,0,0.25)]"
                >
                  {status.submitting ? 'Sending...' : 'Submit'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
