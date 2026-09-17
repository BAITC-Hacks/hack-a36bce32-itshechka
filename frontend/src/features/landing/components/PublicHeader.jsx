import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Brand from '../../../shared/ui/Brand';
import Button from '../../../shared/ui/Button';
import useAuthStore from '../../../store/authStore';

const links = [
  { href: '#how-it-works', label: 'Как работает' },
  { href: '#materials', label: 'Возможности' },
  { href: '#accuracy', label: 'Точность' },
];

export default function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const token = useAuthStore((state) => state.token);
  const destination = token ? '/app' : '/login';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Навигация по странице">
          {links.map((link) => <a className="text-sm font-medium text-slate-500 transition hover:text-slate-950" href={link.href} key={link.href}>{link.label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {!token && <Button as={Link} to="/login" variant="ghost">Войти</Button>}
          <Button as={Link} to={destination}>{token ? 'В рабочее пространство' : 'Начать'}<ArrowRight size={16} /></Button>
        </div>
        <button className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 md:hidden" onClick={() => setIsOpen((value) => !value)} aria-expanded={isOpen} aria-label="Открыть меню">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {isOpen && (
        <div className="animate-slide-down border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => <a className="rounded-xl px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50" href={link.href} key={link.href} onClick={() => setIsOpen(false)}>{link.label}</a>)}
          </nav>
          <Button as={Link} className="mt-3 w-full" size="lg" to={destination}>{token ? 'В рабочее пространство' : 'Войти и начать'}<ArrowRight size={17} /></Button>
        </div>
      )}
    </header>
  );
}
