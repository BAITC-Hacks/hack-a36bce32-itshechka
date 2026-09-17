import { BookOpenText, ClipboardCheck, Layers3, ListChecks, Target } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';

const tabs = [
  { path: '', label: 'Конспект', icon: BookOpenText, end: true },
  { path: 'key-points', label: 'Тезисы', icon: ListChecks },
  { path: 'quiz', label: 'Тест', icon: ClipboardCheck },
  { path: 'flashcards', label: 'Карточки', icon: Layers3 },
  { path: 'focus', label: 'Фокус', icon: Target },
];

export default function MaterialTabs() {
  const { lectureId } = useParams();
  return (
    <nav className="grid grid-cols-5 gap-1 rounded-2xl border border-slate-200 bg-white p-1 sm:flex" aria-label="Материалы лекции">
      {tabs.map(({ path, label, icon: Icon, end }) => (
        <NavLink
          className={({ isActive }) => `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-semibold transition duration-200 sm:min-w-max sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${isActive ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
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
