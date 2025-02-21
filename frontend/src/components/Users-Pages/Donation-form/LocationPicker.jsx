
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, LocateFixed } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zaG5pZGhvbGFyaXlhIiwiYSI6ImNtNnQycWZjcDA0YXoyanI2bDF3MHNnaDkifQ.9cUvLA0nr0fhL-UTWzGOVw';

const LocationPicker = ({ onLocationSelect }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937], 
      zoom: 4
    });

    marker.current = new mapboxgl.Marker({ color: '#61cf73' })
      .setLngLat([78.9629, 20.5937])
      .addTo(map.current);

    map.current.on('click', handleMapClick);
  }, []);

  const handleMapClick = async (e) => {
    const { lng, lat } = e.lngLat;
    updateLocation(lng, lat);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        updateLocation(lng, lat);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation(longitude, latitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to fetch location. Please enable GPS.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const updateLocation = async (lng, lat) => {
    marker.current.setLngLat([lng, lat]).addTo(map.current);
    map.current.flyTo({ center: [lng, lat], zoom: 14 });
  
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
  
      console.log("Reverse Geocoding API Response:", data); 
      if (data.features && data.features.length > 0) {
        const place = data.features[0]; 
        let city = null;
        let state = null;
        let country = null;
  
        if (place.context) {
          place.context.forEach((item) => {
            if (item.id.startsWith("place.")) {
              city = item.text;
            } else if (item.id.startsWith("region.")) {
              state = item.text; 
            } else if (item.id.startsWith("country.")) {
              country = item.text; 
            }
          });
        }
  
        const locationData = {
          address: place.place_name || "Unknown Address",
          city: city || "Unknown City",
          state: state || "Unknown State",
          country: country || "Unknown Country",
          lng,
          lat,
        };
  
        console.log("Extracted Location Data:", locationData); 
        setSelectedLocation(locationData);
        onLocationSelect(locationData);
      } else {
        console.error("No location data found for coordinates.");
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };
  
  
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
  
        map.current.flyTo({
          center: [longitude, latitude],
          zoom: 14
        });
  
        marker.current.setLngLat([longitude, latitude]).addTo(map.current);
  
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
          );
          const data = await response.json();
  
          if (data.features && data.features.length > 0) {
            const locationData = {
              address: data.features[0].place_name,
              lng: longitude,
              lat: latitude
            };
            setSelectedLocation(locationData);
            onLocationSelect(locationData);
          }
        } catch (error) {
          console.error('Error reverse geocoding:', error);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location.");
      }
    );
  };
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="mb-4 relative">
          <div className="flex items-center border rounded-md">
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for a location..."
              className="w-full p-2 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end mb-2">
          <button 
            onClick={handleGetCurrentLocation} 
            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <LocateFixed className="w-5 h-5" />
            Use Current Location
          </button>
        </div>

        <div 
          ref={mapContainer}
          className="w-full h-64 rounded-md overflow-hidden"
        />

        {selectedLocation && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-[#61cf73] mt-1" />
              <div>
                <h4 className="font-medium text-sm">Selected Location</h4>
                <p className="text-sm text-gray-600">{selectedLocation.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;
