"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { menuItems } from "./data";
import { useSelector } from "react-redux";
import DropdownUser from "./DropdownUser";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <main className="header mx-auto max-w-7x" id="">
        <header className="flex w-full h-20 justify-between lg:px-14">
          <ul className="flex gap-x-5  items-center">
            <li className="text-3xl pr-5">
              <Link href="/">ApnaBazar</Link>
            </li>
            {menuItems.map((item, i) => {
              return (
                <li key={i}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Search for products, brand and more "
              className="placeholder:italic block bg-white outline outline-2 outline-orange-500 w-[18vw] px-4 py-3  text-sm text-gray-800 rounded-l-xl "
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700  text-white font-bold py-3.5 px-4 rounded-r-xl"
            >
              <FaSearch />
            </button>
          </div>
          <ul className="flex justify-center items-center gap-x-5">
            <li className="">
              {user ? (
                <DropdownUser user={user} />
              ) : (
                <Link href="/auth/login">
                  <CgProfile className="text-2xl" />
                </Link>
              )}
            </li>
            <li>
              <FaRegHeart className="text-2xl cursor-pointer" />
            </li>
            <li>
              <Link href="/cart" className="flex">
                <FaCartShopping className="text-2xl cursor-pointer z-10" />
                {cart.length > 0 && user !== null ? (
                  <span className="absolute top-3 right-[3.45rem] bg-[#f97316] rounded-full h-5 flex justify-center items-center w-5 text-sm">
                    {cart.length}
                  </span>
                ) : null}
              </Link>
            </li>
          </ul>
        </header>
      </main>
    </>
  );
}

export default Navbar;
