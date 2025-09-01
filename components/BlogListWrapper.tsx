"use client";

import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';

interface BlogListWrapperProps {
  children: React.ReactNode;
}

export default function BlogListWrapper({ children }: BlogListWrapperProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [commandSequence, setCommandSequence] = useState('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Build command sequence
      const newSequence = commandSequence + e.key.toLowerCase();
      
      // Check for admin command: "admin123"
      if (newSequence.includes('admin123')) {
        setShowLogin(true);
        setCommandSequence('');
      } else if (newSequence.length > 10) {
        // Reset if sequence gets too long
        setCommandSequence('');
      } else {
        setCommandSequence(newSequence);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [commandSequence]);

  return (
    <>
      {children}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
    </>
  );
}
