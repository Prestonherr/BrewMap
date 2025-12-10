import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import CoffeeShopList from "../CoffeeShopList/CoffeeShopList";
import { geocodeCity, findCoffeeShops } from "../../utils/api";
import "./Home.css";

function Home() {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchCity, setLastSearchCity] = useState(null);

  const handleSearch = async (city, radius) => {
    setIsLoading(true);
    setError(null);
    setCoffeeShops([]);
    setLastSearchCity(city);

    try {
      // First, geocode the city to get coordinates
      const location = await geocodeCity(city);

      // Then, find coffee shops near that location
      const shops = await findCoffeeShops(location.lat, location.lon, radius);

      setCoffeeShops(shops);
    } catch (err) {
      setError(
        err.message || "Failed to search for coffee shops. Please try again."
      );
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="home">
      <SearchForm onSearch={handleSearch} />
      {lastSearchCity && (
        <div className="home__results-header">
          <div className="home__results-container">
            <p className="home__results-text">
              Results for: <strong>{lastSearchCity}</strong>
            </p>
          </div>
        </div>
      )}
      <CoffeeShopList
        coffeeShops={coffeeShops}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}

export default Home;
