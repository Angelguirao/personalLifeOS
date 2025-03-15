
import React from 'react';
import { LogIn } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import supabase from '@/lib/garden/client';

const ADMIN_EMAIL = 'angelguirao92@gmail.com';

const NavbarAuth = () => {
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

  return (
    <button
      onClick={handleAdminLogin}
      aria-label="Admin Sign In"
      title="Admin Sign In"
      className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary hover:bg-primary/20 transition-colors"
    >
      <LogIn size={16} />
      <span className="hidden sm:inline">Admin</span>
    </button>
  );
};

export default NavbarAuth;
