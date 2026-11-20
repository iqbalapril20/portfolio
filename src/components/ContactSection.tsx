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
    await new Promise((resolve) => window.setTimeout(resolve, 400));
    setSubmittedNotice(
      `Terima kasih, ${values.name}. Pesan "${values.subject}" telah tercatat di pratinjau frontend. Untuk respons tercepat, silakan hubungi langsung lewat WhatsApp atau Email di sebelah kiri.`,
    );
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
            Contact
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Side: Pitch & Direct Channels matching legacy/index4.html */}
          <ScrollReveal direction="left" className="lg:col-span-5 min-w-0 flex flex-col gap-6">
            <div>
              {profile.isAvailable && (
                <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] uppercase mb-3">
                  Open to Opportunities
                </span>
              )}
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
                {settings.contactSectionTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed">
                {contact.additionalInfo || settings.contactSectionSubtitle}
              </p>
            </div>

            {/* Direct Channel Card matching legacy/index4.html */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d4ed8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-slate-600 block uppercase tracking-wider">
                      Email Langsung
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
                          WhatsApp
                        </span>
                        <span className="text-sm font-bold text-slate-900">{contact.whatsapp}</span>
                      </div>
                    </div>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow px-4 py-2 rounded-full bg-[#1d4ed8] hover:bg-[#0d5bff] text-white text-xs font-semibold transition-all min-h-[38px] inline-flex items-center"
                    >
                      Chat WhatsApp
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
                    Lokasi
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {contact.location} · {profile.availabilityText}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Side: Inquiry Form Card matching legacy/index4.html rounded-3xl */}
          <ScrollReveal
            direction="right"
            delay={0.08}
            className="lg:col-span-7 min-w-0 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg"
          >
            <h3 className="font-heading font-bold text-2xl text-slate-900 mb-1">
              Kirim Pesan &amp; Diskusi
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Mode frontend aktif. Validasi formulir berjalan langsung di browser.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700" htmlFor="contact-name">
                    Nama Lengkap *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nama Lengkap Anda"
                    aria-invalid={Boolean(errors.name)}
                    {...register('name')}
                    className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-[#1d4ed8] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-500"
                  />
                  {errors.name && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700" htmlFor="contact-email">
                    Alamat Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="email@contoh.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                    className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-[#1d4ed8] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-500"
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
                  Subjek Diskusi *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Pengembangan aplikasi web atau kolaborasi"
                  aria-invalid={Boolean(errors.subject)}
                  {...register('subject')}
                  className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-[#1d4ed8] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-500"
                />
                {errors.subject && (
                  <p role="alert" className="text-xs font-medium text-red-700">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700" htmlFor="contact-message">
                  Detail Pesan *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Ceritakan kebutuhan aplikasi web atau kolaborasi Anda..."
                  aria-invalid={Boolean(errors.message)}
                  {...register('message')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-[#1d4ed8] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-500 resize-y min-h-[120px]"
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
                  Atau kirim lewat aplikasi email
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-glow min-h-[44px] px-8 py-3.5 rounded-full bg-[#1d4ed8] hover:bg-[#0d5bff] text-white font-semibold text-sm shadow-md shadow-blue-600/25 flex items-center gap-2 transition-all disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
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
