import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {JwtUtils} from "../utils/JwtUtils";

const ProtectedRoute = ({path, children}: any) => {
  // BrowseRouter로 부터 넘어오는 props를 파악하는게 중요.
  // path, location ...
  console.log(path, children);

  const token = useSelector((state: any) => state.auth.token);

  if (!JwtUtils.isAuth(token)) {
    return <Navigate to={`/login?redirectUrl=${path}`} replace={true} />;
  }

  return children;
}

export default ProtectedRoute
