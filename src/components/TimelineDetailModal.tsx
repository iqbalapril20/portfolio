'use client';

import { Briefcase, Calendar, GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/i18n';
import type { Education, Experience } from '@/types/portfolio';
import { AccessibleModal } from './AccessibleModal';
import { RichTextContent } from './RichTextContent';

export type SelectedTimelineItem =
  | { kind: 'education'; item: Education }
  | { kind: 'experience'; item: Experience };

interface TimelineDetailModalProps {
  selected: SelectedTimelineItem | null;
  locale: Locale;
  onClose: () => void;
}

export function TimelineDetailModal({ selected, locale, onClose }: TimelineDetailModalProps) {
  const t = getTranslations(locale);

  const isEdu = selected?.kind === 'education';
  const organization = selected
    ? isEdu
      ? selected.item.institution
      : selected.item.organization
    : '';
  const title = selected
    ? isEdu
      ? selected.item.degree
      : selected.item.title
    : '';
  const period = selected
    ? isEdu
      ? `${selected.item.startYear ?? ''} - ${selected.item.isCurrent ? t.about.present : (selected.item.endYear ?? '')}`
      : `${selected.item.startDate} - ${selected.item.isCurrent ? t.about.present : (selected.item.endDate ?? '')}`
    : '';
  const metaLine = selected
    ? isEdu
      ? selected.item.major
      : [selected.item.employmentType, selected.item.location].filter(Boolean).join(' · ')
    : '';
  const logoUrl = selected?.item.logoUrl;
  const description = selected?.item.description;
  const techTags = selected && selected.kind === 'experience' ? selected.item.techTags : [];

  return (
    <AccessibleModal
      open={Boolean(selected)}
      onClose={onClose}
      eyebrow={isEdu ? t.about.modalEyebrowEducation : t.about.modalEyebrowExperience}
      title={title}
      maxWidthClass="max-w-2xl"
      closeLabel={t.about.modalCloseLabel}
    >
      {selected && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={organization}
                    fill
                    unoptimized
                    sizes="48px"
                    className="object-contain p-1.5"
                  />
                ) : isEdu ? (
                  <GraduationCap className="w-6 h-6 text-[#1d4ed8]" aria-hidden="true" />
                ) : (
                  <Briefcase className="w-6 h-6 text-[#1d4ed8]" aria-hidden="true" />
                )}
              </div>

              <div className="min-w-0">
                <p className="font-heading text-lg font-bold text-slate-900 leading-snug">
                  {organization}
                </p>
                {metaLine && (
                  <p className="text-xs font-medium text-slate-600 mt-0.5 flex items-center gap-1.5">
                    {!isEdu && <MapPin className="w-3.5 h-3.5 text-[#1d4ed8] shrink-0" aria-hidden="true" />}
                    <span>{metaLine}</span>
                  </p>
                )}
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 font-mono text-xs font-semibold text-slate-700 self-start sm:self-center shrink-0">
              <Calendar className="w-3.5 h-3.5 text-[#1d4ed8]" aria-hidden="true" />
              <span>{period}</span>
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1d4ed8]">
              {t.about.modalDescriptionTitle}
            </h3>
            {description ? (
              <RichTextContent
                content={description}
                className="text-sm text-[#334155] leading-relaxed"
              />
            ) : (
              <p className="text-sm text-[#475569] leading-relaxed">{t.about.modalNoDescription}</p>
            )}
          </div>

          {techTags.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-slate-200">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-600">
                {t.about.modalTechTitle}
              </h3>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs font-medium text-slate-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </AccessibleModal>
  );
}
