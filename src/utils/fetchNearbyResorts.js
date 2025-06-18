// src/utils/fetchNearbyResorts.js
const fetchNearbyResorts = async (latitude, longitude) => {
    const query = `
      [out:json];
      (
        node["tourism"="hotel"](around:5000, ${latitude}, ${longitude});
        node["tourism"="resort"](around:5000, ${latitude}, ${longitude});
      );
      out;
    `;
  
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return data.elements.map((resort) => ({
      id: resort.id,
      name: resort.tags.name || "Unnamed Resort",
      lat: resort.lat,
      lng: resort.lon,
    }));
  };
  
  export default fetchNearbyResorts;  // ✅ Make sure it's exported
  