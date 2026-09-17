import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiRequest } from '../services/apiClient';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,
      async authenticate(mode, credentials) {
        set({ isLoading: true, error: null });
        try {
          const result = await apiRequest(`/auth/${mode}`, {
            method: 'POST',
            body: JSON.stringify(credentials),
          });
          set({ token: result.token, user: result.user, isLoading: false });
          return true;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return false;
        }
      },
      logout() {
        set({ token: null, user: null, error: null });
      },
      clearError() {
        set({ error: null });
      },
    }),
    { name: 'hackalem-auth', partialize: ({ token, user }) => ({ token, user }) },
  ),
);

export default useAuthStore;
