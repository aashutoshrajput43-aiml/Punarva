"use client";

import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Utensils,
  Car,
  Truck,
  Building2,
  AlertTriangle,
  Navigation,
  ExternalLink,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";

// Fix Leaflet's missing icon assets in bundlers
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

export interface ListingItem {
  id: string;
  title: string;
  quantityKg: number;
  category: string;
  freshnessScore: number;
  status: string;
  isEmergency: boolean;
  lat: number;
  lng: number;
  address: string;
  pickupWindowStart?: string;
  pickupWindowEnd?: string;
  deliveryPin?: string;
  donor?: { name?: string; phone?: string; city?: string };
  matches?: any[];
  approxServings?: number;
  aiVerdict?: string;
  aiReasoning?: string;
}

export interface VolunteerItem {
  id: string;
  name: string;
  phone: string;
  lat: number;
  lng: number;
  vehicle: string;
  status: string;
}

export interface NgoItem {
  id: string;
  name: string;
  phone: string;
  lat: number;
  lng: number;
  capacity: number;
  city?: string;
  address?: string;
  locality?: string;
}

interface MapComponentProps {
  cityCoords: { lat: number; lng: number; zoom: number; name?: string };
  baseLayer: "street" | "satellite";
  listings: ListingItem[];
  filterStatus: string;
  searchQuery: string;
  measuringAoi?: boolean;
  userCoords?: { lat: number; lng: number } | null;
  onSelectListing: (listing: ListingItem) => void;
  onAoiMeasured?: (stats: { count: number; kg: number; areaKm2: number }) => void;
}

