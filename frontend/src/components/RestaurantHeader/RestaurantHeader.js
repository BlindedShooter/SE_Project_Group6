import React from "react";
import styles from "./RestaurantHeader.scss";

const RestaurantHeader = ({
  backgroundImage,
  logoImage,
  name,
  description,
  tags,
  stars,
  reviews
}) => {
  const tagList = tags.map((tag, idx) => (
    <span key={idx} className={styles.tag}>
      {tag}
    </span>
  ));
  return (
    <div className={styles.RestaurantHeader}>
      <header>
        <img src={backgroundImage} alt="backgroundImage" />
      </header>
      <div className={styles.headerContents}>
        <div className={styles.floatingCard}>
          <div className={styles.logo}>
            <img src={logoImage} alt="backgroundImage" />
          </div>
          <div className={styles.information}>
            <span className={styles.name}>{name}</span>
            <span className={styles.description}>{description}</span>
            <div className={styles.tagList}>{tagList}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
