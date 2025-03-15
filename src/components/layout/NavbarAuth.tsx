
import React, { useState, useEffect } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import supabase from '@/lib/garden/client';

const ADMIN_EMAIL = 'angelguirao92@gmail.com';

const NavbarAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!supabase) return;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();
    
    // Subscribe to auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
      });
      
      return () => subscription.unsubscribe();
    }
  }, []);

  const handleAdminLogin = async () => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured properly",
        variant: "destructive"
      });
      return;
    }

    // Show a simple signin modal with email/password
    const email = prompt('Enter your email:');
    if (!email) return;
    
    // Check if it's the admin email
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      toast({
        title: "Access Denied",
        description: "Only administrator can sign in",
        variant: "destructive"
      });
      return;
    }
    
    const password = prompt('Enter your password:');
    if (!password) return;
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Signed in successfully",
      });
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          aria-label="Sign Out"
          title="Sign Out"
          className="flex items-center gap-1 rounded-md bg-red-500/10 px-3 py-1.5 text-sm text-red-700 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      ) : (
        <button
          onClick={handleAdminLogin}
          aria-label="Admin Sign In"
          title="Admin Sign In"
          className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary hover:bg-primary/20 transition-colors"
        >
          <LogIn size={16} />
          <span className="hidden sm:inline">Admin</span>
        </button>
      )}
    </>
  );
};

export default NavbarAuth;
