/**
 * Get the user's current position
 * @returns {Promise<GeolocationPosition>} - Geolocation position
 */
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    // Get current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

/**
 * Calculate the distance between two coordinates in kilometers
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} - Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  
  return distance;
};

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} - Radians
 */
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

/**
 * Format coordinates as a string
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {string} - Formatted coordinates
 */
export const formatCoordinates = (latitude, longitude) => {
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const lonDirection = longitude >= 0 ? 'E' : 'W';
  
  const latDegrees = Math.abs(latitude);
  const lonDegrees = Math.abs(longitude);
  
  return `${latDegrees.toFixed(6)}° ${latDirection}, ${lonDegrees.toFixed(6)}° ${lonDirection}`;
};

/**
 * Get a location's address from coordinates using reverse geocoding
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise<Object>} - Address data
 */
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    // In a real app, you would use a geocoding API like Google Maps or Mapbox
    // For demo purposes, we'll return a hardcoded address
    return {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      postalCode: '94105',
      formattedAddress: '123 Main St, San Francisco, CA 94105, USA',
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};
