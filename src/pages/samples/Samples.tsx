import {Link, Outlet} from "react-router-dom";

export const Samples = () => {
  return (
    <div>
      <h1>Samples</h1>
      <ul>
        <li>
          <Link to='/samples/mui-sample'>MUI sample</Link>
        </li>
        <li>
          <Link to='/samples/counter'>redux toolkit sample</Link>
        </li>
        <li>
          <Link to='/samples/react-hook-form'>react-hook-form sample</Link>
        </li>
        <li>
          <Link to='/samples/mui-form'>MUI Form sample</Link>
        </li>
        <li>
          <Link to='/samples/mui-hook-form'>MUI + react-hook-form sample</Link>
        </li>
        <li>
          <Link to='/samples/image-upload'>image-upload</Link>
        </li>
        <li>
          <Link to='/samples/quill'>Rich Editor: react-quill</Link>
        </li>
        <li>
          <Link to='/samples/auth-sample'>Authenticated Page</Link>
        </li>
      </ul>
      <hr/>
      <Outlet></Outlet>
    </div>
  );
}