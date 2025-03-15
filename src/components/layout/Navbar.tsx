
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import NavbarAuth from './NavbarAuth';
import SocialLinks from './SocialLinks';
import supabase from '@/lib/garden/client';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Self', path: '/about' },
    { name: 'Theory', path: '/garden' },
    { name: 'Action', path: '/projects' },
    { name: 'Tools', path: '/tools' },
    { name: 'Constraints', path: '/constraints' },
    { name: 'Connect', path: '/connect' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!supabase) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
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
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" : "py-5 bg-transparent"
    )}>
      <div className="container-wide flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-semibold">
          <span className="opacity-0 animate-fade-in">Angel Guirao</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="flex items-center space-x-6 mr-6">
            {navItems.map((item, index) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-primary opacity-0 animate-fade-in",
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground",
                  `animation-delay-${(index + 1) * 100}`
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop - Right Side: Admin Auth and Social Links */}
          <div className="flex items-center space-x-4 opacity-0 animate-fade-in">
            <NavbarAuth />
            <div className="border-l border-border pl-4">
              <SocialLinks />
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="flex md:hidden p-2 opacity-0 animate-fade-in"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 flex flex-col pt-20 px-6 transition-transform duration-300 ease-in-out transform md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col space-y-6 mt-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "text-lg font-medium transition-colors",
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Admin Button */}
        <div className="mt-8 pt-6 border-t border-border">
          <NavbarAuth />
        </div>

        {/* Mobile Social Icons */}
        <div className="mt-8 pt-6 border-t border-border">
          <SocialLinks />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
