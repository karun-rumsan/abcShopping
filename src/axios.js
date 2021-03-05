import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1000/clone-e-2d18c/us-central1/api",
});
export default instance;

//http://localhost:5001/clone-78c5a/us-central1/api
