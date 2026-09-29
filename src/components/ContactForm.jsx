'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ContactForm.module.css';

export default function ContactForm({ defaultSubject = '' }) {
  const searchParams = useSearchParams();
  const querySubject = searchParams ? searchParams.get('subject') || '' : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'tours',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (querySubject) {
      setFormData(prev => ({
        ...prev,
        message: prev.message || `Subject: ${querySubject}\n\nHello Moon Rabbit team, I would like to inquire regarding...`
      }));
    }
  }, [querySubject]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.message.trim()) newErrors.message = 'Please provide details about your inquiry';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    // Simulate async submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      setErrors({ form: 'An error occurred while sending your request. Please try again.' });
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.successBox} role="alert">
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>Inquiry Transmitted</h3>
        <p className={styles.successText}>
          Thank you for reaching out to Moon Rabbit, <strong>{formData.name}</strong>. Our expedition coordinators and esoteric guides will review your inquiry and contact you shortly via email at <em>{formData.email}</em> or phone.
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', service: 'tours', message: '' });
          }}
          style={{ marginTop: '20px' }}
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {errors.form && (
        <div className={styles.formError} role="alert">
          {errors.form}
        </div>
      )}

      {/* Name */}
      <div className={styles.fieldGroup}>
        <label htmlFor="contact-name" className={styles.label}>
          Full Name <span className={styles.required}>*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder="e.g. John Doe"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={loading}
          required
        />
        {errors.name && <span id="name-error" className={styles.errorText}>{errors.name}</span>}
      </div>

      {/* Email & Phone Grid */}
      <div className={styles.gridRow}>
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            Email Address <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="e.g. john@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={loading}
            required
          />
          {errors.email && <span id="email-error" className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-phone" className={styles.label}>
            Phone Number <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            placeholder="e.g. +92 300 1234567"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            disabled={loading}
            required
          />
          {errors.phone && <span id="phone-error" className={styles.errorText}>{errors.phone}</span>}
        </div>
      </div>

      {/* Interest Category */}
      <div className={styles.fieldGroup}>
        <label htmlFor="contact-service" className={styles.label}>
          Area of Interest
        </label>
        <select
          id="contact-service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={styles.select}
          disabled={loading}
        >
          <option value="tours">Guided Tours & Mountain Safaris</option>
          <option value="vehicles">4x4 Vehicles & Fleet Rental</option>
          <option value="accommodations">Accommodations & Official Residence</option>
          <option value="mining">Mining & Mineral Exploration</option>
          <option value="custom">Custom Esoteric Expedition</option>
        </select>
      </div>

      {/* Message */}
      <div className={styles.fieldGroup}>
        <label htmlFor="contact-message" className={styles.label}>
          Message & Travel Details <span className={styles.required}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          placeholder="Please describe your planned travel dates, group size, or specific requirements..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={loading}
          required
        />
        {errors.message && <span id="message-error" className={styles.errorText}>{errors.message}</span>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`btn-gold ${styles.submitButton}`}
        disabled={loading}
      >
        {loading ? (
          <span className={styles.loadingSpinner}>
            <svg className={styles.spinnerIcon} width="20" height="20" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Transmitting...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
