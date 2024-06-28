import './App.css'
import {Route, Routes} from "react-router-dom";
import MuiSample from "./pages/samples/MuiSample.tsx";
import SignIn from "./pages/sign-in/SignIn.tsx";
import {Counter} from "./pages/samples/Counter.tsx";
import Home from "./pages/home/Home.tsx";
import {ReactHookForm} from "./pages/samples/ReactHookForm.tsx";
import {ImageUpload} from "./pages/samples/ImageUpload.tsx";
import {Samples} from "./pages/samples/Samples.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/samples" element={<Samples />}>
          <Route path="/samples/mui-sample" element={<MuiSample />} /> {/* MUI sample */}
          <Route path="/samples/counter" element={<Counter />} /> {/* MUI sample */}
          <Route path="/samples/react-hook-form" element={<ReactHookForm />} /> {/* MUI sample */}
          <Route path="/samples/image-upload" element={<ImageUpload />} /> {/* MUI sample */}
        </Route>
      </Routes>
    </>
  )
}

export default App
