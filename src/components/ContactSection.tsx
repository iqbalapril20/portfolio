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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formatWhatsAppUrl } from '@/lib/richText';
import type { ContactInfo, Profile, WebsiteSetting } from '@/types/portfolio';
import { ScrollReveal } from './MotionPrimitives';

const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Nama minimal 2 karakter').max(120),
  email: z.string().trim().email('Masukkan alamat email yang valid'),
  subject: z.string().trim().min(3, 'Subjek minimal 3 karakter').max(200),
  message: z.string().trim().min(10, 'Pesan minimal 10 karakter').max(3000),
});

type InquiryValues = z.infer<typeof inquirySchema>;

interface ContactSectionProps {
  contact: ContactInfo;
  profile: Profile;
  settings: WebsiteSetting;
}

export function ContactSection({ contact, profile, settings }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const whatsappHref = formatWhatsAppUrl(
    contact.whatsapp,
    'Halo Iqbal, saya tertarik untuk berdiskusi mengenai proyek atau kolaborasi pengembangan web.',
  );

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
    // Frontend-only mode: validate input, simulate brief network dispatch, and provide direct mailto fallback
    await new Promise((resolve) => window.setTimeout(resolve, 400));
    setSubmittedNotice(
      `Terima kasih, ${values.name}. Pesan dengan subjek "${values.subject}" telah tercatat di pratinjau frontend. Untuk pengiriman langsung saat ini, Anda dapat meneruskan lewat WhatsApp atau Email di sebelah kiri.`,
    );
    reset();
  }

  return (
    <section id="contact" className="scroll-mt-20 w-full py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (5 cols): Direct Contact Channels */}
          <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#1D4ED8] uppercase">
                  03 / Kontak &amp; Kolaborasi
                </span>
                <span className="h-px w-12 bg-[#E2E8F0]" aria-hidden="true" />
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] leading-tight">
                {settings.contactSectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                {contact.additionalInfo || settings.contactSectionSubtitle}
              </p>
            </div>

            <div className="space-y-3">
              {/* Direct Email Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#475569] block">
                      Email Langsung
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm font-bold text-[#0F172A] hover:text-[#1D4ED8] truncate block"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-live="polite"
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors ${
                    copiedEmail
                      ? 'bg-[#047857] border-[#047857] text-white'
                      : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Salin Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Channel */}
              {whatsappHref && contact.whatsapp && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 sm:p-5 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] hover:border-[#1D4ED8] flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#475569] block">
                        WhatsApp
                      </span>
                      <span className="text-sm font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors block">
                        {contact.whatsapp}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#1D4ED8] shrink-0">
                    Chat Langsung
                  </span>
                </a>
              )}

              {/* Location & Availability */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] text-[#334155] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#475569] block">
                    Lokasi &amp; Ketersediaan
                  </span>
                  <p className="text-sm font-bold text-[#0F172A]">{contact.location}</p>
                  <p className="text-xs text-[#475569] mt-0.5">{profile.availabilityText}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column (7 cols): Inquiry Form */}
          <ScrollReveal
            direction="right"
            delay={0.08}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#FAFBFD] border border-[#E2E8F0] shadow-sm"
          >
            <div className="pb-4 mb-6 border-b border-[#E2E8F0]">
              <h3 className="font-heading text-2xl font-bold text-[#0F172A]">Kirim Pesan</h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                Mode frontend aktif. Validasi formulir berjalan langsung di browser.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#334155]"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nama Lengkap Anda"
                    aria-invalid={Boolean(errors.name)}
                    {...register('name')}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#475569]/70 focus:border-[#1D4ED8]"
                  />
                  {errors.name && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#334155]"
                  >
                    Alamat Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="email@contoh.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#475569]/70 focus:border-[#1D4ED8]"
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-[#334155]"
                >
                  Subjek Diskusi
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Pengembangan aplikasi web atau kolaborasi"
                  aria-invalid={Boolean(errors.subject)}
                  {...register('subject')}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#475569]/70 focus:border-[#1D4ED8]"
                />
                {errors.subject && (
                  <p role="alert" className="text-xs font-medium text-red-700">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-[#334155]"
                >
                  Detail Pesan
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Ceritakan kebutuhan aplikasi web atau kolaborasi Anda..."
                  aria-invalid={Boolean(errors.message)}
                  {...register('message')}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-[#475569]/70 focus:border-[#1D4ED8] resize-y min-h-[120px]"
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
                  className="flex items-start gap-2.5 p-4 rounded-xl bg-[#ECFDF5] border border-emerald-200 text-xs sm:text-sm text-[#047857] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{submittedNotice}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-xs font-semibold text-[#475569] hover:text-[#1D4ED8] underline underline-offset-4"
                >
                  Atau buka aplikasi email
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[44px] px-6 py-3 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.99] text-white text-sm font-semibold inline-flex items-center gap-2 transition-all disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
