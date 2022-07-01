import axios from "axios";

export class AxiosInstance {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
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

      const error = new Error(message);

      if (err.response.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }

      throw error;
    }

    return res.data;
  }
}
