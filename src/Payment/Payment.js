import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import { Button } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";

import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../Reducer";
import { db } from "../firebase";

function Payment() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log("client secret is >>", clientSecret);
  const handleSubmit = async (e) => {
    //stripe stuff
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent == payment confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        history.replace("/orders");
        dispatch({
          type: "EMPTY_BASKET",
        });
      });
  };

  const handleChange = (e) => {
    //Change in Card Element
    //&&display error as customer type wrong details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1 onClick={(e) => history.push("./checkout")}>
          CheckOut(
          {basket?.length})
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>butwal nepal</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3> Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>PAyment MEthod</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3> Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeprator={true}
                  prefix={"$"}
                />
                <Button
                  type="submit"
                  disabled={processing || disabled || succeeded}
                  style={{
                    backgroundColor: " #f0c14b",
                    border: "1px solid",
                    marginTop: "10px",
                    borderColor: " #a88734 #9c7e31 #846a29",
                    color: "#111",
                    borderRadius: "2px",
                    height: "30px",
                    width: "100%",
                    fontWeight: "bolder",
                  }}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </Button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
