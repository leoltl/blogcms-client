import axios from 'axios';
import TokenManager from './TokenManager';
import Cache from './Cache';

const baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000'

const axiosInstance = axios.create({ baseURL }); 

export const tokenManager = TokenManager(axiosInstance);

axiosInstance.interceptors.request.use((config) => {
  tokenManager.autoRefresh(`${baseURL}/api/refresh`)
  return config
})

function makeAPI() {
  const postCache = Cache();
  
  function listPosts() {
    if (!postCache.needFullFetch()) {
      return Promise.resolve({ data: postCache.get() })
    }

    return axiosInstance.get('/api/posts')
      .then(res => {
        postCache.setArray(res.data, { fullFetch: true });
        return res;
      });
  }
  
  function detailPosts(id) {
    if (id === undefined) {
      return Promise.resolve({ data: { title: "", body: "" }})
    }
    if (postCache.has(id)) {
      return Promise.resolve({ data: postCache.get(id) });
    }
    return axiosInstance.get(`/api/posts/${id}`)
      .then(res => {
        postCache.set(id, res.data);
        return res;
      });
  }

  function createComment(id, comment) {
    return axiosInstance.post(`/api/posts/${id}/comment`, {...comment})
  }

  return {
    listPosts,
    detailPosts,
    createComment,
  }
}

export default makeAPI()
