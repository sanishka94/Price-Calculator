import { useRef, useState } from "react";
import "./App.css";

const calculatePrice = (customers, pricePerCustomer, promoCode) => {
  let initialPrice = pricePerCustomer * customers;
  let finalPrice = initialPrice;
  let newPrice = 0;

  // Rule 1
  if (initialPrice >= 2000 || promoCode === "DIS10") {
    newPrice = initialPrice * 0.9;
    finalPrice = Math.min(finalPrice, newPrice);
  }

  // Rule 2
  if (customers === 2 && promoCode === "STARCARD") {
    newPrice = initialPrice * 0.7;
    finalPrice = Math.min(finalPrice, newPrice);
  }

  // Rule 3
  if (customers === 4 && promoCode === "STARCARD") {
    newPrice = initialPrice * 0.75;
    finalPrice = Math.min(finalPrice, newPrice);
  }

  // Rule 4
  if (initialPrice >= 2500) {
    newPrice = initialPrice * 0.75;
    finalPrice = Math.min(finalPrice, newPrice);
  }

  return finalPrice;
};

function App() {
  const customersRef = useRef(null);
  const priceRef = useRef(null);
  const promoCodeRef = useRef(null);
  const [result, setResult] = useState(null);

  const formHandler = (event) => {
    event.preventDefault();
    const customers = parseInt(customersRef.current.value);
    const pricePerCustomer = parseInt(priceRef.current.value);
    const promoCode = promoCodeRef.current.value;

    // Validate promocode, only numbers and upper case letters allowed
    const regexPromo = /[0-9A-Z]+/;
    if (promoCode.match(regexPromo)[0] !== promoCode) {
      setResult("Invalid promo code");
      return;
    }
    const totalPrice = calculatePrice(customers, pricePerCustomer, promoCode);
    setResult(totalPrice);
    return;
  };
  return (
    <div className="main_container">
      <div className="form_container">
        <form id="detail-form" onSubmit={formHandler}>
          <div className="form_element">
            <label htmlFor="customers">Number of Customers</label>
            <input
              type="number"
              name="customers"
              id="customers"
              max="1000"
              min="1"
              required
              ref={customersRef}
            />
          </div>
          <div className="form_element">
            <label htmlFor="customer-price">Price per Customers</label>
            <input
              type="number"
              name="customer-price"
              id="customer-price"
              required
              ref={priceRef}
            />
          </div>
          <div className="form_element">
            <label htmlFor="promo">Promo Code</label>
            <input
              type="text"
              name="promo"
              id="promo"
              required
              ref={promoCodeRef}
            />
          </div>
          <div className="form_element">
            <button type="submit" id="submit-button">
              Calculate
            </button>
          </div>
        </form>
        <div className="results_container">
          <div>Result : {result}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
