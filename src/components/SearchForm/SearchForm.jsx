import { useState } from "react";
import {
  SEARCH_RADIUS_OPTIONS,
  DEFAULT_SEARCH_RADIUS,
} from "../../config/constants.js";
import selectArrow from "../../images/select-arrow.svg";
import locationIcon from "../../images/location-icon.svg";
import "./SearchForm.css";

function SearchForm({ onSearch, onUseLocation }) {
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState(DEFAULT_SEARCH_RADIUS);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim(), radius);
    }
  };

  const handleUseLocation = async () => {
    setIsGettingLocation(true);
    try {
      await onUseLocation(radius);
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <section className="search-form">
      <div
        className="search-form__container"
        style={{ "--select-arrow-url": `url(${selectArrow})` }}
      >
        <h2 className="search-form__title">Find Coffee Shops Near You</h2>
        <p className="search-form__subtitle">
          Enter a city name or click the location icon
        </p>
        <form className="search-form__form" onSubmit={handleSubmit}>
          <div className="search-form__input-group">
            <label htmlFor="city" className="search-form__label">
              City
            </label>
            <div className="search-form__input-wrapper">
              <button
                type="button"
                className="search-form__location-button"
                onClick={handleUseLocation}
                disabled={isGettingLocation}
                aria-label="Use my current location"
                title="Use my current location"
              >
                <img
                  src={locationIcon}
                  alt="Location icon"
                  className={`search-form__location-icon ${
                    isGettingLocation
                      ? "search-form__location-icon--loading"
                      : ""
                  }`}
                />
              </button>
              <input
                id="city"
                type="text"
                className="search-form__input search-form__input--with-icon"
                placeholder="e.g., Denver, New York, San Francisco..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
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
              {SEARCH_RADIUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option} {option === 1 ? "mile" : "miles"}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="search-form__button"
            disabled={!city.trim()}
          >
            Search Coffee Shops
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
