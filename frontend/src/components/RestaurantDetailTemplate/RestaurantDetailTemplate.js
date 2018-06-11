import React from "react";
import styles from "./RestaurantDetailTemplate.scss";

const RestaurantDetailTemplate = ({ children }) => {
  return <div className={styles.RestaurantDetailTemplate}>{children}</div>;
};

export default RestaurantDetailTemplate;
