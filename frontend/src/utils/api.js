import axios from "axios";
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "//myproductionurl.com"
    : "//localhost:5000";

export default axios.create({
  baseURL: API_BASE,
});
