import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, Github, Twitter, Linkedin, Mail, Bitcoin, Copy } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Philosophy', path: '/philosophy' },
    { name: 'Solopreneurship', path: '/entrepreneurship' },
    { name: 'Projects', path: '/projects' },
    { name: 'Garden', path: '/garden' },
    { name: 'About', path: '/about' },
  ];

  const socialLinks = [
    { icon: <Github size={16} />, url: 'https://github.com/Angelguirao', label: 'GitHub' },
    { icon: <Twitter size={16} />, url: 'https://x.com/civicCogitation', label: 'Twitter' },
    { icon: <Linkedin size={16} />, url: 'https://www.linkedin.com/in/angelguirao/', label: 'LinkedIn' },
    { icon: <Mail size={16} />, url: 'mailto:angelguirao92@gmail.com', label: 'Email' },
  ];

  const bitcoinAddress = "bc1qyt377nm9z7u0zmgpudxgk8cps6qpzjl68xfauy";

  const copyBitcoinAddress = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    toast({
      title: "Bitcoin address copied",
      description: "The Bitcoin address has been copied to your clipboard",
    });
  };

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
          
          {/* Social Icons */}
          <div className="flex items-center space-x-3 border-l border-border pl-4 opacity-0 animate-fade-in">
            {socialLinks.map((link, i) => (
              <a 
                key={i}
                href={link.url}
                target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.icon}
              </a>
            ))}
            <button
              onClick={copyBitcoinAddress}
              aria-label="Copy Bitcoin address"
              title="Copy Bitcoin address"
              className="text-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
            >
              <Bitcoin size={16} />
            </button>
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

        {/* Mobile Social Icons */}
        <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-border">
          {socialLinks.map((link, i) => (
            <a 
              key={i}
              href={link.url}
              target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.icon}
            </a>
          ))}
          <button
            onClick={copyBitcoinAddress}
            aria-label="Copy Bitcoin address"
            title="Copy Bitcoin address"
            className="text-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <Bitcoin size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
