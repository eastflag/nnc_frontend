import {jwtDecode} from "jwt-decode";

export class JwtUtils {
  static isAuth(token: any) {
    if (!token) {
      return false;
    }
    const decodedJwt: any = jwtDecode(token);
    // console.log(decoded);
    return decodedJwt.exp > new Date().getTime() / 1000;
  }

  static getId(token: any) {
    const decodedJwt: any = jwtDecode(token)
    return decodedJwt.jti;
  }

  static getName(token: any) {
    const decodedJwt: any = jwtDecode(token)
    return decodedJwt.subject;
  }

  static getRoles(token: any) {
    const decodedJwt: any = jwtDecode(token)
    return decodedJwt.roles;
  }
}
