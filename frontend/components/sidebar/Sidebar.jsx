import React from "react";
import Link from "next/link";

function Sidebar() {
  return (
    <>
      <div className="sidebar w-64 bg-cyan-200 h-screen fixed top-0 left-0 shadow-md">
        <div className="sidebar-header py-4 px-6 border-b border-gray-200">
          <h5 className="text-lg font-bold text-gray-800">Categories</h5>
        </div>
        <ul className="sidebar-menu py-4">
          <li className="py-2 px-6 hover:bg-gray-100">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fas fa-tshirt mr-2"></i>
              Clothing
            </Link>
          </li>
          <li className="py-2 px-6 hover:bg-gray-100">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fas fa-shoe mr-2"></i>
              Shoes
            </Link>
          </li>
          <li className="py-2 px-6 hover:bg-gray-100">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fas fa-bag mr-2"></i>
              Bags
            </Link>
          </li>
          <li className="py-2 px-6 hover:bg-gray-100">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fas fa-watch mr-2"></i>
              Watches
            </Link>
          </li>
          <li className="py-2 px-6 hover:bg-gray-100">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fas fa-sports mr-2"></i>
              Sports
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
