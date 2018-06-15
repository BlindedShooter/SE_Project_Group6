import * as axios from "axios";
// axios.defaults.withCredentials = true;

//연습용
export function getAPOD(date = "") {
  return axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=5q6uswo7lQPq6HcC05xDRdcoikRkPCVdIqk6mbxe&date=${date}`
  );
}

//받는 url 주소 형태에 따라 다른 axios 요청 서버에 보냅니다.
//프론트엔드에서 오는 모든 요청을 받아서 서버에 전송합니다. 
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