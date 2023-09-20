import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();

  const placeOrder = async () => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });
    const data = await response.json();
    if (response.status === 200) {
      navigate(`/order-confirmation/${data.id}`);
    }
  };

  function validateFormCheck() {
    let isValid = true;
    const errors = {};

    const phonePattern = /^\(?(\d{3})\)?[- ]?\d{3}[- ]?\d{4}$/;

    if (!name) {
      errors.name = "Name must be filled out!";
      isValid = false;
    }

    if (!address) {
      errors.address = "Address must be filled out!";
      isValid = false;
    }

    if (!phone || !phone.match(phonePattern)) {
      errors.phone = "Invalid Phone Number!";
      isValid = false;
    }
    setErrorMessages(errors);
    if (isValid) {
      placeOrder();
    }
  }

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
              {errorMessages.name && (
                <div className={styles.errorMessage} style={{ color: "red" }}>
                  <h4>{errorMessages.name}</h4>
                </div>
              )}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
              {errorMessages.phone && (
                <div className={styles.errorMessage} style={{ color: "red" }}>
                  <h4>{errorMessages.phone}</h4>
                </div>
              )}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
              {errorMessages.address && (
                <div className={styles.errorMessage} style={{ color: "red" }}>
                  <h4>{errorMessages.address}</h4>
                </div>
              )}
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              validateFormCheck();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
