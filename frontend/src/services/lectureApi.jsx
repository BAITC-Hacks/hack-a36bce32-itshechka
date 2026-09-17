import { apiRequest } from './apiClient';
import { demoMaterials } from '../mocks/demoData';

export const useMockApi = process.env.REACT_APP_USE_MOCK_API !== 'false';
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function requestMaterials(lecture) {
  if (!useMockApi) {
    return apiRequest(`/lectures/${lecture.id}/process`, {
      method: 'POST',
      body: JSON.stringify({ title: lecture.title, text: lecture.text }),
    });
  }

  await delay(1600);
  return demoMaterials;
}

export async function fetchLectures() {
  if (useMockApi) return null;
  return apiRequest('/lectures');
}

export async function deleteLecture(lectureId) {
  if (useMockApi) return;
  await apiRequest(`/lectures/${lectureId}`, { method: 'DELETE' });
}

export async function fetchProgress(lectureId) {
  if (useMockApi) return null;
  return apiRequest(`/lectures/${lectureId}/progress`);
}

export async function saveProgress(lectureId, progress) {
  if (useMockApi) return progress;
  return apiRequest(`/lectures/${lectureId}/progress`, {
    method: 'PUT',
    body: JSON.stringify(progress),
  });
}
