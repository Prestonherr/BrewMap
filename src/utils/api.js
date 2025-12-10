/**
 * Geocodes a city name to get latitude and longitude coordinates
 * @param {string} city - The city name to geocode
 * @returns {Promise<{lat: number, lon: number, displayName: string}>}
 */
export async function geocodeCity(city) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        city
      )}`,
      {
        headers: {
          "User-Agent": "BrewMap/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    const result = data[0];
    return {
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      displayName: result.display_name,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

/**
 * Converts miles to meters for Overpass API
 * @param {number} miles - Distance in miles
 * @returns {number} Distance in meters
 */
function milesToMeters(miles) {
  return miles * 1609.34;
}

/**
 * Finds coffee shops near a location using Overpass API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} radiusMiles - Search radius in miles
 * @returns {Promise<Array>} Array of coffee shop objects
 */
export async function findCoffeeShops(lat, lon, radiusMiles) {
  const radiusMeters = milesToMeters(radiusMiles);

  const query = `
[out:json][timeout:25];
(
  node
    (around:${radiusMeters},${lat},${lon})
    [shop=coffee];
  node
    (around:${radiusMeters},${lat},${lon})
    [amenity=cafe];
  way
    (around:${radiusMeters},${lat},${lon})
    [shop=coffee];
  way
    (around:${radiusMeters},${lat},${lon})
    [amenity=cafe];
);
out center;
`;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error(`Overpass API failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.elements || data.elements.length === 0) {
      return [];
    }

    // Process and format the results
    const coffeeShops = data.elements
      .map((element) => {
        const tags = element.tags || {};
        const centerLat = element.lat || (element.center && element.center.lat);
        const centerLon = element.lon || (element.center && element.center.lon);

        if (!centerLat || !centerLon) {
          return null;
        }

        // Calculate distance
        const distance = calculateDistance(lat, lon, centerLat, centerLon);

        return {
          id: element.id,
          name: tags.name || "Unnamed Coffee Shop",
          address: buildAddress(tags),
          lat: centerLat,
          lon: centerLon,
          distance: distance,
          tags: buildTags(tags),
        };
      })
      .filter((shop) => shop !== null)
      .sort((a, b) => a.distance - b.distance);

    return coffeeShops;
  } catch (error) {
    console.error("Coffee shop search error:", error);
    throw error;
  }
}

/**
 * Calculates distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in miles
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Builds an address string from OSM tags
 * @param {Object} tags - OSM tags object
 * @returns {string} Formatted address
 */
function buildAddress(tags) {
  const parts = [];
  if (tags["addr:housenumber"] && tags["addr:street"]) {
    parts.push(`${tags["addr:housenumber"]} ${tags["addr:street"]}`);
  } else if (tags["addr:street"]) {
    parts.push(tags["addr:street"]);
  }
  if (tags["addr:city"]) {
    parts.push(tags["addr:city"]);
  } else if (tags["addr:town"]) {
    parts.push(tags["addr:town"]);
  }
  if (tags["addr:state"]) {
    parts.push(tags["addr:state"]);
  }
  if (tags["addr:postcode"]) {
    parts.push(tags["addr:postcode"]);
  }
  return parts.length > 0 ? parts.join(", ") : null;
}

/**
 * Builds an array of relevant tags
 * @param {Object} tags - OSM tags object
 * @returns {Array<string>} Array of tag strings
 */
function buildTags(tags) {
  const relevantTags = [];
  if (tags.cuisine) relevantTags.push(tags.cuisine);
  if (tags.brand) relevantTags.push(tags.brand);
  if (tags["internet_access"] === "yes") relevantTags.push("WiFi");
  if (tags.outdoor_seating === "yes") relevantTags.push("Outdoor Seating");
  return relevantTags;
}
