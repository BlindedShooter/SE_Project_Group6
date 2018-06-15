import React, { Component } from "react";
import RestaurantDetailTemplate from "../components/RestaurantDetailTemplate";
import RestaurantHeader from "../components/RestaurantHeader";
import RestaurantMain from "../components/RestaurantMain";
import Navigation from "../components/Navigation/Navigation";
import RestaurantMenuOrderCart from "../components/RestaurantMenuOrderCart";

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
        <RestaurantMenuOrderCart cart={cart} onOrder={onOrder} />
        {/* background-image */}
        {/* Restaurant Info Card */}
        {/* Restaurant Menu Tab */}
        {/* Restaurant Menu List */}
      </RestaurantDetailTemplate>
    );
  }
}

export default RestaurantDetailPage;
