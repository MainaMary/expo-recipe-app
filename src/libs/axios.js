import axios from "axios";
const baseURL = "https://www.themealdb.com/api/json/v1/1/";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
export const API_ROUTES = {
  FILTER: `filter.php`,
  CATEGORIES: "categories.php",
  SEARCH: "search.php",
};
export const { CATEGORIES, FILTER } = API_ROUTES;
