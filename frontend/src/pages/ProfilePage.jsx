import { CheckCircle2, KeyRound, UserRound } from 'lucide-react';
import Card from '../shared/ui/Card';
import PageHeader from '../shared/ui/PageHeader';
import useAuthStore from '../store/authStore';
import useLectureStore from '../store/lectureStore';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const lectures = useLectureStore((state) => state.lectures);
  const completed = lectures.filter((item) => item.status === 'completed').length;

  return (
    <div>
      <PageHeader eyebrow="Аккаунт" title="Профиль" description="Основная информация и статистика вашей подготовки." />
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700"><UserRound size={26} /></div><div><h2 className="text-xl font-bold text-slate-950">{user?.name}</h2><p className="text-sm text-slate-500">{user?.email}</p></div></div>
          <div className="mt-7 border-t border-slate-100 pt-6"><p className="flex items-center gap-2 text-sm font-semibold text-slate-800"><KeyRound size={17} />Безопасность</p><p className="mt-2 text-sm leading-6 text-slate-500">Пароль хранится только в виде защищённого хеша. Управление паролем подключим к backend позднее.</p></div>
        </Card>
        <Card className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-slate-500">Готовых лекций</p><p className="mt-2 text-4xl font-bold text-slate-950">{completed}</p>
          <div className="mt-5 flex items-center gap-2 text-sm text-emerald-700"><CheckCircle2 size={17} />Аккаунт активен</div>
        </Card>
      </div>
    </div>
  );
}
