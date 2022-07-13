import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

// let ws;
// function establishWSConnection() {
//   ws = new WebSocket("ws://localhost:3001/");
// }

// if (ws !== null) {
//   ws.on("open", function open() {
//     ws.send("something");
//   });

//   ws.on("message", function message(data) {
//     console.log("received: %s", data);
//   });
// }

// establishWSConnection();
// function establishWSConnection() {
//   WebSocket = require("faye-websocket");
//   ws = new WebSocket.Client("ws://localhost:3001/");
// }

// if (ws !== null) {
//   ws.on("open", (e) => {
//     console.log("open");
//     ws.send("Hello, world!");
//   });

//   ws.on("message", (e) => {
//     console.log("message", e.data);
//   });

//   ws.on("close", (e) => {
//     console.log("close", e.code, e.reason);
//     ws = null;
//   });
// }

// establishWSConnection();

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
