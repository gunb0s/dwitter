export default class AuthService {
  constructor(axiosInstance, tokenStroage) {
    this.http = axiosInstance;
    this.tokenStroage = tokenStroage;
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.request("/auth/signup", {
      method: "post",
      data: {
        username,
        password,
        name,
        email,
        url,
      },
    });

    return data;
  }

  async login(username, password) {
    const data = this.http.request("/auth/login", {
      method: "post",
      data: {
        username,
        password,
      },
    });

    return data;
  }

  async me() {
    // const token = this.tokenStroage.getToken();
    return this.http.request("/auth/me", {
      method: "get",
      headers: {
        Authorization: "Bearer",
      },
    });
  }

  async logout() {}
}
