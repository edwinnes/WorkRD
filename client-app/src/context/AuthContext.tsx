import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  user: { name: string; phone: string } | null;
  isAuthenticated: boolean;
  login: (name: string, phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  const login = (name: string, phone: string) => {
    setUser({ name, phone });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
