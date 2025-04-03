
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  name: string;
  email: string;
  grade: number;
  avatar: string | null;
  bio?: string;
  phone?: string;
  address?: string;
  role: "student" | "teacher" | "headmaster";  // Added role field
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (user: Omit<User, 'avatar'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
};

// Static credentials for demo purposes - now includes role information
const STATIC_CREDENTIALS = [
  { 
    email: "student@example.com", 
    password: "password123", 
    name: "Student User",
    grade: 8,
    avatar: null,
    role: "student" 
  },
  { 
    email: "teacher@example.com", 
    password: "teacher123", 
    name: "Teacher User",
    grade: 10,
    avatar: null,
    role: "teacher" 
  },
  {
    email: "headmaster@example.com",
    password: "headmaster123",
    name: "Headmaster User",
    grade: 12,
    avatar: null,
    role: "headmaster"
  }
];

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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check against static credentials
        const foundUser = STATIC_CREDENTIALS.find(
          (cred) => cred.email === email && cred.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          resolve();
        } else {
          reject(new Error("Invalid email or password"));
        }
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
          // Default role for new signups is student
          role: userWithoutPassword.role || "student" as const
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
