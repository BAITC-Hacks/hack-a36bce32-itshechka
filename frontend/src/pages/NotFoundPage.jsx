import { Link } from 'react-router-dom';
import Button from '../shared/ui/Button';

export default function NotFoundPage() {
  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center"><div className="animate-fade-up"><p className="text-sm font-semibold text-brand-700">404</p><h1 className="mt-2 text-4xl font-bold text-slate-950">Страница не найдена</h1><p className="mt-3 text-slate-500">Возможно, ссылка устарела или была введена с ошибкой.</p><Button as={Link} className="mt-7" to="/">На главную</Button></div></main>;
}
