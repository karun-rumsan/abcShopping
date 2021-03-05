import { Button } from "@material-ui/core";
import React from "react";

import { useStateValue } from "../StateProvider";
import "./Product.css";
function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // console.log("this is the basket", basket);
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <Button
        style={{
          backgroundColor: " #f0c14b",
          border: "1px solid",
          marginTop: "10px",
          borderColor: " #a88734 #9c7e31 #846a29",
          color: "#111",
        }}
        onClick={addToBasket}
      >
        Add to Basket
      </Button>
    </div>
  );
}

export default Product;
