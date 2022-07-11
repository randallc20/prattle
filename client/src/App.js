import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Header />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/" element={<Hero />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
