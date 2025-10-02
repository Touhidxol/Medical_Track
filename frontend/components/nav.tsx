"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [menuVisible, setmenuVisible] = useState(false);
  if (menuVisible) {
    console.log("MenuisVisible");
  }

  return (
    <div className="fixed z-30 top-0 w-full p-6 md:px-10 flex items-center justify-between backdrop-blur-sm bg-white/5">
      {/* Logo */}
      <div>
        <Link href="#hero" className="cursor-pointer">
          {/* <Image
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-20 h-20 md:w-20 md:h-20"
            priority
          /> */}
          <h1 className="text-xl font-bold text-shadow-2xl text-shadow-white" >MediLogo</h1>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="cursor-pointer hidden md:flex space-x-10 items-center text-black text-center bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        <Link href="#about">
          <div className="hover:text-black">About</div>
        </Link>
        <Link href="/auth/register"><div className="hover:text-black">Register</div></Link>
        <Link href="/auth/login"><div className="hover:text-black">Login</div></Link>
        <Link href="/teams" className="hover:text-black">
          Teams
        </Link>
        <div className="hover:text-black">Sponsors</div>
        <div className="hover:text-black">FAQs</div>
      </div>

      {/* Mobile Menu Icon */}
      <div
        className="flex md:hidden"
        onClick={() => setmenuVisible(!menuVisible)}
      >
        <div className="relative w-8 h-8 flex flex-col gap-2 items-center cursor-pointer">
          <span
            className={`block h-1 w-9 bg-black/80 rounded transform transition duration-300 ease-in-out ${menuVisible ? "rotate-45 translate-y-3" : ""
              }`}
          />
          <span
            className={`block h-1 w-9 bg-black/80 rounded transition duration-300 ease-in-out ${menuVisible ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block h-1 w-9 bg-black/80 rounded transform transition duration-300 ease-in-out ${menuVisible ? "-rotate-45 -translate-y-3" : ""
              }`}
          />
        </div>
      </div>

      {
        menuVisible && (
          <div className="absolute top-20 left-0 w-full flex flex-col items-center space-y-6 py-6 bg-white/90 backdrop-blur-sm shadow-md md:hidden">
            <div className="hover:text-black">About</div>
            <Link href="/auth/register"><div className="hover:text-black">Register</div></Link>
            <Link href="/auth/login"><div className="hover:text-black">Login</div></Link>
            <Link href="/teams" className="hover:text-black">
              Teams
            </Link>
            <div className="hover:text-black">Sponsors</div>
            <div className="hover:text-black">FAQs</div>
          </div>
        )
      }

    </div >
  );
};

export default Navbar;
