
import React from 'react';
import { Github, Twitter, Linkedin, Mail, Bitcoin, Copy } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const SocialLinks = ({ className = "" }) => {
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

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
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
  );
};

export default SocialLinks;
