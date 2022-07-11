import React from 'react';

function SignUp() {
  return (
    <div className="flex w-full h-screen">
      {/* this is the ball */}
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-blue-700 rounded-full animate-bounce"></div>
      </div>
      <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
        <h1 className="text-5xl font-semibold">Welcome to Prattle!</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">
          Your friends and foes await you!
        </p>
        <div className="mt-8">
          <div className="flex flex-col">
            <label className="text-lg font-medium">Email</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your email..."
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">Password</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your password..."
              type={'password'}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">First and Last Name</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your full name..."
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">Screen Name</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your screen name..."
            />
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
