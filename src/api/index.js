import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log("Request:", config);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      setCookieHeader.forEach(cookieString => {
        document.cookie = cookieString;
      });
    }

    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);

export default apiClient;
