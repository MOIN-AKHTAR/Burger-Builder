// https://react-my-burger-76e26.firebaseio.com/orders
import axios from "axios";
const instance = axios.create({
  baseURL: "https://react-my-burger-76e26.firebaseio.com",
});

export default instance;
