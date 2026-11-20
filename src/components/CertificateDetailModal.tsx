'use client';

import { Award } from 'lucide-react';
import type { Certificate } from '@/types/portfolio';
import { AccessibleModal } from './AccessibleModal';

interface CertificateDetailModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateDetailModal({ certificate, onClose }: CertificateDetailModalProps) {
  return (
    <AccessibleModal
      open={Boolean(certificate)}
      onClose={onClose}
      eyebrow={certificate ? `${certificate.category} · ${certificate.issuer}` : undefined}
      title={certificate?.title || 'Detail Sertifikat'}
      maxWidthClass="max-w-xl"
      closeLabel="Tutup detail sertifikat"
    >
      {certificate && (
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#EFF6FF] border border-blue-200">
            <div className="w-11 h-11 rounded-lg bg-white border border-blue-200 text-[#1D4ED8] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-[#0F172A]">
                {certificate.issuer}
              </p>
              <p className="font-mono text-xs text-[#1D4ED8]">{certificate.category}</p>
            </div>
          </div>

          {certificate.description && (
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              {certificate.description}
            </p>
          )}

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E2E8F0] font-mono text-xs">
            <div>
              <dt className="text-[#475569]">Penerbit</dt>
              <dd className="text-[#0F172A] font-semibold mt-1">{certificate.issuer}</dd>
            </div>
            <div>
              <dt className="text-[#475569]">Nomor Kredensial</dt>
              <dd className="text-[#0F172A] font-semibold mt-1">
                {certificate.credentialNumber || 'Tercatat pada arsip resmi'}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </AccessibleModal>
  );
}
