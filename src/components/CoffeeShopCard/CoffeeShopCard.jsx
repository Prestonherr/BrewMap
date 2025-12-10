import "./CoffeeShopCard.css";

function CoffeeShopCard({ coffeeShop }) {
  const { name, address, distance, tags } = coffeeShop;

  return (
    <article className="coffee-shop-card">
      <div className="coffee-shop-card__content">
        <h3 className="coffee-shop-card__name">
          {name || "Unnamed Coffee Shop"}
        </h3>
        {address && <p className="coffee-shop-card__address">{address}</p>}
        {distance !== undefined && (
          <p className="coffee-shop-card__distance">
            {distance.toFixed(1)} miles away
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="coffee-shop-card__tags">
            {tags.map((tag, index) => (
              <span key={index} className="coffee-shop-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default CoffeeShopCard;