export default function MapComponent({
  cityCoords,
  baseLayer,
  listings,
  filterStatus,
  searchQuery,
  measuringAoi = false,
  userCoords,
  onSelectListing,
  onAoiMeasured,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const routeLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const userAccuracyCircleRef = useRef<L.Circle | null>(null);
  const aoiLayerRef = useRef<L.Circle | null>(null);

  // Active in-transit mission HUD state
  const [activeMission, setActiveMission] = useState<{
    courierName: string;
    destinationTitle: string;
    distKm: number;
    estMins: number;
  } | null>(null);

  // Simulated volunteers across hubs (naturally distributed along transport corridors)
  const [volunteers, setVolunteers] = useState<VolunteerItem[]>([
    { id: "v1", name: "Rahul Verma (Courier)", phone: "+91 97708 69581", lat: 22.7290, lng: 75.8750, vehicle: "Motorcycle", status: "IN_TRANSIT" },
    { id: "v2", name: "Simran Kaur", phone: "+91 97708 69581", lat: 22.7600, lng: 75.8820, vehicle: "Scooter", status: "AVAILABLE" },
    { id: "v3", name: "Karan Sharma", phone: "+91 97708 69581", lat: 22.7380, lng: 75.9010, vehicle: "Motorcycle", status: "AVAILABLE" },
    { id: "v4", name: "Amitabh Sen", phone: "+91 97708 69581", lat: 28.6180, lng: 77.2050, vehicle: "Van", status: "AVAILABLE" },
    { id: "v5", name: "Pooja Hegde", phone: "+91 97708 69581", lat: 19.0620, lng: 72.8680, vehicle: "Scooter", status: "IN_TRANSIT" },
    { id: "v6", name: "Venkatesh Rao", phone: "+91 97708 69581", lat: 12.9550, lng: 77.6350, vehicle: "Motorcycle", status: "AVAILABLE" },
  ]);

  // Seeded NGOs across hubs (Comprehensive network of Indore verified NGO shelters + regional nodes)
  const ngos: NgoItem[] = [
    // --- Indore Verified NGO Shelters & Food Banks ---
    { id: "ngo1", name: "Robin Hood Army - Palasia Chapter", phone: "+91 97708 69581", lat: 22.7244, lng: 75.8839, capacity: 500, city: "Indore", locality: "Old Palasia", address: "Near Saket Square, Old Palasia, Indore" },
    { id: "ngo2", name: "Indore Food Bank & Child Care", phone: "+91 97708 69581", lat: 22.7533, lng: 75.8937, capacity: 450, city: "Indore", locality: "Vijay Nagar", address: "Sector B, Scheme No 54, Vijay Nagar, Indore" },
    { id: "ngo3", name: "Aastha Vridh & Bal Seva Ashram", phone: "+91 97708 69581", lat: 22.6950, lng: 75.8340, capacity: 350, city: "Indore", locality: "Annapurna", address: "Annapurna Mandir Road, Indore" },
    { id: "ngo4", name: "Sanjeevani Bal Ashram Relief Shelter", phone: "+91 97708 69581", lat: 22.7196, lng: 75.8577, capacity: 380, city: "Indore", locality: "Rajwada", address: "Rajwada Chowk Area, Old Indore" },
    { id: "ngo5", name: "Akshaya Chaitanya Shelter Hub", phone: "+91 97708 69581", lat: 22.7665, lng: 75.8940, capacity: 650, city: "Indore", locality: "Scheme 78", address: "Scheme No 78, Part II, Vijay Nagar, Indore" },
    { id: "ngo6", name: "Samarpan Night Shelter & Kusht Rogi Seva", phone: "+91 97708 69581", lat: 22.6925, lng: 75.8672, capacity: 300, city: "Indore", locality: "Bhanwarkuan", address: "IT Park Main Road, Bhanwarkuan, Indore" },
    { id: "ngo7", name: "Apna Ghar Rain Basera", phone: "+91 97708 69581", lat: 22.7180, lng: 75.8720, capacity: 400, city: "Indore", locality: "Chhotigwaltoli", address: "Near Railway Station, Chhotigwaltoli, Indore" },
    { id: "ngo8", name: "Snehalaya Child Welfare & Shelter Home", phone: "+91 97708 69581", lat: 22.7120, lng: 75.9180, capacity: 320, city: "Indore", locality: "Bicholi Mardana", address: "Bicholi Mardana Bypass, Indore" },
    { id: "ngo9", name: "Matruchhaya Bal Kalyan Sansthan", phone: "+91 97708 69581", lat: 22.7010, lng: 75.8820, capacity: 350, city: "Indore", locality: "Navlakha", address: "Manoramaganj, Navlakha Square, Indore" },
    { id: "ngo10", name: "Seva Bharati Annakshetra", phone: "+91 97708 69581", lat: 22.6350, lng: 75.8050, capacity: 500, city: "Indore", locality: "Rau", address: "Rau - Pithampur Link Road, Indore" },
    { id: "ngo11", name: "Madhav Netra & Hunger Relief Shelter", phone: "+91 97708 69581", lat: 22.7050, lng: 75.8710, capacity: 280, city: "Indore", locality: "Sapna Sangeeta", address: "Sapna Sangeeta Road, Indore" },
    { id: "ngo12", name: "Prayas Social Welfare Night Shelter", phone: "+91 97708 69581", lat: 22.7420, lng: 75.8150, capacity: 320, city: "Indore", locality: "Super Corridor", address: "Super Corridor Crossing, Bada Bangarda, Indore" },
    // --- Regional Metro Hubs ---
    { id: "ngo13", name: "Delhi Roti Bank Foundation", phone: "+91 97708 69581", lat: 28.6180, lng: 77.2150, capacity: 600, city: "Delhi NCR", locality: "Connaught Place", address: "Near Shivaji Stadium, New Delhi" },
    { id: "ngo14", name: "Mumbai Dabbawala Relief Center", phone: "+91 97708 69581", lat: 19.0720, lng: 72.8720, capacity: 550, city: "Mumbai Central", locality: "Dadar", address: "Dadar West, Mumbai" },
    { id: "ngo15", name: "Bangalore Annapoorna Trust", phone: "+91 97708 69581", lat: 12.9680, lng: 77.5890, capacity: 450, city: "Bangalore Hub", locality: "Indiranagar", address: "100 Feet Road, Indiranagar, Bengaluru" },
    { id: "ngo16", name: "Pune Aahar Seva", phone: "+91 97708 69581", lat: 18.5250, lng: 73.8520, capacity: 350, city: "Pune City", locality: "Shivajinagar", address: "FC Road, Shivajinagar, Pune" },
    { id: "ngo17", name: "Bhopal Seva Sansthan", phone: "+91 97708 69581", lat: 23.2550, lng: 77.4080, capacity: 320, city: "Bhopal", locality: "MP Nagar", address: "Zone 1, MP Nagar, Bhopal" },
    { id: "ngo18", name: "Hyderabad Feed The Hungry", phone: "+91 97708 69581", lat: 17.3890, lng: 78.4820, capacity: 480, city: "Hyderabad", locality: "Abids", address: "Abids Circle, Hyderabad" },
  ];

  // Helper to get or create tile layer
  const applyTileLayer = (map: L.Map, layerType: "street" | "satellite") => {
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    let layer: L.TileLayer;
    if (layerType === "satellite") {
      layer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles © Esri & GIS Community",
          maxZoom: 19,
          subdomains: ["server", "services"],
        }
      );
    } else {
      layer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      });
    }

    layer.addTo(map);
    tileLayerRef.current = layer;
  };

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [cityCoords.lat, cityCoords.lng],
        zoom: cityCoords.zoom,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Add TileLayer immediately
      applyTileLayer(map, baseLayer);

      layerGroupRef.current = L.layerGroup().addTo(map);
      routeLayerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      // Handle AOI Click
      map.on("click", (e) => {
        if (!measuringAoi) return;
        const radius = 2500; // 2.5km radius
        if (aoiLayerRef.current) {
          map.removeLayer(aoiLayerRef.current);
        }
        const circle = L.circle(e.latlng, {
          radius,
          color: "#10b981",
          fillColor: "#10b981",
          fillOpacity: 0.2,
          weight: 2,
          dashArray: "6, 6",
        }).addTo(map);

        aoiLayerRef.current = circle;

        let insideCount = 0;
        let insideKg = 0;
        listings.forEach((item) => {
          const d = map.distance(e.latlng, [item.lat, item.lng]);
          if (d <= radius) {
            insideCount++;
            insideKg += item.quantityKg;
          }
        });

        const areaKm2 = Math.round(Math.PI * Math.pow(radius / 1000, 2) * 10) / 10;
        if (onAoiMeasured) {
          onAoiMeasured({ count: insideCount, kg: insideKg, areaKm2 });
        }
      });

      // Force size invalidation for sharp render
      setTimeout(() => map.invalidateSize(), 100);
      setTimeout(() => map.invalidateSize(), 400);
    }

    // ResizeObserver for reliable rendering in tabs / modals
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 2. Base Layer Switching (Street vs Satellite)
  useEffect(() => {
    if (mapInstanceRef.current) {
      applyTileLayer(mapInstanceRef.current, baseLayer);
    }
  }, [baseLayer]);

  // 3. Pan / Fly when city changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    // If userCoords was set and active city is My Location, effect 4 controls flyTo
    if (cityCoords.name === "My Location" && userCoords) {
      return;
    }
    map.flyTo([cityCoords.lat, cityCoords.lng], cityCoords.zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
    setTimeout(() => map.invalidateSize(), 300);
  }, [cityCoords.lat, cityCoords.lng, cityCoords.zoom, cityCoords.name]);

  // 4. User GPS location marker & precision radar halo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
    if (userAccuracyCircleRef.current) {
      map.removeLayer(userAccuracyCircleRef.current);
      userAccuracyCircleRef.current = null;
    }

    if (!userCoords) return;

    // Precision Accuracy Circle (120m radius)
    const accuracyCircle = L.circle([userCoords.lat, userCoords.lng], {
      radius: 120,
      color: "#2563eb",
      weight: 1.5,
      opacity: 0.8,
      fillColor: "#3b82f6",
      fillOpacity: 0.15,
      dashArray: "4, 6",
    }).addTo(map);
    userAccuracyCircleRef.current = accuracyCircle;

    const userIcon = L.divIcon({
      className: "user-gps-pill",
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="position: absolute; width: 42px; height: 42px; border-radius: 50%; background: rgba(37, 99, 235, 0.25); animation: gpsRadarPulse 2s infinite ease-out;"></div>
          <div style="position: absolute; width: 22px; height: 22px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 12px rgba(37, 99, 235, 0.75);"></div>
          <div style="position: relative; width: 14px; height: 14px; border-radius: 50%; background: #2563eb; border: 2.5px solid #ffffff;"></div>
          <div style="
            position: absolute;
            bottom: -18px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(6px);
            color: #93c5fd;
            border: 1px solid #3b82f6;
            font-size: 9px;
            font-weight: 800;
            padding: 1.5px 7px;
            border-radius: 12px;
            white-space: nowrap !important;
            box-shadow: 0 3px 8px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span style="display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #60a5fa; animation: pulse 1s infinite;"></span>
            Your Location
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });

    const marker = L.marker([userCoords.lat, userCoords.lng], {
      icon: userIcon,
      zIndexOffset: 2500,
    }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; color: #0f172a; min-width: 190px; padding: 4px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="font-size: 15px;">📍</span>
          <strong style="font-size: 13px; color: #1e40af;">Your Live GPS Telemetry</strong>
        </div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">
          Coordinates: <b>${userCoords.lat.toFixed(4)}° N, ${userCoords.lng.toFixed(4)}° E</b>
        </div>
        <div style="display: flex; align-items: center; gap: 4px; font-size: 10px; color: #059669; font-weight: 700; background: #ecfdf5; padding: 3px 8px; border-radius: 6px; border: 1px solid #a7f3d0;">
          ✓ GPS Signal Locked (Accuracy ±10m)
        </div>
      </div>
    `);

    userMarkerRef.current = marker;
    map.flyTo([userCoords.lat, userCoords.lng], 15, { duration: 1.2 });
  }, [userCoords]);

  // 5. Live volunteer movement simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setVolunteers((prev) =>
        prev.map((v) => {
          if (v.status === "IN_TRANSIT") {
            const jitterLat = (Math.random() - 0.5) * 0.0006;
            const jitterLng = (Math.random() - 0.5) * 0.0006;
            return {
              ...v,
              lat: v.lat + jitterLat,
              lng: v.lng + jitterLng,
            };
          }
          return v;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 6. Render Custom HTML Markers & Route Lines
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    const routeGroup = routeLayerGroupRef.current;
    if (!map || !layerGroup || !routeGroup) return;

    layerGroup.clearLayers();
    routeGroup.clearLayers();

    // Filter listings (if viewing NGO only, hide surplus listings to prioritize NGO network)
    const filtered = filterStatus === "NGO" ? [] : listings.filter((item) => {
      const matchStatus =
        filterStatus === "ALL" ||
        item.status === filterStatus ||
        (filterStatus === "VERIFIED" && item.freshnessScore >= 80);
      const matchQuery =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.donor?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchQuery;
    });

    // Helper to create sleek, uncluttered Food Pin
    const createFoodPin = (
      bgColor: string,
      borderColor: string,
      iconEmoji: string,
      weightKg: number,
      isEmergency = false
    ) => {
      return L.divIcon({
        className: "clean-food-pin",
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <div style="
              width: 32px;
              height: 32px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              background: ${bgColor};
              border: 2px solid ${borderColor};
              box-shadow: 0 4px 14px rgba(0,0,0,0.35);
              display: flex;
              align-items: center;
              justify-content: center;
              ${isEmergency ? "animation: emergencyPulse 1.8s infinite ease-in-out;" : ""}
            ">
              <span style="transform: rotate(45deg); font-size: 15px; line-height: 1;">
                ${iconEmoji}
              </span>
            </div>
            <div style="
              position: absolute;
              top: -6px;
              right: -12px;
              background: #0f172a;
              color: #34d399;
              font-size: 9px;
              font-weight: 800;
              padding: 1.5px 6px;
              border-radius: 8px;
              border: 1px solid ${borderColor};
              box-shadow: 0 2px 5px rgba(0,0,0,0.4);
              white-space: nowrap !important;
            ">
              ${weightKg}kg
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });
    };

    // Helper to create clean Courier / NGO badge
    const createEntityPin = (
      bgColor: string,
      borderColor: string,
      iconEmoji: string,
      roleTag: string,
      pulse = false
    ) => {
      return L.divIcon({
        className: "clean-entity-pin",
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <div style="
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: ${bgColor};
              border: 2px solid ${borderColor};
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              ${pulse ? "animation: emergencyPulse 2s infinite ease-in-out;" : ""}
            ">
              ${iconEmoji}
            </div>
            <div style="
              position: absolute;
              bottom: -7px;
              background: rgba(15, 23, 42, 0.95);
              color: #ffffff;
              font-size: 8px;
              font-weight: 800;
              padding: 0.5px 5px;
              border-radius: 6px;
              border: 1px solid ${borderColor};
              white-space: nowrap !important;
              letter-spacing: 0.2px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.4);
            ">
              ${roleTag}
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
    };

    // 6. Proximity separation engine to prevent ANY pins from overlapping
    const occupiedPositions: { lat: number; lng: number }[] = [];

    // Register user coordinates first so User GPS maintains priority anchor
    if (userCoords) {
      occupiedPositions.push({ lat: userCoords.lat, lng: userCoords.lng });
    }

    const getDeconflictedCoords = (rawLat: number, rawLng: number): [number, number] => {
      let lat = rawLat;
      let lng = rawLng;
      const minDistance = 0.006; // ~600m threshold in degrees

      let attempts = 0;
      while (attempts < 8) {
        const hasCollision = occupiedPositions.some(
          (pos) => Math.hypot(lat - pos.lat, lng - pos.lng) < minDistance
        );
        if (!hasCollision) break;

        attempts++;
        // Offset in a clean radial quadrant so pins sit neatly separated
        const angle = attempts * (Math.PI / 3); // 60-degree increments
        const radius = minDistance * (1 + 0.25 * Math.floor(attempts / 6));
        lat = rawLat + Math.sin(angle) * radius;
        lng = rawLng + Math.cos(angle) * radius;
      }

      occupiedPositions.push({ lat, lng });
      return [lat, lng];
    };

    // 6a. Add Food Listings Markers (With De-collision)
    filtered.forEach((item) => {
      const isEmergency = item.isEmergency || item.freshnessScore < 85;
      const isDelivered = item.status === "DELIVERED";
      const bgColor = isDelivered ? "#059669" : isEmergency ? "#dc2626" : "#059669";
      const borderColor = isDelivered ? "#6ee7b7" : isEmergency ? "#fca5a5" : "#34d399";
      const emoji = isDelivered ? "✅" : isEmergency ? "⚠️" : "🍲";

      const [cLat, cLng] = getDeconflictedCoords(item.lat, item.lng);
      const marker = L.marker([cLat, cLng], {
        icon: createFoodPin(bgColor, borderColor, emoji, item.quantityKg, isEmergency),
      });

      marker.on("click", () => {
        onSelectListing(item);
      });

      // Bind clean modern popup card
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; color: #0f172a; min-width: 200px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 6px; background: ${isDelivered ? '#ecfdf5' : isEmergency ? '#fef2f2' : '#f0fdf4'}; color: ${isDelivered ? '#047857' : isEmergency ? '#b91c1c' : '#047857'}; border: 1px solid ${borderColor};">
              ${isDelivered ? 'DELIVERED' : isEmergency ? 'URGENT RESCUE' : 'READY TO PICK'}
            </span>
            <span style="font-size: 11px; font-weight: 800; color: #047857;">
              🛡️ ${item.freshnessScore}%
            </span>
          </div>
          <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 3px; line-height: 1.3;">
            ${item.title}
          </div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 4px;">
            📦 <b>${item.quantityKg} kg</b> (~${item.approxServings || item.quantityKg * 3} servings)
          </div>
          <div style="font-size: 10px; color: #64748b; margin-bottom: 8px; line-height: 1.3;">
            📍 ${item.address}
          </div>
          <a href="/track/${item.id}" style="display: block; text-align: center; background: #059669; color: #ffffff; padding: 6px 10px; border-radius: 8px; font-weight: 700; font-size: 11px; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            Inspect Live Mission →
          </a>
        </div>
      `);

      layerGroup.addLayer(marker);
    });

    // 6b. Add Volunteer Courier Markers (Filtered when not strictly DELIVERED)
    if (filterStatus !== "DELIVERED") {
      volunteers.forEach((v) => {
        const isTransit = v.status === "IN_TRANSIT";
        const vIcon = createEntityPin(
          isTransit ? "#d97706" : "#2563eb",
          isTransit ? "#fde68a" : "#93c5fd",
          "🛵",
          isTransit ? "Courier" : "Volunteer",
          isTransit
        );
        const [vLat, vLng] = getDeconflictedCoords(v.lat, v.lng);
        const marker = L.marker([vLat, vLng], { icon: vIcon });
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; color: #0f172a; min-width: 180px; padding: 2px;">
            <div style="font-weight: 800; font-size: 13px; color: #1e3a8a; margin-bottom: 2px;">
              ${v.name}
            </div>
            <div style="font-size: 11px; color: #475569; margin-bottom: 4px;">
              Vehicle: <b>${v.vehicle}</b> • Status: <strong style="color: ${isTransit ? '#d97706' : '#2563eb'}">${v.status}</strong>
            </div>
            <a href="tel:+919770869581" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; color: #047857; font-weight: 700; text-decoration: none;">
              📞 Call: +91 97708 69581
            </a>
          </div>
        `);
        layerGroup.addLayer(marker);
      });
    }

    // 6c. Add Verified NGO Shelter Markers
    const ngosToDisplay = ngos.filter((ngo) => {
      if (filterStatus === "NGO") {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          ngo.name.toLowerCase().includes(q) ||
          (ngo.city || "").toLowerCase().includes(q) ||
          (ngo.locality || "").toLowerCase().includes(q) ||
          (ngo.address || "").toLowerCase().includes(q)
        );
      }
      return filterStatus !== "DELIVERED";
    });

    ngosToDisplay.forEach((ngo) => {
      const isIndoreNgo = ngo.city === "Indore";
      const isFilterNgoActive = filterStatus === "NGO";
      const ngoIcon = createEntityPin(
        isFilterNgoActive ? "#9333ea" : "#7c3aed",
        isFilterNgoActive ? "#f5d0fe" : "#c4b5fd",
        "🏛️",
        "NGO",
        isFilterNgoActive
      );
      const [nLat, nLng] = getDeconflictedCoords(ngo.lat, ngo.lng);
      const marker = L.marker([nLat, nLng], { icon: ngoIcon });
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; color: #0f172a; min-width: 220px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
            <span style="font-size: 10px; font-weight: 800; background: #f3e8ff; color: #7c3aed; border: 1px solid #d8b4fe; padding: 2px 7px; border-radius: 9999px;">
              🏛️ ${isIndoreNgo ? "INDORE NGO SHELTER" : "VERIFIED SHELTER"}
            </span>
            <span style="font-size: 10px; font-weight: 700; color: #059669;">● ACTIVE</span>
          </div>
          <div style="font-weight: 800; font-size: 13px; color: #1e1b4b; margin-bottom: 3px; line-height: 1.3;">
            ${ngo.name}
          </div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 3px;">
            🍲 Feeding Capacity: <b>${ngo.capacity} kg/day</b> (~${ngo.capacity * 3} meals)
          </div>
          <div style="font-size: 10px; color: #64748b; margin-bottom: 8px; line-height: 1.3;">
            📍 ${ngo.address || (ngo.locality ? `${ngo.locality}, ${ngo.city}` : ngo.city || "Indore")}
          </div>
          <div style="display: flex; gap: 6px;">
            <a href="tel:${ngo.phone}" style="flex: 1; text-align: center; background: #7c3aed; color: #ffffff; padding: 6px 8px; border-radius: 8px; font-weight: 700; font-size: 11px; text-decoration: none;">
              📞 Call Shelter
            </a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${ngo.lat},${ngo.lng}" target="_blank" rel="noreferrer" style="flex: 1; text-align: center; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 6px 8px; border-radius: 8px; font-weight: 700; font-size: 11px; text-decoration: none;">
              🗺️ Directions
            </a>
          </div>
        </div>
      `);
      layerGroup.addLayer(marker);
    });

    // 6d. Draw Real-Time Telemetry Route Line
    const inTransitListing = filtered.find((l) => l.status === "IN_TRANSIT");
    const activeVol = volunteers.find((v) => v.status === "IN_TRANSIT");

    if (inTransitListing && activeVol) {
      // Calculate realistic distance in km
      const dLat = inTransitListing.lat - activeVol.lat;
      const dLng = inTransitListing.lng - activeVol.lng;
      const distKm = Math.max(0.6, Math.round(Math.sqrt(dLat * dLat + dLng * dLng) * 111 * 10) / 10);
      const estMins = Math.max(4, Math.round(distKm * 3.2));

      // Calculate midpoint and subtle route arc
      const midLat = (activeVol.lat + inTransitListing.lat) / 2;
      const midLng = (activeVol.lng + inTransitListing.lng) / 2;
      const arcOffset = 0.002;

      const routePoints: [number, number][] = [
        [activeVol.lat, activeVol.lng],
        [midLat + arcOffset, midLng - arcOffset],
        [inTransitListing.lat, inTransitListing.lng],
      ];

      const polyline = L.polyline(routePoints, {
        color: "#06b6d4",
        weight: 3.5,
        dashArray: "8, 8",
        opacity: 0.85,
      });

      routeGroup.addLayer(polyline);

      // Set state for clean floating HUD banner (eliminates messy on-map marker)
      setActiveMission({
        courierName: activeVol.name,
        destinationTitle: inTransitListing.title,
        distKm,
        estMins,
      });
    } else {
      setActiveMission(null);
    }
  }, [listings, filterStatus, searchQuery, volunteers]);

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] bg-slate-900 overflow-hidden rounded-2xl">
      <div ref={mapContainerRef} className="w-full h-full min-h-[500px] lg:min-h-[600px]" />

      {/* Floating Executive Mission HUD - Completely unclutters map pins */}
      {activeMission && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] max-w-[94%] sm:max-w-md w-full bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-xl border border-cyan-500/40 shadow-2xl rounded-2xl p-2.5 sm:px-4 sm:py-2.5 text-white flex items-center justify-between gap-3 pointer-events-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-sm flex-shrink-0">
              🛵
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping flex-shrink-0"></span>
                <span>ACTIVE COURIER EN ROUTE</span>
              </div>
              <div className="text-xs font-bold text-slate-100 truncate">
                {activeMission.courierName} → {activeMission.destinationTitle}
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs font-black text-amber-400 font-mono">
              ~{activeMission.estMins} mins
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {activeMission.distKm} km remaining
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
