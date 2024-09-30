import axios from "axios";

// vite proxy 설정: vite.config.ts
// http://localhost:5173/api => http://localhost:9090/api
const customAxios = axios.create({
  baseURL: ''
});

// request, respponse interceptor는 useAxiosInterceptor로 이동

export default customAxios;