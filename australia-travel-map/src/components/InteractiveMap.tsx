import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Timeline from './Timeline';
import InfoPanel from './InfoPanel';
import LocationDetails from './LocationDetails';

interface ItineraryData {
  hotels: any[];
  brisbane_attractions: any[];
  gold_coast_attractions: any[];
  daily_itinerary: any[];
}

interface RouteData {
  route_brisbane_to_gold_coast: any;
  brisbane_to_movie_world: any;
  travel_tips: any;
  emergency_contacts: any;
}

const InteractiveMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [routeRenderer, setRouteRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState<boolean>(false);

  // Google Maps API Key
  const API_KEY = 'AIzaSyCO0kKndUNlmQi3B5mxy4dblg_8WYcuKuk';

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [itineraryResponse, routeResponse] = await Promise.all([
          fetch('/data/itinerary_locations.json'),
          fetch('/data/travel_routes.json')
        ]);
        
        const itinerary = await itineraryResponse.json();
        const routes = await routeResponse.json();
        
        setItineraryData(itinerary);
        setRouteData(routes);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || !itineraryData) return;

      const loader = new Loader({
        apiKey: API_KEY,
        version: 'weekly',
        libraries: ['geometry', 'drawing']
      });

      try {
        await loader.load();

        // Create map centered on Queensland
        const mapInstance = new google.maps.Map(mapRef.current, {
          zoom: 9,
          center: { lat: -27.8, lng: 153.2 }, // Between Brisbane and Gold Coast
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#0077be' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }]
            }
          ]
        });

        setMap(mapInstance);

        // Create directions renderer for routes
        const directionsRenderer = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: '#FF6B6B',
            strokeWeight: 4,
            strokeOpacity: 0.8
          }
        });
        directionsRenderer.setMap(mapInstance);
        setRouteRenderer(directionsRenderer);

      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [itineraryData]);

  // Create markers for all locations
  useEffect(() => {
    if (!map || !itineraryData) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: google.maps.Marker[] = [];
    const bounds = new google.maps.LatLngBounds();

    // Add hotel markers
    itineraryData.hotels.forEach(hotel => {
      const marker = new google.maps.Marker({
        position: hotel.coordinates,
        map: map,
        title: hotel.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="#4F46E5" stroke="white" stroke-width="2"/>
              <text x="16" y="20" font-family="Arial" font-size="16" fill="white" text-anchor="middle">🏨</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
      });

      marker.addListener('click', () => {
        setSelectedLocation({ ...hotel, type: 'hotel' });
      });

      newMarkers.push(marker);
      bounds.extend(hotel.coordinates);
    });

    // Add attraction markers
    const allAttractions = [...itineraryData.brisbane_attractions, ...itineraryData.gold_coast_attractions];
    allAttractions.forEach(attraction => {
      const getIcon = (type: string) => {
        const iconMap: { [key: string]: string } = {
          'attraction': '🎨',
          'education': '🎓',
          'shopping': '🛍️',
          'theme_park': '🎢',
          'food': '🍽️',
          'activity': '🚣'
        };
        return iconMap[type] || '📍';
      };

      const getColor = (type: string) => {
        const colorMap: { [key: string]: string } = {
          'attraction': '#10B981',
          'education': '#F59E0B',
          'shopping': '#EF4444',
          'theme_park': '#8B5CF6',
          'food': '#F97316',
          'activity': '#06B6D4'
        };
        return colorMap[type] || '#6B7280';
      };

      const marker = new google.maps.Marker({
        position: attraction.coordinates,
        map: map,
        title: attraction.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="${getColor(attraction.type)}" stroke="white" stroke-width="2"/>
              <text x="16" y="20" font-family="Arial" font-size="12" fill="white" text-anchor="middle">${getIcon(attraction.type)}</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
      });

      marker.addListener('click', () => {
        setSelectedLocation({ ...attraction, type: 'attraction' });
      });

      newMarkers.push(marker);
      bounds.extend(attraction.coordinates);
    });

    setMarkers(newMarkers);

    // Fit map to show all markers
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }
  }, [map, itineraryData]);

  // Handle day selection
  const handleDaySelect = (dayNumber: number) => {
    setSelectedDay(dayNumber);
    
    if (!itineraryData || !map) return;

    const dayItinerary = itineraryData.daily_itinerary.find(day => day.day === dayNumber);
    if (!dayItinerary || !dayItinerary.locations) return;

    // Focus on locations for the selected day
    const bounds = new google.maps.LatLngBounds();
    const allLocations = [...itineraryData.brisbane_attractions, ...itineraryData.gold_coast_attractions, ...itineraryData.hotels];
    
    dayItinerary.locations.forEach((locationId: string) => {
      const location = allLocations.find(loc => loc.id === locationId);
      if (location) {
        bounds.extend(location.coordinates);
      }
    });

    // Also include hotel for the day
    if (dayItinerary.hotel) {
      const hotel = itineraryData.hotels.find(h => h.id === dayItinerary.hotel);
      if (hotel) {
        bounds.extend(hotel.coordinates);
      }
    }

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }
  };

  // Toggle route display
  const toggleRoutes = () => {
    if (!routeRenderer) return;
    
    setShowRoutes(!showRoutes);
    
    if (!showRoutes && routeData) {
      // Show Brisbane to Gold Coast route
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: routeData.route_brisbane_to_gold_coast.origin,
          destination: routeData.route_brisbane_to_gold_coast.destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === 'OK') {
            routeRenderer.setDirections(result);
          }
        }
      );
    } else {
      routeRenderer.setDirections({ routes: [] } as google.maps.DirectionsResult);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Timeline Sidebar */}
      <div className="lg:w-1/3 xl:w-1/4 bg-white shadow-xl z-10 overflow-y-auto">
        <Timeline
          itineraryData={itineraryData}
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
        />
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="w-full h-full" />
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 space-y-2">
          <button
            onClick={toggleRoutes}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showRoutes
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showRoutes ? '隱藏路線' : '顯示路線'}
          </button>
          
          <button
            onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
            className="block px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            實用資訊
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-bold text-lg mb-3 text-gray-800">圖例說明</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🏨</span>
              <span>住宿酒店</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">🎨</span>
              <span>景點</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">🎓</span>
              <span>教育機構</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">🛍️</span>
              <span>購物場所</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">🎢</span>
              <span>主題樂園</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">🍽️</span>
              <span>美食地點</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Details Modal */}
      {selectedLocation && (
        <LocationDetails
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}

      {/* Info Panel */}
      {isInfoPanelOpen && (
        <InfoPanel
          routeData={routeData}
          onClose={() => setIsInfoPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default InteractiveMap;