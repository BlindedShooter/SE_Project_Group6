import React, { Component } from "react";
import styles from "./RestaurantMenuList.scss";
import RestaurantMenu from "../RestaurantMenu";
import { ThreeBounce } from "better-react-spinkit";
import * as api from "lib/api";

//화면 하단에 보이는 메뉴 리스트를 관리하는 컴포넌트 입니다.
//메뉴 정보와 스크롤 정보를 state에 저장합니다.
//처음 마운트된 메뉴 정보를 menus에 저장하고 스크롤이 다 내려가면 새로운 메뉴를 추가합니다.
//menus에 메인, 사이드, 음료, 기타메뉴가 다 저장되기 때문에 메뉴가 로딩된 후에 다른 탭을 눌렀다 돌아와도 기존 메뉴 정보가 유지되도록 하였습니다. 
//isLastPage는 메뉴가 다 로딩되었을 때 True로 바꾸어 더이상 request가 가지 않도록 하였습니다.
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

    //메뉴정보를 api.js 파일에서 서버에 axios  요청 합니다. 
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

    //레스토랑 id와 메뉴 타입을 받고 해당하는 메뉴 정보를 받기 위해 레스토랑id, 메뉴의key등 request하는데 필요한 정보를 requestAPI에 전달하고 호출합니다
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
    //스크롤이 충분히 밑으로 가면 새로운 메뉴 요청을 보내고 더이상 불러올 메뉴가 없으면 스크롤이 다 내려갔음을 표시합니다.
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

    //상단 컴포넌트의 스테이트가 바뀌면 MenuList의 스테이트를 자동으로 업데이트 해줍니다.   
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { match, restaurantId } = this.props;
      const menuType = match.params.type;
      console.log(menuType);
      this.getMenus(restaurantId, menuType);
      this.scrollbox.addEventListener("scroll", this.handleScroll);
    }
  }
    //처음 시작할때 정보들(메뉴, 스크롤 정보)를 스테이트에 마운트 합니다.
  componentDidMount() {
    const { match, restaurantId } = this.props;
    const menuType = match.params.type;
    this.getMenus(restaurantId, menuType);
    this.scrollbox.addEventListener("scroll", this.handleScroll);
  }

    //스테이트가 업데이트 되면 자동으로 호출되어 화면에 정보들을 뿌려줍니다.
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
        {this.state.loading && <ThreeBounce color="black" size={15} />}
      </div>
    );
  }
}

export default RestaurantMenuList;
