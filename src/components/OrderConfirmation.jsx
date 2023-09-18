import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation(orderInfo) {
  const { order } = orderInfo;
  const { items } = order;

  const mappedOrderItems = items?.map((item) => (
    <tr key={item.item.id}>
      <td>{item.item.name}</td>
      <td>{item.item.price}</td>
      <td>{item.quantity}</td>
    </tr>
  ));

  return (
    <div className={styles.OrderConfirmationContainer}>
      <h1> Thank you for your order!</h1>
      <div className={styles.OrderInfoContainer}>
        <h4>
          Name: <p>{order.name}</p>
        </h4>
        <h4>
          Address: <p>{order.address}</p>
        </h4>
        <h4>
          Order ID: <p>{order.id}</p>
        </h4>
      </div>
      <div className={styles.OrderItemsListContainer}>
        <h4>Ordered Items:</h4>
        <table className={styles.tableContainer}>
          <thead>
            <tr key="heading">
              <th>Name:</th>
              <th>Price:</th>
              <th>Quantity:</th>
            </tr>
          </thead>
          <tbody>{mappedOrderItems}</tbody>
        </table>
      </div>
      <a href="/">
        <button type="button">Order Again</button>
      </a>
    </div>
  );
}

export default OrderConfirmation;
