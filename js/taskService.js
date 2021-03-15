function taskService() {
  this.getListUserApi = function () {
    return axios({
      url: "https://5fd46f50e9cda40016f5bf35.mockapi.io/api/taskCV",
      method: "GET",
    });
  };
  this.deleteUserApi = function (id) {
    return axios({
      url: `https://5fd46f50e9cda40016f5bf35.mockapi.io/api/taskCV/${id}`,
      method: "DELETE",
    });
  };
  this.addUserApi = function (user) {
    return axios({
      url: "https://5fd46f50e9cda40016f5bf35.mockapi.io/api/taskCV",
      method: "POST",
      data: user,
    });
  };
  this.getTaskById = function (id) {
    return axios({
      url: `https://5fd46f50e9cda40016f5bf35.mockapi.io/api/taskCV/${id}`,
      method: "GET",
    });
  };
  this.updateUserApi = function (user) {
    return axios({
      url: `https://5fd46f50e9cda40016f5bf35.mockapi.io/api/taskCV/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}
