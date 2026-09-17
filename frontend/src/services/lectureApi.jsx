import { apiRequest } from './apiClient';
import { demoMaterials } from '../mocks/demoData';

const useMockApi = process.env.REACT_APP_USE_MOCK_API !== 'false';
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function requestMaterials(lecture) {
  if (!useMockApi) {
    return apiRequest(`/lectures/${lecture.id}/process`, { method: 'POST' });
  }

  await delay(1600);
  return demoMaterials;
}
