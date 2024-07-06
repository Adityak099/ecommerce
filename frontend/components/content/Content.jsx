"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { FaStar } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import BASE_URL from "../../constants/constants";
import { setProducts as setStoreProducts } from "../../store/slice/productsSlice";
import { useDispatch, useSelector } from "react-redux";

function Content({ className }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const isProductsStored = useSelector((state) => state.products.products);
  const isExistingProducts = isProductsStored && isProductsStored.length > 0;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/product/get-all-product`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setProducts(res.data.data);
          dispatch(setStoreProducts(res.data.data));
          setIsFetched(true);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (!isExistingProducts && !isFetched) {
      fetchProducts();
    }
  }, [isExistingProducts, isFetched]);

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

      <div className="my-8 flex flex-col gap-y-5">
        {products.map((product) => (
          <div
            className="grid grid-cols-10 gap-x-4 border-t border-b border-stroke p-4"
            key={product.product_id}
          >
            <Image
              className="col-span-2 aspect-[4/3] object-center object-cover h-full w-full"
              src={product.image}
              width={200}
              height={80}
              alt={product.name}
            />
            <div className="col-span-5 text-sm flex flex-col">
              <p>{product.name}</p>
              <p className="flex gap-x-2 justify-start items-center pt-2">
                <FaStar color="green" /> From {product.reviews} reviews
              </p>
              <p className="text-xs pt-2">{product.description}</p>
            </div>
            <div className="col-span-3 text-sm flex flex-col gap-y-3 justify-center items-center">
              <p>Price: ₹ {product.price}</p>
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
