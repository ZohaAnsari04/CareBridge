'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Activity
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/assessment', label: 'Emergency', icon: AlertCircle, isEmergency: true },
    { href: '/hospitals', label: 'Hospitals', icon: MapPin },
    { href: '/emergency-summary', label: 'Summary', icon: FileText },
    { href: '/contacts', label: 'Contacts', icon: Users },
    { href: '/emergency-profile', label: 'Profile', icon: User },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="container navbar-inner">
        {/* Brand */}
        <Link href="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
          <div className="nav-logo-icon">
            <Heart size={20} fill="#ffffff" stroke="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#111827', fontWeight: 900, letterSpacing: '-0.02em', fontSize: '1.25rem' }}>CAREBRIDGE</span>
              <span style={{ fontSize: '0.65rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '1px 6px', borderRadius: '4px', fontWeight: 800, letterSpacing: '0.05em' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: 600, letterSpacing: '0.04em' }}>
              EMERGENCY HEALTHCARE ACCESS
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  color: isActive ? '#dc2626' : undefined,
                  fontWeight: isActive ? 700 : 500
                }}
              >
                <Icon size={16} color={isActive ? '#dc2626' : link.isEmergency ? '#dc2626' : '#6b7280'} />
                <span>{link.label}</span>
              </Link>
            );
          })}
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
            {navLinks.map((link) => {
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
        @media (max-width: 900px) {
          #mobile-menu-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
