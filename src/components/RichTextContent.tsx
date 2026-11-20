import { sanitizeRichHtml } from '@/lib/richText';

interface RichTextContentProps {
  content: string;
  className?: string;
}

export function RichTextContent({ content, className = '' }: RichTextContentProps) {
  const safeHtml = sanitizeRichHtml(content);
  if (!safeHtml) return null;

  return (
    <div
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
