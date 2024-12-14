import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: async (email, password) => {
        // In a real app, this would be an API call
        if (email === 'admin@example.com' && password === 'admin') {
          set({
            token: 'fake-jwt-token',
            user: { id: 1, name: 'Admin', email, role: 'admin' }
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({ token: null, user: null });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);