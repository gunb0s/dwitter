import axios from "axios";

export class AxiosInstance {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options) {
    let res;

    try {
      res = await axios({
        url: `${this.baseURL}${endpoint}`,
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
    } catch (err) {
      const {
        response: { data },
      } = err;

      const errors = data?.errors;

      const message =
        errors && errors[0].msg ? errors[0].msg : "Something went wrong 😥";
      throw new Error(message);
    }

    return res.data;
  }
}
