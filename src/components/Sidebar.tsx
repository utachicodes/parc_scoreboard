'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/public', label: 'Scoreboard' },
  { href: '/admin', label: 'Admin' },
  { href: '/tech/scoring', label: 'Tech Scoring' },
  { href: '/stars/scoring', label: 'Stars Scoring' },
  { href: '/games', label: 'Games' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button - minimal, high-tech */}
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="fixed top-4 left-4 z-[100] flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-white border border-gray-200 shadow-md text-orange-500 hover:bg-gray-100 focus:outline-none transition"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`block h-0.5 w-7 bg-orange-500 transition-transform duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`}/>
        <span className={`block h-0.5 w-7 bg-orange-500 my-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`}/>
        <span className={`block h-0.5 w-7 bg-orange-500 transition-transform duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`}/>
      </button>

      {/* Overlay - only when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - minimal, high-tech, zoom animation */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 flex flex-col items-center pt-12 gap-8 shadow-xl transition-transform duration-300 ${open ? 'scale-100 translate-x-0 opacity-100' : 'scale-90 -translate-x-80 opacity-0'} origin-left`}
        style={{ boxShadow: open ? '0 8px 32px 0 #0002' : 'none' }}
        aria-hidden={!open}
      >
        <img src="/parc-just_logo.png" alt="PARC Logo" className="h-14 w-auto mb-2 object-contain" />
        <nav className="flex flex-col gap-2 w-full px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-semibold text-gray-900 border-l-4 border-transparent hover:border-orange-500 hover:bg-gray-100 px-4 py-3 rounded transition-colors text-left tracking-wide"
              style={{ color: '#ff8800' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
} 