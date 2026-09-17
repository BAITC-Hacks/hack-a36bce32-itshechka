import { ArrowRight, FileText, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../../../shared/ui/Badge';
import Button from '../../../shared/ui/Button';

const statusMap = {
  completed: { label: 'Готово', tone: 'success' },
  processing: { label: 'Обработка', tone: 'warning' },
  failed: { label: 'Ошибка', tone: 'neutral' },
};

export default function LectureListItem({ lecture, onDelete }) {
  const status = statusMap[lecture.status];
  const target = lecture.status === 'completed' ? `/lectures/${lecture.id}` : `/lectures/${lecture.id}/processing`;
  return (
    <article className="flex flex-col gap-4 border-b border-slate-100 px-4 py-5 transition hover:bg-slate-50/70 last:border-0 sm:flex-row sm:items-center sm:px-5">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500"><FileText size={20} /></div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2"><h2 className="truncate font-bold text-slate-900">{lecture.title}</h2><Badge tone={status.tone}>{status.label}</Badge></div>
        <p className="mt-1 text-xs text-slate-400">{new Date(lecture.createdAt).toLocaleDateString('ru-RU')} · {lecture.wordCount} слов</p>
      </div>
      <div className="flex items-center justify-between gap-2 sm:justify-start">
        <Button aria-label="Удалить лекцию" onClick={() => onDelete(lecture.id)} size="sm" variant="ghost"><Trash2 size={17} /></Button>
        <Link className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-brand-700 transition hover:translate-x-0.5 hover:bg-brand-50" to={target}>Открыть<ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}
