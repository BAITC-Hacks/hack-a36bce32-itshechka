import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function SourceTextDialog({ isOpen, onClose, title, text }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Исходный текст лекции">
      <button className="absolute inset-0 bg-slate-950/30" aria-label="Закрыть" onClick={onClose} />
      <section className="relative h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-brand-700">Исходный текст</p><h2 className="mt-2 text-2xl font-bold text-slate-950">{title}</h2></div><button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Закрыть" onClick={onClose}><X /></button></div>
        <p className="mt-7 whitespace-pre-wrap text-sm leading-7 text-slate-600">{text}</p>
      </section>
    </div>
  );
}
