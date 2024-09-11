import axios from "axios";

// vite proxy 설정: vite.config.ts
// http://localhost:5173/api => http://localhost:9090/api
const customAxios = axios.create({
  baseURL: ''
});

/*customAxios.interceptors.request.use(
  (config) => {
    // 요청 직전 호출됩니다.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
    const token = store.getState().auth.token;
    try {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (err: any) {
      console.error('[_axios.interceptors.request] config : ' + err.message);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    /!*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    *!/

    return response;
  },

  (error) => {
    /!*
        http status가 200이 아닌 경우
    *!/
    if (error.response && error.response.status) {
      console.log(`axios interceptor resonse error: ${error.response.status}`);
      switch (error.response.status) {
        // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
        case 401:
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);*/

export default customAxios;