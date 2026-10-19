import React, { useState } from 'react';
import { Camera, Plus, Menu, X, ArrowUpRight, ShieldCheck, Database, Layers } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Photo Search', path: '/' },
    { name: 'Event Galleries', path: '/Gallery' },
    { name: 'Architecture', path: '/About' },
    { name: 'FAQ', path: '/FAQ' },
    { name: 'Contact', path: '/Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07090e]/85 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo - Apollo Style */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">
                Event<span className="text-amber-400">Snap</span>
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700/60">
                PRO
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-white/[0.08] font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>API Ready</span>
            </div>

            <NavLink
              to="/Upload"
              className="btn-apollo-primary flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs tracking-wide uppercase transition"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Host Event</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <NavLink
              to="/Upload"
              className="btn-apollo-primary px-3 py-1.5 rounded-md text-xs"
            >
              Host
            </NavLink>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d14] border-b border-white/10 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'text-amber-400 bg-white/5 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2">
            <NavLink
              to="/Upload"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-apollo-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Host an Event & Upload
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;