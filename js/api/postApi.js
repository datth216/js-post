import axiosInstanceClient from './axiosInstanceClient';

const postApi = {
  getAll(params) {
    const url = '/posts';
    return axiosInstanceClient.get(url, { params: params });
  },

  getById(id) {
    const url = `/posts/${id}`;
    return axiosInstanceClient.get(url);
  },

  add(data) {
    const url = `/posts`;
    return axiosInstanceClient.post(url, data);
  },

  update(data) {
    const url = `/posts/${data.id}`;
    return axiosInstanceClient.patch(url, data);
  },

  addFormData(data) {
    const url = `/with-thumbnail/posts`;
    return axiosInstanceClient.patch(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  addFormData(data) {
    const url = `/with-thumbnail/posts/${id}`;
    return axiosInstanceClient.patch(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  remove(id) {
    const url = `/posts/${id}`;
    return axiosInstanceClient.delete(url);
  },
};

export default postApi;
