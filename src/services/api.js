import axios from "axios";

export const mockApi = axios.create({
  baseURL: "http://localhost:4096",
});

export const realApi = axios.create({
  baseURL: "https://pmfightacademyadmin-hr8mp.ondigitalocean.app/",
});

export default mockApi;
