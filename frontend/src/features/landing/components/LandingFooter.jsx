import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Brand from '../../../shared/ui/Brand';
import Button from '../../../shared/ui/Button';
import useAuthStore from '../../../store/authStore';

export default function LandingFooter() {
  const token = useAuthStore((state) => state.token);
  return (
    <footer className="bg-slate-950 px-4 pb-8 pt-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-16 md:flex-row md:items-end">
          <div><p className="text-sm font-semibold text-brand-500">Можно начинать</p><h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">Превратите следующую лекцию в готовый план подготовки</h2></div>
          <Button as={Link} className="whitespace-nowrap" size="lg" to={token ? '/app' : '/register'}>{token ? 'Открыть пространство' : 'Создать аккаунт'}<ArrowRight size={18} /></Button>
        </div>
        <div className="flex flex-col justify-between gap-5 pt-8 sm:flex-row sm:items-center"><Brand inverse /><div className="text-xs text-slate-500 sm:text-right"><p>HackAlem AI · Учебный веб-прототип</p><p className="mt-1">Made by <span className="font-semibold text-slate-300">ITshechka</span></p></div></div>
      </div>
    </footer>
  );
}
