import React, { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative"
         style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80")' }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-white" />
              <h1 className="text-xl font-bold text-white">Messangeme</h1>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className={`
            fixed inset-0 z-20 bg-black/50 lg:hidden transition-opacity duration-300
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `} onClick={() => setIsMobileMenuOpen(false)} />
          {children}
        </main>
      </div>
    </div>
  );
};