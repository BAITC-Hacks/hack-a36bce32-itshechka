import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LectureListItem from '../features/history/components/LectureListItem';
import Button from '../shared/ui/Button';
import Card from '../shared/ui/Card';
import ConfirmDialog from '../shared/ui/ConfirmDialog';
import EmptyState from '../shared/ui/EmptyState';
import PageHeader from '../shared/ui/PageHeader';
import useLectureStore from '../store/lectureStore';

export default function HistoryPage() {
  const [lectureToDelete, setLectureToDelete] = useState(null);
  const lectures = useLectureStore((state) => state.lectures);
  const removeLecture = useLectureStore((state) => state.removeLecture);

  return (
    <div>
      <PageHeader
        eyebrow="Библиотека"
        title="Мои материалы"
        description="Все обработанные лекции и наборы для повторения в одном месте."
        action={<Button as={Link} to="/app"><Plus size={17} />Новая лекция</Button>}
      />
      <div className="mt-8">
        {lectures.length === 0 ? (
          <EmptyState title="Материалов пока нет" description="Добавьте первую лекцию — здесь появятся конспект, тест и карточки." action={<Button as={Link} to="/app">Добавить лекцию</Button>} />
        ) : (
          <Card>{lectures.map((lecture) => <LectureListItem key={lecture.id} lecture={lecture} onDelete={setLectureToDelete} />)}</Card>
        )}
      </div>
      <ConfirmDialog
        description="Конспект, тест и карточки этой лекции будут удалены с устройства. Это действие нельзя отменить."
        isOpen={Boolean(lectureToDelete)}
        onCancel={() => setLectureToDelete(null)}
        onConfirm={() => { removeLecture(lectureToDelete); setLectureToDelete(null); }}
        title="Удалить материалы?"
      />
    </div>
  );
}
