const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = Array.isArray(payload.detail)
      ? payload.detail.map((item) => item.msg).join('. ')
      : payload.detail;
    throw new Error(detail || 'Не удалось выполнить запрос');
  }
  return payload;
}
