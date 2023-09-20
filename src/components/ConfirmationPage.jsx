import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderConfirmation from "./OrderConfirmation";

import styles from "./styles/ConfirmationPage.module.css";

function ConfirmationPage() {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState({});

  const getOrderInfo = async (orderID) => {
    try {
      const response = await fetch(`/api/orders/${orderID}`, { mode: "cors" });
      const data = await response.json();
      setOrderInfo(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getOrderInfo(id);
  }, [id]);

  return (
    <div className={styles.ConfirmationPageContainer}>
      <OrderConfirmation order={orderInfo} />
    </div>
  );
}

export default ConfirmationPage;
