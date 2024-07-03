import React from "react";

function Sidebar({ className }) {
  // fetch('https://fakestoreapi.com/products')
  //           .then(res=>res.json())
  //           .then(json=>console.log(json))
  return <aside className={className + " bg-teal-400"}>Sidebar</aside>;
}

export default Sidebar;
