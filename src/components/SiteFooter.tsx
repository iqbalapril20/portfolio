'use client';

import { getTranslations, type Locale } from '@/lib/i18n';
import { formatWhatsAppUrl } from '@/lib/richText';
import { scrollToSection } from '@/lib/scroll';
import type { ContactInfo, Profile, WebsiteSetting } from '@/types/portfolio';
import { VisitorCounter } from './VisitorCounter';

interface SiteFooterProps {
  profile: Profile;
  contact: ContactInfo;
  settings: WebsiteSetting;
  locale: Locale;
}

export function SiteFooter({ profile, contact, settings, locale }: SiteFooterProps) {
  const t = getTranslations(locale);
  const whatsappHref = formatWhatsAppUrl(contact.whatsapp, t.footer.whatsappPrefill);

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
            {t.footer.about}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('portfolio')}
            className="hover:text-[#1d4ed8] py-2 transition-colors"
          >
            {t.footer.portfolio}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="hover:text-[#1d4ed8] py-2 transition-colors"
          >
            {t.footer.contact}
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
              {t.footer.whatsapp}
            </a>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-8 pt-4 border-t border-slate-200/70 flex flex-col md:flex-row items-center justify-between text-xs text-slate-600 gap-3">
        <p>{settings.footerText}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <VisitorCounter locale={locale} />
          <p>{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
