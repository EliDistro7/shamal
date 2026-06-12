'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const SUBJECTS = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Enquiry' },
  { value: 'quote', label: 'Request a Quote' },
  { value: 'construction', label: 'Construction' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'design', label: 'Design Portfolio' },
  { value: 'other', label: 'Other' },
];

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: 'Head Office',
    lines: ['Plot No 235 Block T, Kawawa Road', 'P.O.Box 25554, Dar es Salaam, Tanzania'],
  },
  {
    icon: Phone,
    label: 'Phone',
    lines: ['+255 785 70 70 70 (Mobile)', '+255 719 48 48 48 (Office)'],
    links: ['tel:+255785707070', 'tel:+255719484848'],
  },
  {
    icon: Mail,
    label: 'Email',
    lines: ['shamalcotz@gmail.com'],
    links: ['mailto:shamalcotz@gmail.com'],
  },
  {
    icon: Globe,
    label: 'Website',
    lines: ['www.shamalcotz.com'],
    links: ['https://www.shamalcotz.com'],
  },
  {
    icon: Clock,
    label: 'Office Hours',
    lines: ['Mon – Fri: 08:00 – 17:00', 'Sat: 09:00 – 13:00'],
  },
];

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.fullName.trim() || fields.fullName.trim().length < 2)
    errors.fullName = 'Full name must be at least 2 characters.';
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Please enter a valid email address.';
  if (!fields.subject)
    errors.subject = 'Please select a subject.';
  if (!fields.message.trim() || fields.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.';
  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative bg-surface-dark clip-diagonal-hero min-h-64 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20" />
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-3">
          Get in Touch
        </p>
        <div className="h-1 w-16 bg-primary mb-6" />
        <h1 className="font-display text-display-lg text-white uppercase leading-tight mb-4">
          Contact Us
        </h1>
        <p className="text-white/70 text-body-lg max-w-xl">
          Ready to start a project or have a question? Our team is here to help — reach out and
          we will get back to you promptly.
        </p>
      </div>
    </section>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="flex items-center gap-1.5 text-primary text-caption mt-1.5">
      <AlertCircle size={12} className="flex-shrink-0" />
      {message}
    </p>
  );
}

