import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import LectureListItem from '../features/history/components/LectureListItem';
import Button from '../shared/ui/Button';
import Card from '../shared/ui/Card';
import EmptyState from '../shared/ui/EmptyState';
import PageHeader from '../shared/ui/PageHeader';
import useLectureStore from '../store/lectureStore';

export default function HistoryPage() {
  const lectures = useLectureStore((state) => state.lectures);
  const removeLecture = useLectureStore((state) => state.removeLecture);

  return (
    <div>
      <PageHeader
        eyebrow="Библиотека"
        title="Мои материалы"
        description="Все обработанные лекции и наборы для повторения в одном месте."
        action={<Link to="/"><Button><Plus size={17} />Новая лекция</Button></Link>}
      />
      <div className="mt-8">
        {lectures.length === 0 ? (
          <EmptyState title="Материалов пока нет" description="Добавьте первую лекцию — здесь появятся конспект, тест и карточки." action={<Link to="/"><Button>Добавить лекцию</Button></Link>} />
        ) : (
          <Card>{lectures.map((lecture) => <LectureListItem key={lecture.id} lecture={lecture} onDelete={removeLecture} />)}</Card>
        )}
      </div>
    </div>
  );
}
