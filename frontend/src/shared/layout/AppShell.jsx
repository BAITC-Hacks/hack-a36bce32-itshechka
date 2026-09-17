import { BookOpen, History, LogOut, Menu, Plus, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const navigation = [
  { to: '/', label: 'Новая лекция', icon: Plus, end: true },
  { to: '/history', label: 'Мои материалы', icon: History },
  { to: '/profile', label: 'Профиль', icon: UserRound },
];

function Navigation({ close }) {
  const logout = useAuthStore((state) => state.logout);
  return (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Основная навигация">
      {navigation.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}
          end={end}
          key={to}
          onClick={close}
          to={to}
        >
          <Icon size={19} strokeWidth={1.8} />
          {label}
        </NavLink>
      ))}
      <button className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-950" onClick={logout}>
        <LogOut size={19} strokeWidth={1.8} />
        Выйти
      </button>
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white"><BookOpen size={21} /></div>
      <div><p className="font-bold text-slate-950">Lectora</p><p className="text-xs text-slate-400">HackAlem AI</p></div>
    </div>
  );
}

export default function AppShell() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white p-5 lg:flex">
        <Brand />
        <div className="my-6 h-px bg-slate-100" />
        <Navigation />
        <div className="mt-5 rounded-xl bg-slate-50 px-3 py-3">
          <p className="truncate text-sm font-semibold text-slate-800">{user?.name}</p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
        <Brand />
        <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Открыть меню" onClick={() => setIsOpen(true)}><Menu /></button>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-slate-950/30" aria-label="Закрыть меню" onClick={() => setIsOpen(false)} />
          <aside className="relative flex h-full w-72 flex-col bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between"><Brand /><button className="rounded-lg p-2 hover:bg-slate-100" onClick={() => setIsOpen(false)}><X /></button></div>
            <div className="my-6 h-px bg-slate-100" />
            <Navigation close={() => setIsOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10"><Outlet /></div>
      </div>
    </div>
  );
}
