import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.scss";

const Navigation = () => {
  return (
    <div className={styles.Navigation}>
      <ul className={styles.items}>
        <li className={styles.item}>
          <NavLink to="/menu/main" activeClassName={styles.active}>
            <span>식사</span>
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/menu/sides" activeClassName={styles.active}>
            <span>사이드 메뉴</span>
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/menu/beverages" activeClassName={styles.active}>
            <span>음료</span>
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/menu/etc" activeClassName={styles.active}>
            <span>기타</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
