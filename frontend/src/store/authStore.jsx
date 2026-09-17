import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiRequest } from '../services/apiClient';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isInitialized: false,
      isLoading: false,
      error: null,
      async authenticate(mode, credentials) {
        set({ isLoading: true, error: null });
        try {
          const result = await apiRequest(`/auth/${mode}`, {
            method: 'POST',
            body: JSON.stringify(credentials),
          });
          set({ token: result.token, user: result.user, isLoading: false, isInitialized: true });
          return true;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return false;
        }
      },
      logout() {
        set({ token: null, user: null, error: null, isInitialized: true });
        window.dispatchEvent(new Event('session:cleared'));
      },
      async verifySession() {
        const token = useAuthStore.getState().token;
        if (!token) {
          set({ isInitialized: true });
          return;
        }
        try {
          const result = await apiRequest('/auth/me');
          set({ user: result.user, isInitialized: true });
        } catch {
          set({ token: null, user: null, isInitialized: true });
        }
      },
      clearError() {
        set({ error: null });
      },
    }),
    { name: 'hackalem-auth', partialize: ({ token, user }) => ({ token, user }) },
  ),
);

export default useAuthStore;
