import axios from "axios";

export class AxiosInstance {
  constructor() {
    this.baseURL = process.env.REACT_APP_SERVER_URL;
  }

  async request(endpoint, options) {
    const res = await axios({
      url: `${this.baseURL}${endpoint}`,
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (res.status > 299 || res.status < 200) {
      const message =
        res.data && res.data.message
          ? res.data.message
          : "Something went wrong 😥";
      throw new Error(message);
    }

    return res.data;
  }
}
