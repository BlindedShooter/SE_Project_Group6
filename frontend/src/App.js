import React, { Component } from "react";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import * as api from "lib/api";

//App.js는 가장 최상위 컴포넌트 입니다. 여기서 레스토랑, 테이블 정보와 장바구니 정보(cart)를 관리합니다
class App extends Component {
    //state 정의. restaurant, table data와 cart 정보를 저장합니다.
  state = {
    restaurantData: null,
    restaurantId: null,
    tableId: null,
    cart: []
  };

  handleCartAdd = id => {
    //menu id를 받아와서 Cart에 Add/Remove하는 function입니다.
    const { cart } = this.state;
    console.log(cart);
    if (cart.indexOf(id) !== -1) {
      this.setState({
        cart: cart.filter(menuId => menuId !== id)
      });
      return false;
    } else {
      this.setState({
        cart: cart.concat(id)
      });
      return true;
    }
  };

  handleOrder = async () => {
    // 주문하기 버튼을 클릭시 Order Create API로 axious 요청을 보냅니다
    const { restaurantId, tableId, cart } = this.state;
    try {
      const response = await api.createOrder(restaurantId, tableId, cart);
      if (response.status === 201) {
        console.log("Order Successfully Created!");
        this.setState({
          cart: []
        });
      } else {
        console.log("Error making Orders!");
      }
    } catch (e) {
      console.log(e);
    }
  };
    // api.getRestaurant 에서 axios 요청을 보내 레스토랑 정보를 가져옵니다
  getRestaurant = async id => {
    try {
      const response = await api.getRestaurant(id);
      const restaurantData = response.data;
      this.setState({
        restaurantData
      });
    } catch (e) {
      // 오류가 났을 경우
      console.log(e);
    }
  };
    //처음 가져온 정보들을 마운트(스테이트에 저장) 시킵니다
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get("restaurant_id");
    const tableId = urlParams.get("table_id");

    this.getRestaurant(restaurantId);

    this.setState({
      restaurantId: restaurantId,
      tableId: tableId
    });
  }
    //스테이트가 업데이트 되면 자동으로 화면에 뿌려줍니다.
  render() {
    console.log(this.state);
    console.log(this.state.cart);
    if (this.state.restaurantData) {
      return (
        <div>
          <RestaurantDetailPage
            data={this.state.restaurantData}
            restaurantId={this.state.restaurantId}
            tableId={this.state.tableId}
            onCartAdd={this.handleCartAdd}
            cart={this.state.cart}
            onOrder={this.handleOrder}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default App;
