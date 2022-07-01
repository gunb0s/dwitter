export default class AuthService {
  constructor(axiosInstance, tokenStorage) {
    this.http = axiosInstance;
    this.tokenStorage = tokenStorage;
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

    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username, password) {
    const data = await this.http.request("/auth/login", {
      method: "post",
      data: {
        username,
        password,
      },
    });

    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.request("/auth/me", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
