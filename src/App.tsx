import './App.css'
import {Route, Routes} from "react-router-dom";
import MuiSample from "./pages/samples/MuiSample.tsx";
import Login from "./pages/sign-in/Login.tsx";
import {Counter} from "./pages/samples/Counter.tsx";
import Home from "./pages/home/Home.tsx";
import {ReactHookForm} from "./pages/samples/ReactHookForm.tsx";
import {ImageUpload} from "./pages/samples/ImageUpload.tsx";
import {Samples} from "./pages/samples/Samples.tsx";
import {QuillSample} from "./pages/samples/QuillSample.tsx";
import {MuiHookForm} from "./pages/samples/MuiHookForm.tsx";
import {MuiForm} from "./pages/samples/MuiForm.tsx";
import SignUp from "./pages/sign-up/SignUp.tsx";
import AuthSample from "./pages/samples/AuthSample.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import {ToastSample} from "./pages/samples/ToastSample.tsx";
import {Toast} from "./components/Toast.tsx";
import Admin from './pages/admin/Admin.tsx';
import UserManage from "./pages/admin/user/UserManage.tsx";
import LogManage from "./pages/admin/user/LogManage.tsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.tsx";
import MuiGridSample from "./pages/samples/MuiGridSample.tsx";
import AgGridSample from "./pages/samples/AgGridSample.tsx";
import PaginationSample from "./pages/samples/PaginationSample.tsx";
import {useAxiosInterceptor} from "./utils/useAxiosInterceptor.ts";
import NewsManage from "./pages/admin/contents/NewsManage.tsx";
import CategoryManage from "./pages/admin/contents/CategoryManage.tsx";

function App() {
  useAxiosInterceptor();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute path="/admin">
            <Admin />
          </ProtectedRoute>
        }>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/user" element={<UserManage />} />
          <Route path="/admin/log" element={<LogManage />} />
          <Route path="/admin/news" element={<NewsManage />} />
          <Route path="/admin/category" element={<CategoryManage />} />
        </Route>
        <Route path="/samples" element={<Samples />}>
          <Route path="/samples/mui-sample" element={<MuiSample />} /> {/* MUI sample */}
          <Route path="/samples/counter" element={<Counter />} /> {/* MUI sample */}
          <Route path="/samples/react-hook-form" element={<ReactHookForm />} /> {/* MUI sample */}
          <Route path="/samples/mui-form" element={<MuiForm />} /> {/* MUI sample */}
          <Route path="/samples/mui-hook-form" element={<MuiHookForm />} /> {/* MUI sample */}
          <Route path="/samples/image-upload" element={<ImageUpload />} /> {/* MUI sample */}
          <Route path="/samples/quill" element={<QuillSample />} /> {/* MUI sample */}
          <Route path="/samples/auth-sample" element={
            <ProtectedRoute path="/samples/auth-sample">
              <AuthSample />
            </ProtectedRoute>
          } /> {/* MUI sample */}
          <Route path="/samples/toast" element={<ToastSample />} /> {/* MUI sample */}
          <Route path="/samples/mui-grid-sample" element={<MuiGridSample />} />
          <Route path="/samples/ag-grid-sample" element={<AgGridSample />} />
          <Route path="/samples/pagination-sample" element={<PaginationSample />} />
        </Route>
      </Routes>

      <Toast />
    </>
  )
}

export default App
