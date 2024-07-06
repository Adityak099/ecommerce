"use client";
import { useSelector } from "react-redux";
import Item from "../../../components/Products/Cart/Item";
import { FaTags } from "react-icons/fa6";
import Link from "next/link";
function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <main className="container mx-auto lg:gap-x-4 lg:px-20 pt-5 lg:grid grid-cols-6  justify-between  w-full h-full ">
      <section className="col-span-4 flex flex-col gap-y-3">
        <div className="py-5 flex lg:flex-row flex-col gap-y-3 justify-between items-center outline outline-1 outline-[#e0e0e0] px-3">
          <div className="flex flex-col flex-wrap">
            <p className="flex flex-col lg:flex-row text-start">
              Deliver to : <span> Abhishek kr Jha, 201204</span>
            </p>
            <p>Jain Villa, Akash vihar,Modinagar</p>
          </div>
          <button type="button" className="outline outline-1 outline-[#e0e0e0] rounded-sm px-3 py-2 text-xs">
            Change Address
          </button>
        </div>
        <div className="py-5 outline outline-1 outline-[#e0e0e0]  px-3">
          <span>Available Offers</span>
          <p className="text-sm">
            10% discount upto $90 on Kotak Mahindra Bank Cards on min spend of
            $100 TCA
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center gap-y-3 outline outline-1 outline-[#e0e0e0] py-5 px-3">
          <div className="flex gap-x-5">
            <input type="checkbox" name="itemsselected" id="itemsselected" />
            <label htmlFor="itemsselected">1/1 ITEMS SELECTED</label>
          </div>
          <div className="flex gap-x-5">
            <span>Remove</span>
            <span> Move to wishlist</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-2 pb-3">
          <Item cart={cart} />
        </div>
        {/* <div className="">4</div> */}
      </section>
      <section className="col-span-2">
        <div className="outline outline-1 outline-[#e0e0e0] py-5 lg:px-5 px-3">
          <span className="text-black font-semibold">COUPONS</span>
          <div className="">
            <span className="flex justify-between items-center pt-3">
              <span className="flex gap-x-3 items-center border-b border-b-[1px]">
                <FaTags />
                <p>Apply Coupon</p>
              </span>
              <button
                type="button"
                className="outline outline-1 outline-[#e0e0e0] rounded-sm px-3 py-1 text-xs "
              >
                Apply
              </button>
            </span>
            <p className="text-xs pt-3 font-semibold">
              SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
            </p>
            <div className="py-3 flex gap-x-5 items-center">
              <input
                type="checkbox"
                name="donate"
                id="donate"
                className="w-4 h-4"
              />
              <label htmlFor="donate">Donate and Make a Difference</label>
            </div>
            <div className="flex justify-evenly items-center gap-x-3">
              <button className="py-2 px-3 rounded-full bg-[#e0e0e0]">
                ₹ 10
              </button>
              <button className="py-2 px-3 rounded-full bg-[#e0e0e0]">
                ₹ 10
              </button>
              <button className="py-2 px-3 rounded-full bg-[#e0e0e0]">
                ₹ 10
              </button>
            </div>
            <button
              type="button"
              className="my-3 p-2 outline-1 outline outline-[#e0e0e0]"
            >
              Know More
            </button>
            <div>
              <p>Price Details {cart.length}</p>
              <p className="flex justify-between">
                Total Mrp: <span>₹ {cart.length * 100}</span>
              </p>
              <p className="flex justify-between">
                Coupon Discount <Link href={"/"}>Apply Coupon</Link>
              </p>
              <p className="flex justify-between">
                Platform Fee <span>₹ 5</span>
              </p>
              <p className="flex justify-between">
                Shipping Fee <span>₹ 40</span>
              </p>
            </div>
            <div className="border-t-[1px] mt-5 border-[#e0e0e0] py-4 flex flex-col gap-y-3">
              <h3 className="flex justify-between">
                Total Amount <span>₹ 500</span>
              </h3>
              <button
                type="button"
                className="btn-primary p-2 w-full focus:outline-none active:scale-95 transition-transform duration-150"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;
