import React, { Component } from "react";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import * as api from "lib/api";

class App extends Component {
  state = {
    restaurantData: null,
    restaurantId: null,
    tableId: null,
    cart: []
  };

  handleCartAdd = id => {
    //menu id를 받아와서 Cart에 Add/Remove하는 function
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
    // Order Create API로 요청보내기
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
