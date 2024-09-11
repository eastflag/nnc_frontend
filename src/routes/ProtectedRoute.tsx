import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {JwtUtils} from "../utils/JwtUtils";

const ProtectedRoute = ({path, children}: any) => {
  // BrowseRouter로 부터 넘어오는 props를 파악하는게 중요.
  // path, location ...
  console.log(path, children);

  const token = useSelector((state: any) => state.auth.token);

  // 토콘이 없거나 만료된 토큰이면 로그인 화면으로 이동.
  if (!JwtUtils.isAuth(token)) {
    return <Navigate to={`/login?redirectUrl=${path}`} replace={true} />;
  }

  return children;
}

export default ProtectedRoute
