import React, { Component } from "react";
import styles from "./RestaurantMenuList.scss";
import RestaurantMenu from "../RestaurantMenu";
import { ThreeBounce } from "better-react-spinkit";
import * as api from "lib/api";

class RestaurantMenuList extends Component {
  state = {
    loading: false,
    isLastPage: {
      main: false,
      sides: false,
      beverages: false,
      etc: false
    },
    menus: {
      mainMenus: {
        pageNum: 1,
        menuList: []
      },
      sideMenus: {
        pageNum: 1,
        menuList: []
      },
      bvgMenus: {
        pageNum: 1,
        menuList: []
      },
      etcMenus: {
        pageNum: 1,
        menuList: []
      }
    }
  };

  requestAPI = async (
    restaurantId,
    menuTypeKey,
    menuTypeParam,
    pageNum,
    menuType
  ) => {
    const specificTypeMenu = this.state.menus[menuTypeKey];
    try {
      const response = await api.getRestaurantMenus(
        restaurantId,
        menuTypeParam,
        pageNum
      );
      const newMenus = response.data;
      console.log(newMenus);
      if (
        specificTypeMenu.menuList.length > 0 &&
        newMenus[newMenus.length - 1].id ===
          specificTypeMenu.menuList[specificTypeMenu.menuList.length - 1].id
      ) {
        this.setState({
          ...this.state,
          loading: false,
          isLastPage: {
            ...this.state.isLastPage,
            [menuType]: true
          }
        });
        return;
      }

      const allMenus = specificTypeMenu.menuList.concat(newMenus);
      this.setState({
        menus: {
          ...this.state.menus,
          [menuTypeKey]: {
            pageNum: ++specificTypeMenu.pageNum,
            menuList: allMenus
          }
        }
      });
      this.setState({
        loading: false
      });
    } catch (e) {
      // 오류가 났을 경우
      console.log(e);
    }
  };

  getMenus = async (restaurantId, menuType) => {
    const menus = this.state.menus;
    if (this.state.loading || this.state.isLastPage[menuType]) {
      return;
    }
    this.setState({
      loading: true
    });

    switch (menuType) {
      case "main": {
        let pageNum = menus.mainMenus.pageNum;
        let menuTypeKey = "mainMenus";
        let menuTypeParam = "MAIN";
        this.requestAPI(
          restaurantId,
          menuTypeKey,
          menuTypeParam,
          pageNum,
          menuType
        );
        break;
      }
      case "sides": {
        let pageNum = menus.sideMenus.pageNum;
        let menuTypeKey = "sideMenus";
        let menuTypeParam = "SIDES";
        this.requestAPI(
          restaurantId,
          menuTypeKey,
          menuTypeParam,
          pageNum,
          menuType
        );
        break;
      }
      case "beverages": {
        let pageNum = menus.bvgMenus.pageNum;
        let menuTypeKey = "bvgMenus";
        let menuTypeParam = "BVGS";
        this.requestAPI(
          restaurantId,
          menuTypeKey,
          menuTypeParam,
          pageNum,
          menuType
        );
        break;
      }
      case "etc": {
        let pageNum = menus.etcMenus.pageNum;
        let menuTypeKey = "etcMenus";
        let menuTypeParam = "ETC";
        this.requestAPI(
          restaurantId,
          menuTypeKey,
          menuTypeParam,
          pageNum,
          menuType
        );
        break;
      }
      default: {
        let pageNum = menus.mainMenus.pageNum;
        let menuTypeKey = "mainMenus";
        let menuTypeParam = "MAIN";
        this.requestAPI(
          restaurantId,
          menuTypeKey,
          menuTypeParam,
          pageNum,
          menuType
        );
        break;
      }
    }
  };

  handleScroll = e => {
    const scrollbox = e.target;
    const scrolledToBottom =
      scrollbox.offsetHeight + scrollbox.scrollTop === scrollbox.scrollHeight;
    if (scrolledToBottom) {
      console.log("scroll reached the end!");
      const { match, restaurantId } = this.props;
      const menuType = match.params.type;
      if (this.state.isLastPage[menuType]) {
        //scroll불가
        return;
      }
      this.getMenus(restaurantId, menuType);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { match, restaurantId } = this.props;
      const menuType = match.params.type;
      console.log(menuType);
      this.getMenus(restaurantId, menuType);
      this.scrollbox.addEventListener("scroll", this.handleScroll);
    }
  }

  componentDidMount() {
    const { match, restaurantId } = this.props;
    const menuType = match.params.type;
    this.getMenus(restaurantId, menuType);
    this.scrollbox.addEventListener("scroll", this.handleScroll);
  }

  render() {
    // console.log(this.state.menus[0]);
    // console.log(this.props);
    const { onCartAdd, cart } = this.props;
    const { match } = this.props;
    const menus = (function(menuType, menus) {
      switch (menuType) {
        case "main":
          return menus.mainMenus.menuList;
        case "sides":
          return menus.sideMenus.menuList;
        case "beverages":
          return menus.bvgMenus.menuList;
        case "etc":
          return menus.etcMenus.menuList;
        default:
          return menus.mainMenus.menuList;
      }
    })(match.params.type, this.state.menus);

    const menuListComponent = menus.map(menu => (
      <RestaurantMenu
        key={menu.id}
        info={menu}
        onCartAdd={onCartAdd}
        cartAdded={cart.indexOf(menu.id) !== -1}
      />
    ));

    return (
      <div
        className={styles.RestaurantMenuList}
        ref={ref => {
          this.scrollbox = ref;
        }}
      >
        {menuListComponent}
        {this.state.loading && (
          <div className={styles.RestaurantMenuLoading}>
            <ThreeBounce color="black" size={15} />
          </div>
        )}
      </div>
    );
  }
}

export default RestaurantMenuList;
