import { ArrowLeft, FileText } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, Outlet, useParams } from 'react-router-dom';
import Badge from '../../../shared/ui/Badge';
import useLectureStore from '../../../store/lectureStore';
import MaterialTabs from './MaterialTabs';
import SourceTextDialog from './SourceTextDialog';

export default function MaterialLayout() {
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const { lectureId } = useParams();
  const lecture = useLectureStore((state) => state.lectures.find((item) => item.id === lectureId));
  const materials = useLectureStore((state) => state.materials[lectureId]);

  if (!lecture) return <Navigate to="/history" replace />;
  if (lecture.status !== 'completed' || !materials) return <Navigate to={`/lectures/${lectureId}/processing`} replace />;

  return (
    <div>
      <Link className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950" to="/history"><ArrowLeft size={16} />Все материалы</Link>
      <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div><div className="flex flex-wrap items-center gap-2"><Badge tone="success">Готово</Badge><span className="text-xs text-slate-400">{lecture.wordCount} слов</span></div><h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{lecture.title}</h1></div>
        <button className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50" onClick={() => setIsSourceOpen(true)}><FileText size={17} />Исходный текст</button>
      </div>
      <div className="mt-7"><MaterialTabs /></div>
      <div className="mt-5"><Outlet context={{ lecture, materials }} /></div>
      <SourceTextDialog isOpen={isSourceOpen} onClose={() => setIsSourceOpen(false)} text={lecture.text} title={lecture.title} />
    </div>
  );
}
