import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import React, { useState, useEffect } from "react";

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
  const [response, setResponse] = useState(null);
  // const [user, setUser] = useState({});

  // let navigate = useNavigate();

  // useEffect(() => {
  //   fetch(`http://localhost:9292/users/${response.user_id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("in the fetch");
  //       setUser(data);
  //       navigate("/home");
  //     })
  //     .catch((error) => window.alert(error));
  // }, [response]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Header />}></Route>
      </Routes>
      <Routes>
        <Route
          exact
          path="/"
          element={<Hero response={response} setResponse={setResponse} />}
        ></Route>
      </Routes>
      <Routes>
        <Route exact path="/SignUp" element={<Header />}></Route>
      </Routes>
      <Routes>
        <Route
          exact
          path="/SignUp"
          element={<SignUp setResponse={setResponse} />}
        ></Route>
      </Routes>
      <Routes>
        <Route
          exact
          path="/home"
          element={<Home response={response} />}
        ></Route>
      </Routes>
      {/* <Routes>
        <Route exact path="/channel:id" element={<Home />}></Route>
      </Routes> */}
    </BrowserRouter>
  );
}
export default App;
