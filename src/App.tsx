import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
