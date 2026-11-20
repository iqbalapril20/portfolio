'use client';

import { CheckCircle2, Layers } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import { AccessibleModal } from './AccessibleModal';
import { RichTextContent } from './RichTextContent';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  return (
    <AccessibleModal
      open={Boolean(project)}
      onClose={onClose}
      eyebrow={
        project
          ? `${project.category.name}${project.year ? ` · ${project.year}` : ''}`
          : undefined
      }
      title={project?.title || 'Detail Proyek'}
      maxWidthClass="max-w-3xl"
      closeLabel="Tutup detail proyek"
    >
      {project && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0]">
            <RichTextContent
              content={project.fullDescription || project.shortDescription}
              className="text-sm sm:text-base text-[#334155] leading-relaxed"
            />
          </div>

          {project.problemSolved && (
            <div className="pl-4 py-1 border-l-2 border-[#1D4ED8] space-y-1.5">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">
                Permasalahan &amp; Solusi
              </h3>
              <RichTextContent
                content={project.problemSolved}
                className="text-sm text-[#334155] leading-relaxed"
              />
            </div>
          )}

          {project.role && (
            <div className="p-4 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] space-y-1">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                Peran Pengembangan
              </h3>
              <p className="text-sm text-[#334155] leading-relaxed">{project.role}</p>
            </div>
          )}

          {project.keyFeatures.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#475569]">
                Fitur Utama Sistem
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={`${feat.title}-${idx}`}
                    className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0" aria-hidden="true" />
                      <h4 className="font-heading text-base font-bold text-[#0F172A]">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2.5 pt-2 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#475569]">
              <Layers className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
              <span>Teknologi yang Digunakan</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] font-mono text-xs font-medium text-[#0F172A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
            <a
              href="#contact"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center transition-colors"
            >
              Diskusikan Proyek Serupa
            </a>
          </div>
        </div>
      )}
    </AccessibleModal>
  );
}
