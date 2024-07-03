"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { FaStar } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
function Content({ className }) {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setProducts(response.data);
  };
  console.log(products);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <section className={className + " lg:px-5"}>
      <Breadcrumb pageName={"products"} />
      <p>
        Poco M-3 Showing results {products.length} of {products.length}
      </p>

      <ul className="flex gap-x-3 text-xs mt-3">
        <li className="cursor-pointer">Sort By</li>
        <li className="cursor-pointer">Popularity</li>
        <li className="cursor-pointer">Price Low to High</li>
        <li className="cursor-pointer">Newest First</li>
      </ul>

      {/* Products */}
      <div className="my-8 flex flex-col gap-y-5">
        {products.map((product) => (
          <div
            className="grid grid-cols-10 border-t boder-b border-stroke p-4"
            key={product.id}
          >
            <Image
              className="col-span-2 aspect-square h-auto"
              src={product.image}
              width={200}
              height={80}
              alt={product.title}
            />
            <div className="col-span-5 text-sm flex flex-col ">
              <p>{product.title}</p>
              <p className="flex gap-x-2 justify-start items-center pt-2">
                {product.rating.rate}
                <FaStar color="green" /> From {product.rating.count} reviews
              </p>
              <p className="text-xs pt-2">{product.description}</p>
            </div>
            <div className="col-span-3 text-sm flex flex-col gap-y-3 justify-center items-center">
              <p>Price: Search for: ₹ {product.price}</p>
              <p>Category: {product.category}</p>
              <button className="bg-orange-600 w-1/2 py-2 flex justify-center items-center gap-x-2 text-white focus:outline-none active:scale-95 transition-transform duration-150">
                Add to Cart <BsCart2 color="white" fontSize="large" />
              </button>
              <button className="bg-orange-600 w-1/2 py-2 flex justify-center items-center gap-x-2 text-white focus:outline-none active:scale-95 transition-transform duration-150">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Content;
