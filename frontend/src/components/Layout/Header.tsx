import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full z-[9999]">
      <header className="bg-white/30 backdrop-blur-md border-b border-white/20 shadow-lg flex justify-center">
        <div className="container max-w-5xl px-4">
          <nav className="h-24 flex items-center justify-center">
            <Link to="/">
              <img
                src="/images/logo_small.png"
                alt="Gymondo Logo"
                className="h-10 w-auto"
              />
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header; 