function ContactForm() {
  const [fields, setFields] = useState<FormFields>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('submitting');
    // MVP: simulate submission — replace with Resend API route in production
    try {
      await new Promise((res) => setTimeout(res, 1200));
      setStatus('success');
      setFields({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const inputBase =
    'w-full border border-border px-4 py-3 text-body text-sm focus:outline-none focus:border-primary transition-colors duration-200 bg-white placeholder:text-muted';
  const inputError = 'border-primary bg-primary/5';

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-heading-1 text-surface-dark font-semibold mb-3">
          Message Sent
        </h3>
        <p className="text-muted text-body-lg max-w-sm mb-8">
          Thank you for reaching out. Our team will get back to you within one business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="border border-primary text-primary px-8 py-3 text-caption uppercase tracking-wider font-bold hover:bg-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-caption text-surface-dark font-bold uppercase tracking-wider mb-1.5">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={fields.fullName}
            onChange={handleChange}
            placeholder="e.g. John Mwangi"
            className={`${inputBase} ${errors.fullName ? inputError : ''}`}
          />
          <FieldError message={errors.fullName} />
        </div>

        <div>
          <label htmlFor="email" className="block text-caption text-surface-dark font-bold uppercase tracking-wider mb-1.5">
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`${inputBase} ${errors.email ? inputError : ''}`}
          />
          <FieldError message={errors.email} />
        </div>
      </div>

      {/* Row: Phone + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-caption text-surface-dark font-bold uppercase tracking-wider mb-1.5">
            Phone <span className="text-muted font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={handleChange}
            placeholder="+255 7XX XXX XXX"
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-caption text-surface-dark font-bold uppercase tracking-wider mb-1.5">
            Subject <span className="text-primary">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={fields.subject}
            onChange={handleChange}
            className={`${inputBase} ${errors.subject ? inputError : ''} cursor-pointer`}
          >
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value} disabled={s.value === ''}>
                {s.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.subject} />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-caption text-surface-dark font-bold uppercase tracking-wider mb-1.5">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={fields.message}
          onChange={handleChange}
          placeholder="Tell us about your project, timeline, and budget..."
          className={`${inputBase} resize-none ${errors.message ? inputError : ''}`}
        />
        <div className="flex items-start justify-between mt-1">
          <FieldError message={errors.message} />
          <span className={`text-[11px] ml-auto ${fields.message.length < 20 ? 'text-muted' : 'text-primary'}`}>
            {fields.message.length} / 20 min
          </span>
        </div>
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div role="alert" className="flex items-center gap-3 bg-primary/10 border border-primary px-4 py-3">
          <AlertCircle size={16} className="text-primary flex-shrink-0" />
          <p className="text-primary text-caption">
            Something went wrong. Please try again or email us directly at{' '}
            <a href="mailto:shamalcotz@gmail.com" className="font-bold underline">
              shamalcotz@gmail.com
            </a>
            .
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={status === 'submitting'}
        className="w-full bg-primary text-white px-8 py-4 text-caption uppercase tracking-wider font-bold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </div>
  );
}

function ContactDetails() {
  return (
    <div className="flex flex-col gap-6">
      {CONTACT_DETAILS.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex gap-4">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-caption text-muted uppercase tracking-wider font-bold mb-1">
                {item.label}
              </p>
              {item.lines.map((line, i) => (
                item.links?.[i] ? (
                  <a
                    key={line}
                    href={item.links[i]}
                    className="block text-body text-surface-dark hover:text-primary transition-colors duration-200"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={line} className="text-body text-surface-dark">{line}</p>
                )
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MapEmbed() {
  return (
    <div className="mt-8">
      <p className="text-caption text-muted uppercase tracking-wider font-bold mb-3">
        Find Us
      </p>
      <div className="border border-border overflow-hidden">
        <iframe
          title="Shamal (T) Limited — Kawawa Road, Dar es Salaam"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.0!2d39.2694!3d-6.7924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zKTZANzknMzMuNiJTIDM5wrAxNicxMC4yIkU!5e0!3m2!1sen!2stz!4v1"
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHeader />

      {/* Main content */}
      <section className="bg-surface-light py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Form — 7 cols */}
            <div className="lg:col-span-7">
              <div className="mb-10">
                <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-2">
                  Send a Message
                </p>
                <div className="h-1 w-16 bg-primary mb-5" />
                <h2 className="font-heading text-display-lg text-surface-dark font-semibold leading-tight">
                  Let's Talk
                </h2>
              </div>
              <div className="bg-white border border-border p-8">
                <ContactForm />
              </div>
            </div>

            {/* Details — 5 cols */}
            <div className="lg:col-span-5">
              <div className="mb-10">
                <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-2">
                  Our Office
                </p>
                <div className="h-1 w-16 bg-primary mb-5" />
                <h2 className="font-heading text-display-lg text-surface-dark font-semibold leading-tight">
                  Contact Details
                </h2>
              </div>
              <ContactDetails />
              <MapEmbed />
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA band */}
      <section className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-display text-2xl text-white uppercase font-black tracking-wide">
                Prefer to call us directly?
              </p>
              <p className="text-white/70 text-caption mt-1">
                Our team is available Monday–Friday, 08:00–17:00 EAT.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:+255785707070"
                className="bg-white text-primary px-8 py-3 text-caption uppercase tracking-wider font-bold hover:bg-surface-light transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              >
                +255 785 70 70 70
              </a>
              <a
                href="tel:+255719484848"
                className="border border-white text-white px-8 py-3 text-caption uppercase tracking-wider font-bold hover:bg-white hover:text-primary transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              >
                +255 719 48 48 48
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}