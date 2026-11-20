import { formatWhatsAppUrl } from '@/lib/richText';
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
    <footer className="w-full bg-[#F1F5F9] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-1">
          <a
            href="#top"
            className="font-heading font-extrabold text-xl tracking-tight text-[#0F172A] hover:text-[#1D4ED8] transition-colors inline-block"
          >
            <span className="text-[#1D4ED8]">&lt;</span>
            {profile.brandMark}
            <span className="text-[#1D4ED8]">/&gt;</span>
          </a>
          <p className="text-xs text-[#475569]">{settings.footerText}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-[#334155]">
          <a href="#about" className="hover:text-[#1D4ED8] py-2 transition-colors">
            Tentang
          </a>
          <a href="#portfolio" className="hover:text-[#1D4ED8] py-2 transition-colors">
            Portofolio
          </a>
          <a href={`mailto:${contact.email}`} className="hover:text-[#1D4ED8] py-2 transition-colors">
            {contact.email}
          </a>
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D4ED8] py-2 transition-colors"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
