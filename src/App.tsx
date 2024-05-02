import './App.css'
import {Route, Routes} from "react-router-dom";
import Sample from "./pages/sample/Sample.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/sample" element={<Sample />} /> {/* 로그인 페이지 */}
      </Routes>
    </>
  )
}

export default App
