'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getTranslations, type Locale } from '@/lib/i18n';
import { formatWhatsAppUrl } from '@/lib/richText';
import type { ContactInfo, Profile, WebsiteSetting } from '@/types/portfolio';
import { ScrollReveal } from './MotionPrimitives';

interface InquiryValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactSectionProps {
  contact: ContactInfo;
  profile: Profile;
  settings: WebsiteSetting;
  locale: Locale;
}

export function ContactSection({ contact, profile, settings, locale }: ContactSectionProps) {
  const t = getTranslations(locale);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  const inquirySchema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t.contact.nameError).max(120),
        email: z.string().trim().email(t.contact.emailError),
        subject: z.string().trim().min(3, t.contact.subjectError).max(200),
        message: z.string().trim().min(10, t.contact.messageError).max(3000),
      }),
    [t.contact.nameError, t.contact.emailError, t.contact.subjectError, t.contact.messageError],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const whatsappHref = formatWhatsAppUrl(contact.whatsapp, t.contact.whatsappPrefill);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  }

  async function onSubmit(values: InquiryValues) {
    await new Promise((resolve) => window.setTimeout(resolve, 400));
    setSubmittedNotice(t.contact.submittedMessage(values.name, values.subject));
    reset();
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 relative w-full py-16 sm:py-20 bg-white contact-wave-pattern overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <ScrollReveal direction="up" className="text-center mb-12 sm:mb-14">
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            {t.contact.sectionTitle}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Side: Pitch & Direct Channels */}
          <ScrollReveal direction="left" className="lg:col-span-5 min-w-0 flex flex-col gap-6">
            <div>
              {profile.isAvailable && (
                <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] uppercase mb-3">
                  {t.contact.openOpportunities}
                </span>
              )}
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
                {settings.contactSectionTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed">
                {contact.additionalInfo || settings.contactSectionSubtitle}
              </p>
            </div>

            {/* Direct Channel Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d4ed8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-slate-600 block uppercase tracking-wider">
                      {t.contact.directEmailLabel}
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm font-bold text-slate-900 hover:text-[#1d4ed8] truncate block"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-live="polite"
                  className={`btn-glow px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 min-h-[38px] ${
                    copiedEmail
                      ? 'bg-[#047857] text-white'
                      : 'bg-slate-100 hover:bg-[#1d4ed8] hover:text-white text-slate-700'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.contact.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.contact.copyEmail}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="h-[1px] w-full bg-slate-100" aria-hidden="true" />

              {whatsappHref && contact.whatsapp && (
                <>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#047857] flex items-center justify-center shrink-0">
                        <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-slate-600 block uppercase tracking-wider">
                          {t.contact.whatsappLabel}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{contact.whatsapp}</span>
                      </div>
                    </div>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow px-4 py-2 rounded-full bg-[#1d4ed8] hover:bg-[#0d5bff] text-white text-xs font-semibold transition-colors min-h-[38px] inline-flex items-center"
                    >
                      {t.contact.whatsappAction}
                    </a>
                  </div>
                  <div className="h-[1px] w-full bg-slate-100" aria-hidden="true" />
                </>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-600 block uppercase tracking-wider">
                    {t.contact.locationLabel}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {contact.location} · {profile.availabilityText}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Side: Inquiry Form Card */}
          <ScrollReveal
            direction="right"
            delay={0.08}
            className="lg:col-span-7 min-w-0 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200"
          >
            <h3 className="font-heading font-bold text-2xl text-slate-900 mb-1">
              {t.contact.formTitle}
            </h3>
            <p className="text-xs text-slate-600 mb-6">{t.contact.formSubtitle}</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700" htmlFor="contact-name">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.contact.namePlaceholder}
                    aria-invalid={Boolean(errors.name)}
                    {...register('name')}
                    className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-[#1d4ed8] focus:ring-2 focus:ring-blue-100 outline-none transition-colors placeholder:text-slate-500"
                  />
                  {errors.name && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700" htmlFor="contact-email">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.contact.emailPlaceholder}
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                    className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-[#1d4ed8] focus:ring-2 focus:ring-blue-100 outline-none transition-colors placeholder:text-slate-500"
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700" htmlFor="contact-subject">
                  {t.contact.subjectLabel}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder={t.contact.subjectPlaceholder}
                  aria-invalid={Boolean(errors.subject)}
                  {...register('subject')}
                  className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-[#1d4ed8] focus:ring-2 focus:ring-blue-100 outline-none transition-colors placeholder:text-slate-500"
                />
                {errors.subject && (
                  <p role="alert" className="text-xs font-medium text-red-700">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700" htmlFor="contact-message">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder={t.contact.messagePlaceholder}
                  aria-invalid={Boolean(errors.message)}
                  {...register('message')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-[#1d4ed8] focus:ring-2 focus:ring-blue-100 outline-none transition-colors placeholder:text-slate-500 resize-y min-h-[120px]"
                />
                {errors.message && (
                  <p role="alert" className="text-xs font-medium text-red-700">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submittedNotice && (
                <div
                  role="status"
                  className="flex items-start gap-2.5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-[#047857] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{submittedNotice}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-xs font-semibold text-slate-600 hover:text-[#1d4ed8] underline underline-offset-4"
                >
                  {t.contact.emailAppLink}
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-glow min-h-[44px] px-8 py-3.5 rounded-full bg-[#1d4ed8] hover:bg-[#0d5bff] text-white font-semibold text-sm flex items-center gap-2 transition-colors disabled:opacity-60"
                >
                  <span>{isSubmitting ? t.contact.submitting : t.contact.submit}</span>
                  <Send className="w-4 h-4 btn-icon-move" aria-hidden="true" />
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
