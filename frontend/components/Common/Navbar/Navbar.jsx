"use client"; // Add this line to mark the file as a client component

import React, { useState } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import { CgProfile } from "react-icons/cg";

import { menuItems } from "./data";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-gray-500 h-[100vh]">
        <nav className="flex justify-between items-center py-4 bg-green-200 shadow-md ">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-black hover:text-gray-600 ml-6"
            >
              Apna Bazar
            </Link>
            <ul className="flex items-center justify-end ml-20 gap-4">
              {menuItems.map((item, i) => {
                return (
                  <li className="mr-6" key={i}>
                    <Link
                      href={item.link}
                      className="text-black hover:text-gray-700"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="w-[50vw] flex items-center justify-between">
            <ul className="flex items-center justify-start">
              <li className="mr-9 ">
                <form className="flex items-center  ">
                  <input
                    type="search"
                    placeholder="Search for products, brand and more "
                    className="placeholder:italic block bg-white focus:outline-orange-500 w-[30vw] px-4 py-2  text-sm text-gray-800 rounded-l-xl "
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-700  text-white font-bold py-2 px-4 rounded-r-xl"
                  >
                    <FaSearch />
                  </button>
                </form>
              </li>
            </ul>
            <ul>
              <li className="mr-9 flex items-center justify-between gap-10 text-2xl ">
                <CgProfile className="" />
                <FaRegHeart />
                <FaCartShopping />
              </li>
              <li></li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;

{
  /* <li className="mr-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fas fa-search"></i>
              </Link>
            </li>
            <li className="mr-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fas fa-heart"></i>
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li> */
}
