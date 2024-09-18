// src/utils/geocodeAddress.js

// Define the geocodeAddress function
const geocodeAddress = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching geocode: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    } else {
      throw new Error('Address not found');
    }
  } catch (error) {
    console.error(`Geocoding error: ${error.message}`);
    throw error;
  }
};

// Explicitly export the function as a named export
export { geocodeAddress };
