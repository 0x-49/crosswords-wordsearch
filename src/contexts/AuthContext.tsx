import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

// Simplified User interface to prevent runtime errors
interface SimpleUser {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: SimpleUser | null;
  createUser: (user: SimpleUser) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  initializing: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  createUser: async () => {},
  signIn: async () => {},
  signUp: async () => {},
  signInWithMagicLink: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  initializing: false
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [initializing, setInitializing] = useState(false); // Set to false to prevent blocking

  // Simplified initialization that won't block page loads
  React.useEffect(() => {
    // For now, just set initializing to false to unblock pages
    // TODO: Implement proper Supabase integration after fixing runtime issues
    setInitializing(false);
  }, []);

  const createUser = async (user: SimpleUser) => {
    try {
      // Simplified user creation - just log for now
      console.log('Creating user:', user);
      // TODO: Implement proper Supabase user creation after fixing runtime issues
    } catch (error) {
      console.error('Failed to create user profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Simplified sign in - just log for now
      console.log('Signing in:', email);
      // TODO: Implement proper Supabase authentication after fixing runtime issues
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Simplified sign up - just log for now
      console.log('Signing up:', email);
      // TODO: Implement proper Supabase authentication after fixing runtime issues
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      // Simplified magic link - just log for now
      console.log('Magic link for:', email);
      // TODO: Implement proper magic link after fixing runtime issues
    } catch (error) {
      console.error('Magic link failed:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Simplified Google sign in - just log for now
      console.log('Google sign in requested');
      // TODO: Implement proper Google OAuth after fixing runtime issues
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Simplified sign out - just clear user state
      setUser(null);
      console.log('User signed out');
      router.push('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Simplified password reset - just log for now
      console.log('Password reset requested for:', email);
      // TODO: Implement proper password reset after fixing runtime issues
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      createUser,
      signIn,
      signUp,
      signInWithMagicLink,
      signInWithGoogle,
      signOut,
      resetPassword,
      initializing,

    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);