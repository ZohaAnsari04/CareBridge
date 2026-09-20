'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Hospital } from '@/lib/ai/types';
import { MapPin, Navigation, Building2, Phone, Clock } from 'lucide-react';

interface Props {
  hospitals: Hospital[];
  selectedHospitalId: string | null;
  onSelectHospital: (hospital: Hospital) => void;
}

export default function InteractiveHospitalMap({
  hospitals,
  selectedHospitalId,
  onSelectHospital
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // User coordinates (Center of Metro District)
  const userLat = 37.7749;
  const userLng = -122.4194;

  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      try {
        const L = (await import('leaflet')).default;

        if (!isMounted || !mapContainerRef.current) return;

        // User Marker Icon (Dark charcoal with red dot)
        const userIcon = L.divIcon({
          className: 'custom-user-marker',
          html: `<div style="width:22px;height:22px;border-radius:50%;background:#111827;border:3px solid #ffffff;box-shadow:0 0 10px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:6px;height:6px;border-radius:50%;background:#dc2626;"></div></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        // Initialize Map
        const map = L.map(mapContainerRef.current, {
          center: [userLat, userLng],
          zoom: 13,
          zoomControl: true,
          attributionControl: false
        });

        // OpenStreetMap clean light tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        // Add User Marker
        const userMarker = L.marker([userLat, userLng], { icon: userIcon }).addTo(map);
        userMarker.bindPopup('<b style="color:#111827;">📍 Your Location</b><br/><span style="color:#6b7280;font-size:12px;">Metro Health District</span>');

        // Add Hospital Markers (Red markers with white border)
        hospitals.forEach((h) => {
          const isSelected = h.id === selectedHospitalId;
          const markerColor = '#dc2626';

          const icon = L.divIcon({
            className: 'custom-hosp-marker',
            html: `
              <div style="background:${isSelected ? '#b91c1c' : markerColor};color:#fff;width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 8px rgba(220,38,38,0.35);border:2px solid #ffffff;cursor:pointer;">
                🏥
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          const marker = L.marker([h.coordinates.lat, h.coordinates.lng], { icon }).addTo(map);
          marker.on('click', () => {
            onSelectHospital(h);
          });
          marker.bindPopup(`
            <div style="font-family:-apple-system,sans-serif;padding:2px;">
              <strong style="font-size:13px;color:#111827;">${h.name}</strong><br/>
              <span style="font-size:12px;color:#dc2626;font-weight:700;">${h.distanceKm} km • ~${h.travelMinutes} mins</span><br/>
              <span style="font-size:11px;color:#4b5563;">${h.traumaLevel || '24/7 Emergency'}</span>
            </div>
          `);

          markersRef.current[h.id] = marker;
        });

        mapInstanceRef.current = map;
        setMapLoaded(true);
      } catch (err) {
        console.warn('Leaflet fallback:', err);
        setMapError(true);
      }
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [hospitals]);

  // Pan to selected hospital when updated
  useEffect(() => {
    if (selectedHospitalId && mapInstanceRef.current) {
      const target = hospitals.find(h => h.id === selectedHospitalId);
      if (target) {
        mapInstanceRef.current.setView([target.coordinates.lat, target.coordinates.lng], 14, { animate: true });
        const marker = markersRef.current[target.id];
        if (marker) {
          marker.openPopup();
        }
      }
    }
  }, [selectedHospitalId, hospitals]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '440px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#f8fafc' }}>
      {/* Map Element */}
      <div 
        ref={mapContainerRef} 
        style={{ width: '100%', height: '100%', minHeight: '440px', zIndex: 1 }} 
        aria-label="Interactive Hospital Map"
      />

      {/* Fallback View */}
      {mapError && (
        <div style={{ position: 'absolute', inset: 0, background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', zIndex: 10 }}>
          <Navigation size={36} color="#dc2626" style={{ marginBottom: '1rem' }} />
          <h4 style={{ color: '#111827', fontSize: '1.1rem', fontWeight: 800 }}>Emergency Proximity View</h4>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', maxWidth: '380px', marginTop: '0.4rem' }}>
            Interactive facility grid showing {hospitals.length} nearby verified facilities. Selecting facilities updates routing coordinates.
          </p>
        </div>
      )}

      {/* Floating Legend Overlay */}
      <div style={{ position: 'absolute', bottom: '12px', left: '12px', zIndex: 10, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(6px)', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '8px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#111827', fontWeight: 600 }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626', display: 'inline-block' }} />
          <span>Emergency Facilities</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#111827', fontWeight: 600 }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111827', display: 'inline-block' }} />
          <span>You</span>
        </div>
      </div>
    </div>
  );
}
