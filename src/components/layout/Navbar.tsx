'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Heart, 
  MapPin, 
  FileText, 
  Users, 
  User, 
  LayoutDashboard, 
  AlertCircle,
  Menu,
  X,
  Home
} from 'lucide-react';
import { LimelightNav, NavItem } from '@/components/ui/limelight-nav';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getActiveIndex = () => {
    if (pathname === '/') return 0;
    if (pathname.startsWith('/assessment')) return 1;
    if (pathname.startsWith('/hospitals')) return 2;
    if (pathname.startsWith('/emergency-summary')) return 3;
    if (pathname.startsWith('/contacts')) return 4;
    if (pathname.startsWith('/emergency-profile')) return 5;
    if (pathname.startsWith('/dashboard')) return 6;
    return 0;
  };

  const limelightItems: NavItem[] = [
    {
      id: 'nav-home',
      icon: <Home size={19} />,
      label: 'Home',
      onClick: () => router.push('/'),
    },
    {
      id: 'nav-emergency',
      icon: <AlertCircle size={19} />,
      label: 'Emergency Assessment',
      onClick: () => router.push('/assessment'),
    },
    {
      id: 'nav-hospitals',
      icon: <MapPin size={19} />,
      label: 'Nearby Care & Hospitals',
      onClick: () => router.push('/hospitals'),
    },
    {
      id: 'nav-summary',
      icon: <FileText size={19} />,
      label: 'Clinical Emergency Summary',
      onClick: () => router.push('/emergency-summary'),
    },
    {
      id: 'nav-contacts',
      icon: <Users size={19} />,
      label: 'Emergency Contacts',
      onClick: () => router.push('/contacts'),
    },
    {
      id: 'nav-profile',
      icon: <User size={19} />,
      label: 'Emergency Profile',
      onClick: () => router.push('/emergency-profile'),
    },
    {
      id: 'nav-dashboard',
      icon: <LayoutDashboard size={19} />,
      label: 'Readiness Dashboard',
      onClick: () => router.push('/dashboard'),
    },
  ];

  const mobileNavLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/assessment', label: 'Emergency Assessment', icon: AlertCircle, isEmergency: true },
    { href: '/hospitals', label: 'Hospitals & Care', icon: MapPin },
    { href: '/emergency-summary', label: 'Emergency Summary', icon: FileText },
    { href: '/contacts', label: 'Emergency Contacts', icon: Users },
    { href: '/emergency-profile', label: 'Emergency Profile', icon: User },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="container navbar-inner">
        {/* Brand with Official Logo */}
        <Link href="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <img 
            src="/carebridge-logo.png" 
            alt="CareBridge AI Emergency Healthcare" 
            style={{ height: '48px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} 
          />
          <span style={{ fontSize: '0.62rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '1px 6px', borderRadius: '4px', fontWeight: 800, letterSpacing: '0.05em' }}>
            AI EMERGENCY
          </span>
        </Link>

        {/* Desktop Limelight Navigation */}
        <div className="nav-limelight-wrapper">
          <LimelightNav
            items={limelightItems}
            activeIndex={getActiveIndex()}
            className="h-12 bg-white border border-slate-200 rounded-full shadow-sm px-1.5"
            iconContainerClassName="px-3.5 py-1.5"
            iconClassName="text-slate-700 hover:text-red-600 transition-colors"
          />
        </div>

        {/* Action Button */}
        <div className="nav-actions">
          <Link href="/assessment" className="btn btn-emergency btn-sm" id="nav-emergency-cta">
            <AlertCircle size={16} />
            <span>🚨 START ASSESSMENT</span>
          </Link>

          {/* Mobile hamburger */}
          <button 
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ display: 'none' }}
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} color="#111827" /> : <Menu size={20} color="#111827" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mobileNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', color: '#111827', fontSize: '1rem', fontWeight: 600 }}
                >
                  <Icon size={18} color="#dc2626" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '0.5rem', color: '#6b7280', fontSize: '0.9rem' }}
            >
              About & Hackathon Architecture
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-limelight-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 990px) {
          .nav-limelight-wrapper {
            display: none !important;
          }
          #mobile-menu-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
