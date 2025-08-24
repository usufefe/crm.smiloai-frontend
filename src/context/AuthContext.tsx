import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('crm_token');
    const savedUser = localStorage.getItem('crm_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('crm_token');
        localStorage.removeItem('crm_user');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      // Temporary mock login for testing
      if (email === 'test@crm.com' && password === 'test123') {
        const mockUser = {
          _id: '123',
          name: 'Test Satış Temsilcisi',
          email: 'test@crm.com',
          role: 'sales-representative',
          tenantId: '6855a4bed102a469d3598524'
        };
        const mockToken = 'mock-jwt-token';
        
        setToken(mockToken);
        setUser(mockUser);
        localStorage.setItem('crm_token', mockToken);
        localStorage.setItem('crm_user', JSON.stringify(mockUser));
        return;
      }

      // API call to backend
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      // Check if user has sales role (temporarily disabled for testing)
      // if (!['sales-representative', 'sales-manager'].includes(data.user.role)) {
      //   throw new Error('Bu portal sadece satış ekibi üyeleri için erişilebilir.');
      // }

      // Save to state and localStorage
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('crm_token', data.token);
      localStorage.setItem('crm_user', JSON.stringify(data.user));

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    
    // Redirect to login
    window.location.href = '/login';
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
