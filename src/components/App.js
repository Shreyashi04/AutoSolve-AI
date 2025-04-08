import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import ProblemSolver from './ProblemSolver';
import History from './History';
import Settings from './Settings';
import About from './About';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-classic-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Autosolve</h1>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-6">
              <li>
                <NavLink 
                  to="/" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/solve" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                >
                  Solve
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/history" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                >
                  History
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/settings" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-2">
            <ul className="flex flex-col space-y-4">
              <li>
                <NavLink 
                  to="/" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                  onClick={() => setMobileMenuOpen(false)}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/solve" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solve
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/history" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  History
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/settings" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({isActive}) => isActive ? "text-emerald" : "text-white hover:text-emerald transition-colors"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-grow container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solve" element={<ProblemSolver />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="bg-classic-black text-white p-4 text-center">
        <div className="container mx-auto">
          <p className="text-sm">© {new Date().getFullYear()} Autosolve. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
