import React, { Component } from "react";
import RestaurantDetailTemplate from "../components/RestaurantDetailTemplate";
import RestaurantHeader from "../components/RestaurantHeader";
import RestaurantMain from "../components/RestaurantMain";
import Navigation from "../components/Navigation/Navigation";
import RestaurantMenuOrderCart from "../components/RestaurantMenuOrderCart";
import RestaurantMenuOrderList from "../components/RestaurantMenuOrderList";

class RestaurantDetailPage extends Component {
  render() {
    const {
      data,
      restaurantId,
      tableId,
      onCartAdd,
      cart,
      onOrder
    } = this.props;

    return (
      <RestaurantDetailTemplate>
        <RestaurantHeader
          backgroundImage={data.background_image}
          logoImage={data.logo_image}
          name={data.name}
          description={data.description}
          tags={data.tags}
        />
        <Navigation />
        <RestaurantMain
          restaurantId={restaurantId}
          tableId={tableId}
          onCartAdd={onCartAdd}
          cart={cart}
        />
        {/* <RestaurantMenuOrderList /> */}
        <RestaurantMenuOrderCart cart={cart} onOrder={onOrder} />
      </RestaurantDetailTemplate>
    );
  }
}

export default RestaurantDetailPage;
