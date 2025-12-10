import CoffeeShopCard from "../CoffeeShopCard/CoffeeShopCard";
import "./CoffeeShopList.css";

function CoffeeShopList({ coffeeShops, isLoading, error }) {
  if (isLoading) {
    return (
      <section className="coffee-shop-list">
        <div className="coffee-shop-list__container">
          <p className="coffee-shop-list__message">
            Searching for coffee shops...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="coffee-shop-list">
        <div className="coffee-shop-list__container">
          <p className="coffee-shop-list__error">{error}</p>
        </div>
      </section>
    );
  }

  if (!coffeeShops || coffeeShops.length === 0) {
    return (
      <section className="coffee-shop-list">
        <div className="coffee-shop-list__container">
          <p className="coffee-shop-list__message">
            No coffee shops found. Try adjusting your search criteria.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="coffee-shop-list">
      <div className="coffee-shop-list__container">
        <h2 className="coffee-shop-list__title">
          Found {coffeeShops.length} Coffee Shop
          {coffeeShops.length !== 1 ? "s" : ""}
        </h2>
        <div className="coffee-shop-list__grid">
          {coffeeShops.map((shop, index) => (
            <CoffeeShopCard key={shop.id || index} coffeeShop={shop} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoffeeShopList;
