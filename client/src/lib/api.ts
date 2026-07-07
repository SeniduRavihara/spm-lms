const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function request(path: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...options.headers as Record<string, string> };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    signup: (email: string, password: string, name: string, role: string) =>
      request('/auth/signup', { method: 'POST', body: JSON.stringify({ email, password, name, role }) }),
    me: () => request('/auth/me'),
    updateProfile: (data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }) =>
      request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),
  },
  courses: {
    list: () => request('/courses'),
    get: (id: string) => request(`/courses/${id}`),
    create: (title: string, description: string) =>
      request('/courses', { method: 'POST', body: JSON.stringify({ title, description }) }),
    update: (id: string, data: { title?: string; description?: string }) =>
      request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/courses/${id}`, { method: 'DELETE' }),
  },
  lessons: {
    create: (courseId: string, title: string) =>
      request('/lessons', { method: 'POST', body: JSON.stringify({ courseId, title }) }),
    update: (id: string, title: string) =>
      request(`/lessons/${id}`, { method: 'PUT', body: JSON.stringify({ title }) }),
    delete: (id: string) => request(`/lessons/${id}`, { method: 'DELETE' }),
  },
  progress: {
    getAll: () => request('/progress'),
    get: (courseId: string) => request(`/progress/${courseId}`),
    toggle: (lessonId: string, courseId: string) =>
      request('/progress/toggle', { method: 'POST', body: JSON.stringify({ lessonId, courseId }) }),
  },
};
