import { Baumans } from "next/font/google";
import { Abhaya_Libre } from "next/font/google";
import { Alegreya_Sans } from "next/font/google";
import Link from "next/link";

const baumans = Baumans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const AbhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const AlegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

function Footer() {
  return (
    <>
      {/* footer-wrapper */}
      <div className="bg-gray-700 text-white  flex flex-col lg:flex-row lg:items-center justify-evenly p-5 lg:py-14 lg:px-5 gap-y-3">
        {/* footer-section */}
        <div
          className={`${baumans.className} text-xl flex flex-col gap-y-3 mb-5 lg:mb-0`}
        >
          {/* footer-subscribe */}
          <h2 className="text-2xl">Join Us & Get Updates</h2>
          <input
            type="email"
            placeholder="Email Address"
            className="px-3 py-1 rounded"
          />
          <button
            type="button"
            className=" px-2 py-2 btn-primary text-white rounded hover:bg-orange-600 text-sm"
          >
            Subscribe
          </button>
        </div>

        <div className="">
          <h3 className={`${baumans.className} text-xl`}>Get to Know Us</h3>
          <ul className={`${AlegreyaSans.className} lg:mt-3 `}>
            <li className="hover:cursor-pointer hover:underline">
              <Link href="/about">About us</Link>
            </li>
            <li className="hover:cursor-pointer hover:underline">
              <Link href="/contact">Contact us</Link>
            </li>
            <li className="hover:cursor-pointer hover:underline">
              <Link href="/">How to Shop</Link>
            </li>
            <li className="hover:cursor-pointer hover:underline">
              <Link href="/">News & Blogs</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className={`${baumans.className} text-xl`}>Help</h3>
          <ul className={`${AlegreyaSans.className} lg:mt-3 `}>
            <li className="hover:cursor-pointer hover:underline">
              Shipping & Delivery
            </li>
            <li className="hover:cursor-pointer hover:underline">
              Cancellation & Returns
            </li>
            <li className="hover:cursor-pointer hover:underline">Payment</li>
            <li className="hover:cursor-pointer hover:underline">
              Track Order
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className={`${baumans.className} text-xl`}>Contact</h3>
          <ul className={`${AlegreyaSans.className} lg:mt-3 `}>
            <li className="hover:cursor-pointer hover:underline">
              +91 5566223344
            </li>
            <li className="hover:cursor-pointer hover:underline">
              mailUs@company.com
            </li>
            <li className="hover:cursor-pointer hover:underline">
              154 Jain Villa,
              <br /> Ghaziabad 201204
            </li>
          </ul>
        </div>
        {/* footer-bottom */}
        <div className={`${baumans.className}  `}>
          <p>
            &copy; 2024 Apna Bazar,
            <br /> All Rights Reserved
          </p>
          <ul className={`${AlegreyaSans.className} lg:mt-3 `}>
            <li className="hover:cursor-pointer hover:underline">
              Privacy Policy
            </li>
            <li className="hover:cursor-pointer hover:underline">
              Terms of Service
            </li>
            <li className="hover:cursor-pointer hover:underline">
              Shipping Policy
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
