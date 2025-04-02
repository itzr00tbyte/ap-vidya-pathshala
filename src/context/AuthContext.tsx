
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  name: string;
  email: string;
  grade: number;
  avatar: string | null;
  bio?: string;
  phone?: string;
  address?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (user: Omit<User, 'avatar'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    const userData = localStorage.getItem("user");
    
    if (auth && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // This is a mock login - in a real app, this would call your API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, accept any email/password
        const mockUser = {
          name: "Student User",
          email: email,
          grade: 8,
          avatar: null,
        };
        
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
        resolve();
      }, 1000);
    });
  };

  const signup = async (userData: Omit<User, 'avatar'> & { password: string }): Promise<void> => {
    // This is a mock signup - in a real app, this would call your API
    return new Promise((resolve) => {
      setTimeout(() => {
        const { password, ...userWithoutPassword } = userData;
        const newUser = {
          ...userWithoutPassword,
          avatar: null,
        };
        
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(newUser));
        
        setUser(newUser);
        setIsAuthenticated(true);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
