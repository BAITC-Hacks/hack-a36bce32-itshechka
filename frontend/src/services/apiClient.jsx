const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

function savedToken() {
  try {
    return JSON.parse(localStorage.getItem('hackalem-auth'))?.state?.token || null;
  } catch {
    return null;
  }
}

export async function apiRequest(path, options = {}) {
  const token = savedToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && !path.startsWith('/auth/login')) {
      localStorage.removeItem('hackalem-auth');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    const detail = Array.isArray(payload.detail)
      ? payload.detail.map((item) => item.msg).join('. ')
      : payload.detail;
    throw new Error(detail || 'Не удалось выполнить запрос');
  }
  return payload;
}
