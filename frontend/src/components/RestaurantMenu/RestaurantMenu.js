import React, { Component } from "react";
import styles from "./RestaurantMenu.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class RestaurantMenu extends Component {
  handleCartAdd = () => {
    const { info, onCartAdd } = this.props;
    onCartAdd(info.id);
  };

  truncateText = text => {
    return text.slice(0, 30);
  };

  render() {
    const { cartAdded } = this.props;
    const { name, description, price, thumbnail_image } = this.props.info;

    return (
      <div className={styles.RestaurantMenu}>
        <div className={styles.floatingCard}>
          <div className={styles.menuThumbnail}>
            <img src={thumbnail_image} alt="menu-thumbnail" />
          </div>
          <div className={styles.menuContext}>
            <span className={styles.name}>{name}</span>
            <div className={styles.description}>
              <span className={styles.text}>
                {this.truncateText(description)}
              </span>
              <a className={styles.seeMore}>...더보기</a>
            </div>
            <div className={styles.orderInfo}>
              <span className={styles.price}>{price}원</span>
              <div className={styles.actionButton}>
                <div className={styles.quantity}>
                  <span className={styles.text}>수량: 1</span>
                </div>
                <div
                  className={cx("cart", {
                    clicked: cartAdded
                  })}
                  onClick={this.handleCartAdd}
                >
                  <span className={styles.text}>
                    {cartAdded ? "담아짐" : "장바구니 담기"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantMenu;
