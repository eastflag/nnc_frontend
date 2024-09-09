import customAxios from './customAxios';
import {useEffect} from "react";
import store from "../store";
import {useDispatch} from "react-redux";
import {toastActions} from "../store/toastSlice.ts";
import {useNavigate} from "react-router-dom";

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorHandler = (error: any) => {
    console.log(error);  // {timestamp, status, error, path}

    switch (error.status) {
      // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
      case 401:
        // toast
        dispatch(toastActions.open({
          isOpened: true,
          severity: 'error',
          message: error.error
        }));
        navigate('/login');
        break;
      default:
        // toast
        dispatch(toastActions.open({
          isOpened: true,
          severity: 'error',
          message: error.error
        }));
        break;
    }

    // 이것을 생략하면 customAxios 호출시 try catch로 에러를 잡아야 한다.
    // return Promise.reject(error);
  };

  const responseHandler = (response: any) => {
    return response;
  };

  const responseInterceptor = customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error.response.data),
  );

  const requestHandler = (config: any) => {
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
  };

  const requestInterceptor = customAxios.interceptors.request.use(requestHandler);

  useEffect(() => {
    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);

};