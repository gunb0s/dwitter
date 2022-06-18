export class TweetService {
  constructor(axiosInstacne) {
    this.http = axiosInstacne;
  }
  async getAll() {
    return this.http.request("/tweets", { method: "get" });
  }

  async getById(id) {
    return this.http.request(`/tweets/${id}`, { method: "get" });
  }

  async create(text) {
    return this.http.request("/tweets", {
      method: "post",
      data: {
        text,
        username: "cain",
        name: "Bo Seong Kim",
      },
    });
  }

  async update(id, text) {
    return this.http.request(`/tweets/${id}`, {
      method: "put",
      data: { text },
    });
  }

  async remove(id) {
    return this.http.request(`/tweets/${id}`, { method: "delete" });
  }
}
