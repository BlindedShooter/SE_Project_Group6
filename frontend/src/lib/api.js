import * as axios from "axios";
// axios.defaults.withCredentials = true;

export function getAPOD(date = "") {
  return axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=5q6uswo7lQPq6HcC05xDRdcoikRkPCVdIqk6mbxe&date=${date}`
  );
}

export function getRestaurant(id) {
  return axios.get(
    `http://eb-nfc-project-dev.ap-northeast-2.elasticbeanstalk.com/restaurants/${id}`
  );
}

export function getRestaurantMenus(id, menuType, pageNum) {
  return axios.get(
    `http://eb-nfc-project-dev.ap-northeast-2.elasticbeanstalk.com/restaurants/${id}/menus/?type=${menuType}&page=${pageNum}`
  );
}

export function createOrder(restaurantId, tableId, cart) {
  console.log(restaurantId);
  console.log(tableId);
  console.log(cart);
  return axios.post(
    `http://eb-nfc-project-dev.ap-northeast-2.elasticbeanstalk.com/restaurants/${restaurantId}/order/`,
    {
      table_id: tableId,
      menus: cart
    }
  );
  // return axios.get(
  //   `http://eb-nfc-project-dev.ap-northeast-2.elasticbeanstalk.com/restaurants/${id}/menus/?type=${menuType}&page=${pageNum}`
  // );
}
