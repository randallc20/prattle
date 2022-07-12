import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Header from './components/Header';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Header />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/" element={<Hero />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/SignUp" element={<Header />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/SignUp" element={<SignUp />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/home" element={<Home />}></Route>
      </Routes>
      {/* <Routes>
        <Route exact path="/channel:id" element={<Home />}></Route>
      </Routes> */}
    </BrowserRouter>
  );
}
export default App;
