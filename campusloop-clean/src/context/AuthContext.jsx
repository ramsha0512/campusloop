import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredUser, saveStoredUser } from '../utils/storage';
import { validateCollegeEmail } from '../utils/validation';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const toast = useToast();

  useEffect(() => {
    saveStoredUser(user);
  }, [user]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email, password) => {
    if (!email || !password) {
      toast.error("Please enter both email and password.", "Login Incomplete");
      return false;
    }

    const emailValidation = validateCollegeEmail(email);
    if (!emailValidation.isValid) {
      toast.warning(emailValidation.message, "College Verification");
      return false;
    }

    // Generate avatar initials from name or email
    const namePart = email.split('@')[0];
    const formattedName = namePart
      .split('.')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ') || "Student User";
    
    const initials = formattedName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const loggedUser = {
      id: user?.email === email ? user.id : `user-${Date.now()}`,
      name: email === 'ramsha@amity.edu' ? 'Ramsha Azra' : formattedName,
      email: email.toLowerCase(),
      academicYear: email === 'ramsha@amity.edu' ? 'Final Year' : '3rd Year B.Tech',
      college: 'Amity University',
      avatar: email === 'ramsha@amity.edu' ? 'RA' : initials,
      joined: 'October 2026'
    };

    setUser(loggedUser);
    setIsAuthModalOpen(false);
    toast.success(`Welcome back, ${loggedUser.name}!`, "Authentication Successful");
    return true;
  };

  const register = ({ name, email, academicYear, college, password, confirmPassword }) => {
    if (!name?.trim() || !email?.trim() || !academicYear || !password) {
      toast.error("Please complete all required registration fields.", "Registration Failed");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please verify your credentials.", "Validation Error");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.", "Security Notice");
      return false;
    }

    const emailCheck = validateCollegeEmail(email);
    if (!emailCheck.isValid) {
      toast.error(emailCheck.message, "College Email Required");
      return false;
    }

    const initials = name
      .trim()
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || "ST";

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      academicYear,
      college: college?.trim() || "Amity University",
      avatar: initials,
      joined: "Just now"
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    toast.success(`Student profile created for ${newUser.name}. Happy trading!`, "Account Created");
    return true;
  };

  const logout = () => {
    const currentName = user?.name || "Student";
    setUser(null);
    localStorage.removeItem('campusloop_user_v1');
    toast.info(`You have been logged out. See you soon, ${currentName}.`, "Logged Out");
  };

  const switchDemoUser = () => {
    const demoUser = {
      id: "user-demo-ramsha",
      name: "Ramsha Azra",
      email: "ramsha@amity.edu",
      academicYear: "Final Year",
      college: "Amity University",
      avatar: "RA",
      joined: "August 2023"
    };
    setUser(demoUser);
    toast.success("Switched to demo account: Ramsha Azra (Final Year · Amity University)", "Demo Profile Active");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        setAuthMode,
        login,
        register,
        logout,
        switchDemoUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
