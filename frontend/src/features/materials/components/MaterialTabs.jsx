import { BookOpenText, ClipboardCheck, Layers3, ListChecks } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';

const tabs = [
  { path: '', label: 'Конспект', icon: BookOpenText, end: true },
  { path: 'key-points', label: 'Тезисы', icon: ListChecks },
  { path: 'quiz', label: 'Тест', icon: ClipboardCheck },
  { path: 'flashcards', label: 'Карточки', icon: Layers3 },
];

export default function MaterialTabs() {
  const { lectureId } = useParams();
  return (
    <nav className="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5" aria-label="Материалы лекции">
      {tabs.map(({ path, label, icon: Icon, end }) => (
        <NavLink
          className={({ isActive }) => `flex min-w-max flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-slate-950 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          end={end}
          key={path}
          to={`/lectures/${lectureId}${path ? `/${path}` : ''}`}
        >
          <Icon size={17} />{label}
        </NavLink>
      ))}
    </nav>
  );
}
