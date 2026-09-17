import { History, Home, LogOut, Menu, Plus, UserRound, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useLectureStore from '../../store/lectureStore';
import Brand from '../ui/Brand';

const navigation = [
  { to: '/app', label: 'Новая лекция', shortLabel: 'Новая', icon: Plus, end: true },
  { to: '/history', label: 'Мои материалы', shortLabel: 'Материалы', icon: History },
  { to: '/profile', label: 'Профиль', shortLabel: 'Профиль', icon: UserRound },
];

function Navigation({ close }) {
  const logout = useAuthStore((state) => state.logout);
  return (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Основная навигация">
      {navigation.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:translate-x-0.5 hover:bg-slate-100 hover:text-slate-950'}`}
          end={end}
          key={to}
          onClick={close}
          to={to}
        >
          <Icon size={19} strokeWidth={1.8} />{label}
        </NavLink>
      ))}
      <NavLink className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 lg:hidden" onClick={close} to="/"><Home size={19} />О продукте</NavLink>
      <button className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-950" onClick={logout}>
        <LogOut size={19} strokeWidth={1.8} />Выйти
      </button>
    </nav>
  );
}

function MobileBottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-slate-200 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl lg:hidden" aria-label="Мобильная навигация">
      {navigation.map(({ to, shortLabel, icon: Icon, end }) => (
        <NavLink className={({ isActive }) => `flex min-h-13 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold transition ${isActive ? 'text-brand-700' : 'text-slate-400 active:bg-slate-100'}`} end={end} key={to} to={to}>
          {({ isActive }) => <><span className={`grid h-7 w-9 place-items-center rounded-full transition ${isActive ? 'bg-brand-50' : ''}`}><Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} /></span>{shortLabel}</>}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppShell() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const hydrateLectures = useLectureStore((state) => state.hydrate);
  const hasHydratedLectures = useLectureStore((state) => state.hasHydrated);

  useEffect(() => setIsOpen(false), [location.pathname]);
  useEffect(() => { hydrateLectures(); }, [hydrateLectures]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white p-5 lg:flex">
        <Brand />
        <div className="my-6 h-px bg-slate-100" />
        <Navigation />
        <div className="mt-5 rounded-xl bg-slate-50 px-3 py-3"><p className="truncate text-sm font-semibold text-slate-800">{user?.name}</p><p className="truncate text-xs text-slate-400">{user?.email}</p></div>
      </aside>

      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl lg:hidden">
        <Brand compact />
        <p className="absolute left-1/2 -translate-x-1/2 text-sm font-bold text-slate-900">Lectora</p>
        <button className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition active:scale-95 active:bg-slate-100" aria-label="Открыть меню" onClick={() => setIsOpen(true)}><Menu size={22} /></button>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Меню">
          <button className="animate-fade-in absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" aria-label="Закрыть меню" onClick={() => setIsOpen(false)} />
          <aside className="animate-slide-right relative flex h-[100dvh] w-[min(20rem,86vw)] flex-col bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between"><Brand /><button className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition active:scale-95 active:bg-slate-100" aria-label="Закрыть меню" onClick={() => setIsOpen(false)}><X size={22} /></button></div>
            <div className="my-6 h-px bg-slate-100" />
            <Navigation close={() => setIsOpen(false)} />
            <div className="mt-5 rounded-xl bg-slate-50 px-3 py-3"><p className="truncate text-sm font-semibold text-slate-800">{user?.name}</p><p className="truncate text-xs text-slate-400">{user?.email}</p></div>
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 sm:pt-9 lg:px-10 lg:pb-10">
          {hasHydratedLectures ? <div className="animate-page-in" key={location.pathname}><Outlet /></div> : <div className="grid min-h-64 place-items-center"><div className="h-9 w-9 animate-spin rounded-full border-3 border-slate-200 border-t-brand-600" aria-label="Загружаем материалы" /></div>}
        </div>
      </div>
      <MobileBottomNavigation />
    </div>
  );
}
