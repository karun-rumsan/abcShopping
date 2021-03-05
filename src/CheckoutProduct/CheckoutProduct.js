import { Button } from "@material-ui/core";
import React from "react";
import { useStateValue } from "../StateProvider";
import "./CheckoutProduct.css";
function CheckoutProduct({ id, title, price, image, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    // console.log("this is the basket", basket);
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__img" src={image} alt="sssss" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__infoTitle">{title}</p>
        <p className="checkoutProduct__infoPrice">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__infoRating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <Button
            style={{
              backgroundColor: " #f0c14b",
              border: "1px solid",
              marginTop: "5px",
              borderColor: " #a88734 #9c7e31 #846a29",
              color: "#111",
              fontSize: "10px",
            }}
            size="small"
            onClick={removeFromBasket}
          >
            Remove From Basket
          </Button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
