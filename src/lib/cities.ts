export interface CityTab {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
  icon?: string;
  state?: string;
}

export const CITIES_LIST: CityTab[] = [
  { name: "Indore (HQ)", lat: 22.7196, lng: 75.8577, zoom: 13, icon: "📍", state: "Madhya Pradesh" },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126, zoom: 12, icon: "🏛️", state: "Madhya Pradesh" },
  { name: "Delhi NCR", lat: 28.6139, lng: 77.2090, zoom: 11, icon: "🏛️", state: "Delhi" },
  { name: "Mumbai Central", lat: 19.0760, lng: 72.8777, zoom: 12, icon: "🏙️", state: "Maharashtra" },
  { name: "Pune City", lat: 18.5204, lng: 73.8567, zoom: 12, icon: "📍", state: "Maharashtra" },
  { name: "Bangalore Hub", lat: 12.9716, lng: 77.5946, zoom: 12, icon: "🚀", state: "Karnataka" },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867, zoom: 12, icon: "🕌", state: "Telangana" },
  { name: "Chennai", lat: 13.0827, lng: 80.2707, zoom: 12, icon: "🌊", state: "Tamil Nadu" },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, zoom: 12, icon: "🌉", state: "West Bengal" },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, zoom: 12, icon: "🏭", state: "Gujarat" },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, zoom: 12, icon: "🏰", state: "Rajasthan" },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462, zoom: 12, icon: "🍲", state: "Uttar Pradesh" },
  { name: "Chandigarh", lat: 30.7333, lng: 76.7794, zoom: 12, icon: "🌳", state: "Punjab/HR" },
  { name: "Surat", lat: 21.1702, lng: 72.8311, zoom: 12, icon: "💎", state: "Gujarat" },
  { name: "Patna", lat: 25.5941, lng: 85.1376, zoom: 12, icon: "🌾", state: "Bihar" },
  { name: "National Overview", lat: 22.5, lng: 79.5, zoom: 5, icon: "🇮🇳", state: "All India" },
];
