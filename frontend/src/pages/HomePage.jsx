import { Clock3, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LectureInputForm from '../features/lecture/components/LectureInputForm';
import PageHeader from '../shared/ui/PageHeader';
import useLectureStore from '../store/lectureStore';

const benefits = [
  { icon: Clock3, title: 'Экономит время', text: 'Все материалы создаются за один запуск.' },
  { icon: ShieldCheck, title: 'Только по лекции', text: 'Ответы привязаны к исходным фрагментам.' },
  { icon: Sparkles, title: 'Готово к повторению', text: 'От чтения сразу переходите к практике.' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const addLecture = useLectureStore((state) => state.addLecture);
  const submit = (payload) => {
    const lecture = addLecture(payload);
    navigate(`/lectures/${lecture.id}/processing`);
  };

  return (
    <div>
      <PageHeader eyebrow="Новая лекция" title="Подготовьтесь к занятию без лишней рутины" description="Добавьте текст — мы соберём конспект, тезисы, проверочный тест и карточки для повторения." />
      <div className="mt-8"><LectureInputForm onSubmit={submit} /></div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4" key={title}><div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700"><Icon size={18} /></div><div><p className="text-sm font-bold text-slate-800">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div></div>
        ))}
      </div>
    </div>
  );
}
