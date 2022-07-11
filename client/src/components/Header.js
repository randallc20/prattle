import React from 'react';
import PrattleLogo from '../assets/PrattleLogo.png';
import { MenuIcon } from '@heroicons/react/outline';

function Header() {
  //need to set user authentication here to toggle the loging button
  const user = false;

  return (
    <header className="bg-discord_blue flex items-center justify-between py-4 px-6">
      <a href="/">
        <img src={PrattleLogo} className="w-32 h-12 object-contain" alt="" />
      </a>
      <div className="hidden lg:flex  space-x-6 ">
        <a className="link">Download</a>
        <a className="link">About</a>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
          // onClick={!user ? signIn : () => history.push('/channels')}
        >
          {/* {!user ? 'Login' : 'Open Discord'} */}
          login
        </button>
        <MenuIcon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
    </header>
  );
}

export default Header;
