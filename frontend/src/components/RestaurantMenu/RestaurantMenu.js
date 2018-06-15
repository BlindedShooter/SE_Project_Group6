import React, { Component } from "react";
import styles from "./RestaurantMenu.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

//화면 하단의 메뉴 리스트에서 각각의 메뉴를 관리하는 컴포넌트입니다.
//handleCartAdd함수가 호출되면 App.js의 onCartAdd 함수를 호출합니다. App.js에서 장바구니 정보를 관리하기 때문입니다.
class RestaurantMenu extends Component {
  handleCartAdd = () => {
    const { info, onCartAdd } = this.props;
    onCartAdd(info.id);
  };

  truncateText = text => {
    return text.slice(0, 30);
  };
    // 하단에 장바구니 담기 Action button을 만들었습니다.
    //cartAdded변수를 이용해 해당 메뉴가 장바구니에 담겼는지 안담겼는지를 확인할 수 있고
    //담겨있을때와 담겨있지 않을 때 다른 css를 적용했습니다.
    //해당 메뉴를 장바구니에 담을 때 handleCartAdd 함수를 호출하도록 했습니다.
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
