import React, { createContext, useState, useEffect, useContext } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, role: string, avatar?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const API_BASE_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedToken = localStorage.getItem('edusphere_token');
      const storedUser = localStorage.getItem('edusphere_user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Verify token is still valid with backend
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data);
            localStorage.setItem('edusphere_user', JSON.stringify(data));
          } else {
            // Token expired or invalid
            logout();
          }
        } catch (error) {
          console.error('Failed to verify session', error);
          logout();
        }
      }
      setLoading(false);
    };

    loadStoredAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('edusphere_token', data.token);
      localStorage.setItem('edusphere_user', JSON.stringify(data.user));
      return { success: true };
    } catch (error: any) {
      return { success: false, message: 'Network error occurred. Make sure backend is running.' };
    }
  };

  const register = async (name: string, email: string, password: string, role: string, avatar?: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, avatar })
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || 'Registration failed' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('edusphere_token', data.token);
      localStorage.setItem('edusphere_user', JSON.stringify(data.user));
      return { success: true };
    } catch (error: any) {
      return { success: false, message: 'Network error occurred. Make sure backend is running.' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('edusphere_token');
    localStorage.removeItem('edusphere_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
