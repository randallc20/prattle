import React, { useState } from 'react';

function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [response, setResponse] = useState({});
  const [userInfo, setUserInfo] = useState({});
  //   const [savedCookie, setSavedCookie] = useState({});
  //   const [cookies, setCookie, removeCookie] = useCookies([""]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    fetch('http://localhost:9292/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        // setCookie("x-access-token", data["x-access-token"]);
        // setSavedCookie({ cookie: data["x-access-token"] });
      })
      .catch((error) => window.alert(error));
  }
  console.log(response);
  function handleInfoClick(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/users/${response.user_id}`)
      .then((response) => response.json())
      .then((data) => setUserInfo(data))
      .catch((error) => window.alert(error));
  }

  return (
    <div>
      <form>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          type="text"
          name="username"
          onChange={(e) => handleChange(e)}
          value={formData.username}
        />
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <input type="submit" onClick={handleSubmit} />
      </form>
      <div>
        {response.success ? (
          <h3>You successfully logged in!</h3>
        ) : (
          <h3>You are not logged in yet.</h3>
        )}
      </div>
      <div>
        <button onClick={(e) => handleInfoClick(e)}>Get Info</button>
        <p>Username: {userInfo.username}</p>
        <p>ID: {userInfo.id}</p>
      </div>
    </div>
    // <div className="flex w-full h-screen">
    //   {/* this is the ball */}
    //   <div className="hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
    //     <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-blue-700 rounded-full animate-bounce"></div>
    //   </div>
    //   <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
    //     <h1 className="text-5xl font-semibold">Welcome to Prattle!</h1>
    //     <p className="font-medium text-lg text-gray-500 mt-4">
    //       Your friends and foes await you!
    //     </p>
    //     <div className="mt-8">
    //       <div className="flex flex-col">
    //         <label className="text-lg font-medium">Email</label>
    //         <input
    //           className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
    //           placeholder="Enter your email..."
    //         />
    //       </div>
    //       <div className="flex flex-col mt-4">
    //         <label className="text-lg font-medium">Password</label>
    //         <input
    //           className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
    //           placeholder="Enter your password..."
    //           type={"password"}
    //         />
    //       </div>
    //       <div className="flex flex-col mt-4">
    //         <label className="text-lg font-medium">First and Last Name</label>
    //         <input
    //           className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
    //           placeholder="Enter your full name..."
    //         />
    //       </div>
    //       <div className="flex flex-col mt-4">
    //         <label className="text-lg font-medium">Screen Name</label>
    //         <input
    //           className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
    //           placeholder="Enter your screen name..."
    //         />
    //       </div>
    //       <div className="mt-8 flex flex-col gap-y-4">
    //         <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg">
    //           Sign Up
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default LogIn;
