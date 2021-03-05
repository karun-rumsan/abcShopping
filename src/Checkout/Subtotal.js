import { Button } from "@material-ui/core";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Reducer";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";

import "./Subtotal.css";
function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({basket?.length}items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> The order contains small gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeprator={true}
        prefix={"$"}
      />
      <Button
        style={{
          backgroundColor: " #f0c14b",
          border: "1px solid",
          marginTop: "10px",
          borderColor: " #a88734 #9c7e31 #846a29",
          color: "#111",
        }}
        size="small"
        onClick={(e) => history.push("./payment")}
      >
        Proceed To Checkout
      </Button>
    </div>
  );
}

export default Subtotal;
