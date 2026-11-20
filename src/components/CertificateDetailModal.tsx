'use client';

import { Award } from 'lucide-react';
import Image from 'next/image';
import { getTranslations, type Locale } from '@/lib/i18n';
import type { Certificate } from '@/types/portfolio';
import { AccessibleModal } from './AccessibleModal';

interface CertificateDetailModalProps {
  certificate: Certificate | null;
  locale: Locale;
  onClose: () => void;
}

export function CertificateDetailModal({
  certificate,
  locale,
  onClose,
}: CertificateDetailModalProps) {
  const t = getTranslations(locale);

  return (
    <AccessibleModal
      open={Boolean(certificate)}
      onClose={onClose}
      eyebrow={certificate ? `${certificate.category} · ${certificate.issuer}` : undefined}
      title={certificate?.title || t.certModal.defaultTitle}
      maxWidthClass="max-w-2xl"
      closeLabel={t.certModal.closeLabel}
    >
      {certificate && (
        <div className="space-y-5">
          {certificate.imageUrl && (
            <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
              <Image
                src={certificate.imageUrl}
                alt={`${certificate.title} - ${certificate.issuer}`}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#EFF6FF] border border-blue-200">
            <div className="w-11 h-11 rounded-lg bg-white border border-blue-200 text-[#1D4ED8] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-[#0F172A]">
                {certificate.issuer}
              </p>
              <p className="font-mono text-xs text-[#1D4ED8]">
                {certificate.issuedAt
                  ? `${t.certModal.issuedPrefix} ${certificate.issuedAt}`
                  : certificate.category}
              </p>
            </div>
          </div>

          {certificate.description && (
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              {certificate.description}
            </p>
          )}

          {certificate.skills && certificate.skills.length > 0 && (
            <div className="space-y-1.5">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-600">
                {t.certModal.skillsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs font-medium text-[#0F172A]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E2E8F0] font-mono text-xs">
            <div>
              <dt className="text-[#475569]">{t.certModal.issuerLabel}</dt>
              <dd className="text-[#0F172A] font-semibold mt-1">{certificate.issuer}</dd>
            </div>
            <div>
              <dt className="text-[#475569]">{t.certModal.credentialLabel}</dt>
              <dd className="text-[#0F172A] font-semibold mt-1">
                {certificate.credentialNumber || t.certModal.credentialFallback}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </AccessibleModal>
  );
}
