import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import MaterialLayout from '../features/materials/components/MaterialLayout';
import AppShell from '../shared/layout/AppShell';
import FlashcardsPage from '../pages/FlashcardsPage';
import HistoryPage from '../pages/HistoryPage';
import HomePage from '../pages/HomePage';
import KeyPointsPage from '../pages/KeyPointsPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProcessingPage from '../pages/ProcessingPage';
import ProfilePage from '../pages/ProfilePage';
import QuizPage from '../pages/QuizPage';
import RegisterPage from '../pages/RegisterPage';
import SummaryPage from '../pages/SummaryPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lectures/:lectureId/processing" element={<ProcessingPage />} />
          <Route path="/lectures/:lectureId" element={<MaterialLayout />}>
            <Route index element={<SummaryPage />} />
            <Route path="key-points" element={<KeyPointsPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="flashcards" element={<FlashcardsPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
