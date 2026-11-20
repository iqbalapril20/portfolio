'use client';

import { formatWhatsAppUrl } from '@/lib/richText';
import { scrollToSection } from '@/lib/scroll';
import type { ContactInfo, Profile, WebsiteSetting } from '@/types/portfolio';

interface SiteFooterProps {
  profile: Profile;
  contact: ContactInfo;
  settings: WebsiteSetting;
}

export function SiteFooter({ profile, contact, settings }: SiteFooterProps) {
  const whatsappHref = formatWhatsAppUrl(
    contact.whatsapp,
    'Halo Iqbal, saya menghubungi melalui website portofolio.',
  );

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <button
            type="button"
            onClick={() => scrollToSection('top')}
            className="font-heading font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-0.5 hover:text-[#1d4ed8] transition-colors"
          >
            <span className="text-[#1d4ed8]">&lt;</span>
            {profile.brandMark}
            <span className="text-[#1d4ed8]">/&gt;</span>
          </button>
          <p className="text-xs text-slate-600">
            {profile.fullName} · {profile.degreeLabel}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-700">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="hover:text-[#1d4ed8] py-2 transition-colors"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('portfolio')}
            className="hover:text-[#1d4ed8] py-2 transition-colors"
          >
            Portfolio
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="hover:text-[#1d4ed8] py-2 transition-colors"
          >
            Contact
          </button>
          <a href={`mailto:${contact.email}`} className="hover:text-[#1d4ed8] py-2 transition-colors">
            {contact.email}
          </a>
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1d4ed8] py-2 transition-colors"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-8 pt-2 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
        <p>{settings.footerText}</p>
        <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
}
