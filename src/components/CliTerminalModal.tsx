'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getTranslations, type Locale } from '@/lib/i18n';
import type { PortfolioData } from '@/types/portfolio';
import { AccessibleModal } from './AccessibleModal';

interface CliTerminalModalProps {
  open: boolean;
  onClose: () => void;
  data: PortfolioData;
  locale: Locale;
}

interface TerminalLine {
  id: number;
  kind: 'input' | 'output' | 'accent';
  text: string;
}

export function CliTerminalModal({ open, onClose, data, locale }: CliTerminalModalProps) {
  const t = getTranslations(locale);
  const [command, setCommand] = useState('');
  const nextIdRef = useRef(3);
  const outputRef = useRef<HTMLDivElement>(null);

  const [lines, setLines] = useState<TerminalLine[]>(() => [
    { id: 1, kind: 'accent', text: t.cli.welcomeAccent },
    { id: 2, kind: 'output', text: t.cli.welcomeReady(data.profile.fullName) },
  ]);

  useEffect(() => {
    setLines([
      { id: nextIdRef.current++, kind: 'accent', text: t.cli.welcomeAccent },
      { id: nextIdRef.current++, kind: 'output', text: t.cli.welcomeReady(data.profile.fullName) },
    ]);
  }, [locale, data.profile.fullName, t.cli]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  function appendLines(entries: Array<{ kind: TerminalLine['kind']; text: string }>) {
    setLines((prev) => [
      ...prev,
      ...entries.map((entry) => ({ ...entry, id: nextIdRef.current++ })),
    ]);
  }

  function handleCommandSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = command.trim();
    if (!raw) return;
    setCommand('');

    const cmd = raw.toLowerCase();

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    if (cmd === 'exit') {
      onClose();
      return;
    }

    const responses: Array<{ kind: TerminalLine['kind']; text: string }> = [
      { kind: 'input', text: `$ ${raw}` },
    ];

    if (cmd === 'help') {
      responses.push({ kind: 'output', text: t.cli.helpText });
    } else if (cmd === 'whoami') {
      responses.push({
        kind: 'output',
        text: `${data.profile.fullName} (${data.profile.degreeLabel}) - ${data.profile.heroRoles.join(', ')}`,
      });
    } else if (cmd === 'bio') {
      responses.push({ kind: 'output', text: data.profile.aboutSummary });
    } else if (cmd === 'projects') {
      responses.push({
        kind: 'output',
        text: `${t.cli.projectsPrefix(data.projects.length)} ${data.projects
          .map((p) => p.title)
          .join(' | ')}`,
      });
    } else if (cmd === 'skills') {
      responses.push({
        kind: 'output',
        text: `${t.cli.techPrefix(data.techStacks.length)} ${data.techStacks
          .map((item) => item.name)
          .join(', ')}`,
      });
    } else if (cmd === 'contact') {
      responses.push({
        kind: 'output',
        text: `Email: ${data.contact.email} | WhatsApp: ${data.contact.whatsapp ?? '-'} | ${t.cli.locationLabel}: ${data.contact.location}`,
      });
    } else {
      responses.push({ kind: 'accent', text: t.cli.unknownCommand(raw) });
    }

    appendLines(responses);
  }

  return (
    <AccessibleModal
      open={open}
      onClose={onClose}
      eyebrow="Interactive Portfolio Shell"
      title="iqbal@portfolio ~ zsh"
      maxWidthClass="max-w-2xl"
      closeLabel={t.cli.closeLabel}
      darkSurface
    >
      <div className="space-y-4">
        <div
          ref={outputRef}
          className="h-64 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs space-y-2"
        >
          {lines.map((line) => (
            <p
              key={line.id}
              className={
                line.kind === 'input'
                  ? 'text-white font-semibold'
                  : line.kind === 'accent'
                    ? 'text-blue-300'
                    : 'text-slate-300 leading-relaxed'
              }
            >
              {line.text}
            </p>
          ))}
        </div>

        <form
          onSubmit={handleCommandSubmit}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2"
        >
          <label htmlFor="cli-command-input" className="font-mono text-xs text-blue-400 font-bold">
            &gt;
          </label>
          <input
            id="cli-command-input"
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder={t.cli.inputPlaceholder}
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder:text-slate-400 focus:outline-none min-h-[36px]"
          />
          <button
            type="submit"
            className="min-h-[36px] px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold transition-colors"
          >
            {t.cli.runButton}
          </button>
        </form>
      </div>
    </AccessibleModal>
  );
}
