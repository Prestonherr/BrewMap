import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim(), radius);
    }
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <h2 className="search-form__title">Find Coffee Shops Near You</h2>
        <p className="search-form__subtitle">
          Enter a city name to discover local coffee shops
        </p>
        <form className="search-form__form" onSubmit={handleSubmit}>
          <div className="search-form__input-group">
            <label htmlFor="city" className="search-form__label">
              City
            </label>
            <input
              id="city"
              type="text"
              className="search-form__input"
              placeholder="e.g., Denver, New York, San Francisco..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="search-form__input-group">
            <label htmlFor="radius" className="search-form__label">
              Search Radius (miles)
            </label>
            <select
              id="radius"
              className="search-form__select"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            >
              <option value={1}>1 mile</option>
              <option value={3}>3 miles</option>
              <option value={5}>5 miles</option>
              <option value={10}>10 miles</option>
              <option value={15}>15 miles</option>
              <option value={25}>25 miles</option>
            </select>
          </div>
          <button type="submit" className="search-form__button">
            Search Coffee Shops
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
