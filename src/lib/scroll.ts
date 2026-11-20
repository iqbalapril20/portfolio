export type SectionId = 'top' | 'about' | 'portfolio' | 'contact';

export function scrollToSection(id: SectionId, behavior: ScrollBehavior = 'smooth') {
  if (typeof window === 'undefined') return;

  if (id === 'top') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior, block: 'start' });
  }
}
