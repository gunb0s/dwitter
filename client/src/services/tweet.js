export default class TweetService {
  constructor(axiosInstance, tokenStorage, socket) {
    this.http = axiosInstance;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }
  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    return this.http.request(`/tweets${query}`, {
      method: "get",
      headers: this.getHeaders(),
    });
  }

  async getById(id) {
    return this.http.request(`/tweets/${id}`, {
      method: "get",
      headers: this.getHeaders(),
    });
  }

  async create(content) {
    return this.http.request("/tweets", {
      method: "post",
      data: {
        content,
        username: "cain",
        name: "Bo Seong Kim",
      },
      headers: this.getHeaders(),
    });
  }

  async update(id, content) {
    return this.http.request(`/tweets/${id}`, {
      method: "put",
      data: { content },
      headers: this.getHeaders(),
    });
  }

  async remove(id) {
    return this.http.request(`/tweets/${id}`, {
      method: "delete",
      headers: this.getHeaders(),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  onSync(callback) {
    return this.socket.onSync("tweets", callback);
  }
}
