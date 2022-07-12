import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <>
      <Header />
      <CookiesProvider>
        <LogIn />
      </CookiesProvider>
    </>
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path="/" element={<Header />}></Route>
    //   </Routes>
    //   <Routes>
    //     <Route exact path="/" element={<Hero />}></Route>
    //   </Routes>
    //   <Routes>
    //     <Route exact path="/channels" element={<Home />}></Route>
    //   </Routes>
    //   <Routes>
    //     <Route exact path="/channels:id" element={<Home />}></Route>
    //   </Routes>
    // </BrowserRouter>
  );
}
export default App;
