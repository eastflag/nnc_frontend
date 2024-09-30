import customAxios from './customAxios';
import {useLayoutEffect} from "react";
import store from "../store";
import {useDispatch} from "react-redux";
import {toastActions} from "../store/toastSlice.ts";
import {useNavigate} from "react-router-dom";
import {authActions} from "../store/authSlice.ts";

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorHandler = (error: any) => {
    switch (error.response.status) {
      // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
      case 401:
        dispatch(authActions.setToken(''));
        navigate(`/login?redirectUrl=${location.pathname}`);
        break;
      default:
        break;
    }

    // toast
    dispatch(toastActions.open({
      isOpened: true,
      severity: 'error',
      message: error.message
    }));

    // 이것을 생략하면 customAxios 호출시 try catch로 에러를 잡아야 한다.
    // return Promise.reject(error);
  };

  const responseHandler = (response: any) => {
    return response;
  };

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

  // useEffect 사용시 API call을 하게 되면 자식이 먼저 실행되므로 interceptor 등록이 나중에 일어나게 된다.
  // 자식에서 api call 보다 먼저 등록하기 위해서 useLayoutEffect를 사용한다.
  useLayoutEffect(() => {
    const requestInterceptor = customAxios.interceptors.request.use(requestHandler);

    const responseInterceptor = customAxios.interceptors.response.use(
      (response) => responseHandler(response.data),
      (error) => errorHandler(error),
    );

    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};