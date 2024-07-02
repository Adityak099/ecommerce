"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

// function Sidebar() {
//   return (
//     <>
//       <div className="sidebar w-64 bg-cyan-200 h-screen fixed top-0 left-0 shadow-md">
//         <div className="sidebar-header py-4 px-6 border-b border-gray-200">
//           <h5 className="text-lg font-bold text-gray-800">Categories</h5>
//         </div>
//         {/* <ul className="sidebar-menu py-4">
//           <li className="py-2 px-6 hover:bg-gray-100">
//             <Link href="#" className="text-gray-600 hover:text-gray-900">
//               <i className="fas fa-tshirt mr-2"></i>
//               Clothing
//             </Link>
//           </li>
//           <li className="py-2 px-6 hover:bg-gray-100">
//             <Link href="#" className="text-gray-600 hover:text-gray-900">
//               <i className="fas fa-shoe mr-2"></i>
//               Shoes
//             </Link>
//           </li>
//           <li className="py-2 px-6 hover:bg-gray-100">
//             <Link href="#" className="text-gray-600 hover:text-gray-900">
//               <i className="fas fa-bag mr-2"></i>
//               Bags
//             </Link>
//           </li>
//           <li className="py-2 px-6 hover:bg-gray-100">
//             <Link href="#" className="text-gray-600 hover:text-gray-900">
//               <i className="fas fa-watch mr-2"></i>
//               Watches
//             </Link>
//           </li>
//           <li className="py-2 px-6 hover:bg-gray-100">
//             <Link href="#" className="text-gray-600 hover:text-gray-900">
//               <i className="fas fa-sports mr-2"></i>
//               Sports
//             </Link>
//           </li>
//         </ul> */}

//       </div>
//     </>
//   );
// }

function Sidebar() {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const priceRanges = [
    { label: "Rs. 160 to Rs. 13870", value: "160-13870" },
    { label: "Rs. 13870 to Rs. 27580", value: "13870-27580" },
    { label: "Rs. 27580 to Rs. 41290", value: "27580-41290" },
    { label: "Rs. 41290 to Rs. 55000", value: "41290-55000" },
  ];

  const colors = [
    { label: "Black", value: "black" },
    { label: "Blue", value: "blue" },
    { label: "White", value: "white" },
    { label: "Navy Blue", value: "navyBlue" },
    { label: "Green", value: "green" },
    { label: "Grey", value: "grey" },
    { label: "Red", value: "red" },
    { label: "Yellow", value: "yellow" },
    { label: "Maroon", value: "maroon" },
    { label: "Olive", value: "olive" },
    { label: "Pink", value: "pink" },
    { label: "Beige", value: "beige" },
    { label: "Orange", value: "orange" },
    { label: "Brown", value: "brown" },
    { label: "Purple", value: "purple" },
  ];

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
  };

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  return (
    <>
      <div>
        {/* <Head>
        <title>Price and Color Filter</title>
      </Head> */}
        <div className="sidebar w-64 bg-cyan-200 h-screen fixed top-0 left-0 shadow-md">
          <div className="sidebar-header py-4 px-6 border-b border-gray-200">
            <h5 className="text-lg font-bold text-gray-800">Filters</h5>
          </div>
          <h2 className="font-semibold">PRICE</h2>
          <div>
            {priceRanges.map((range) => (
              <div key={range.value}>
                <input
                  type="checkbox"
                  id={range.value}
                  checked={selectedPrice === range.value}
                  onChange={() => handlePriceChange(range.value)}
                />
                <label htmlFor={range.value}>{range.label}</label>
              </div>
            ))}
          </div>

          <h2>COLOR</h2>
          <div>
            {colors.map((color) => (
              <div key={color.value}>
                <input
                  type="checkbox"
                  id={color.value}
                  checked={selectedColor === color.value}
                  onChange={() => handleColorChange(color.value)}
                />
                <label htmlFor={color.value}>{color.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
