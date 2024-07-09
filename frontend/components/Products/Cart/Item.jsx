"use client";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} from "../../../store/slice/cartSlice";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
function Item({ cart, calculateTotal }) {
  const dispatch = useDispatch();
  return (
    <>
      {cart.map((item) => {
        return (
          <div
            className="relative lg:grid grid-cols-11 w-full outline outline-1 outline-[#e0e0e0]"
            key={item.product_id}
          >
            <div className="col-span-4 py-3  px-3 w-full">
              <Image
                src={item.image}
                width={300}
                height={218}
                alt="Item Image"
                className="object-cover object-center  w-full h-auto aspect-[4/3] max-h-[300px]"
              />
            </div>
            <div className="relative col-span-7 outline outline-1 outline-[#e0e0e0] py-5 lg:pl-5 px-3 flex flex-col gap-y-1">
              <h3 className="font-semibold text-base">{item.name}</h3>
              <p className="text-sm">{item.description}</p>
              <p className="text-sm">₹ {item.price}</p>
              <div className="flex gap-x-3 py-1 px-2 bg-gray-200 w-fit">
                <button
                  type="button"
                  className="shadow-xl shadow-gray-300 rounded-md p-1"
                  onClick={() => {
                    dispatch(decrementQuantity(item.product_id));
                    calculateTotal();
                  }}
                >
                  <FaMinus />
                </button>
                <p className="px-2 text-sm">{item.quantity}</p>
                <button
                  type="button"
                  className="shadow-xl shadow-gray-300 rounded-md p-1"
                  onClick={() => {
                    dispatch(incrementQuantity(item.product_id));
                    calculateTotal();
                  }}
                >
                  <FaPlus />
                </button>
              </div>
              <div>
                <p className="text-sm">14 days Return available</p>
                <p className="text-sm">Delivery by 14 Nov</p>
              </div>
            </div>
            <button
              type="button"
              className="absolute right-3 lg:top-2 top-60"
              onClick={() => dispatch(removeFromCart(item.product_id))}
            >
              <RxCross1 />
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Item;
