import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero({ setResponse, response }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    fetch("http://localhost:9292/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setResponse(data);
          navigate("/home");
        } else {
          alert("Please try again!");
        }
      })
      .catch((error) => window.alert(error));
  }

  return (
    <div className="flex w-full h-screen">
      {/* this is the ball */}
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-blue-700 rounded-full animate-bounce"></div>
      </div>
      <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
        <h1 className="text-5xl font-semibold">Welcome to Prattle!</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">
          Welcome back! Please enter you details.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-8">
            <div className="flex flex-col">
              <label className="text-lg font-medium">Username</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your username..."
                type="text"
                name="username"
                onChange={(e) => handleChange(e)}
                value={formData.username}
                autoFocus={true}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Password</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your password..."
                type="password"
                name="password"
                // onChange={handleChange}
                onChange={(e) => handleChange(e)}
                value={formData.password}
              />
            </div>
            <div className="mt-8 flex justify-between items-center">
              <button className="font-medium text-base text-violet-500">
                Forgot password
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg">
                Sign in
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Don't have an account?</p>
              <button
                onClick={() => {
                  navigate("/SignUp");
                }}
                className="ml-2 font-medium text-base text-violet-500"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
        {/* <div>
          {response.success ? (
            <h3>{navigate('/home')}</h3>
          ) : (
            <h3>You are not logged in yet.</h3>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Hero;
