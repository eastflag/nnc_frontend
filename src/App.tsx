import './App.css'
import {Route, Routes} from "react-router-dom";
import Sample from "./pages/sample/Sample.tsx";
import SignIn from "./pages/sign-in/SignIn.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sample" element={<Sample />} /> {/* 로그인 페이지 */}
      </Routes>
    </>
  )
}

export default App
