import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-my-burger-609a3.firebaseio.com/",
});

export default instance;
