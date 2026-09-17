import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Brand({ compact = false, inverse = false, to = '/' }) {
  return (
    <Link className="group inline-flex items-center gap-3 rounded-xl" to={to} aria-label="Lectora — на главную">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-sm transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
        <BookOpen size={21} />
      </span>
      {!compact && (
        <span>
          <span className={`block font-bold leading-tight ${inverse ? 'text-white' : 'text-slate-950'}`}>Lectora</span>
          <span className={`block text-xs ${inverse ? 'text-slate-400' : 'text-slate-400'}`}>HackAlem AI</span>
        </span>
      )}
    </Link>
  );
}
