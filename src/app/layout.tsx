import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyDisclaimer from '@/components/layout/EmergencyDisclaimer';
import DemoScenarioBar from '@/components/layout/DemoScenarioBar';

export const metadata: Metadata = {
  title: 'CareBridge | AI Emergency & Healthcare Access System',
  description: 'When every second matters, CareBridge coordinates AI-assisted symptom assessment, nearby emergency hospital discovery, structured patient summaries, and family notifications.',
  keywords: ['Emergency Healthcare', 'AI Triage', 'Hospital Discovery', 'Emergency Coordination', 'Patient Summary'],
  authors: [{ name: 'CareBridge Team' }]
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
      </head>
      <body>
        <EmergencyDisclaimer />
        <DemoScenarioBar />
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
