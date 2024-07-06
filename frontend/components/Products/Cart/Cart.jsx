import React from "react";

function Cart() {
  return (
    <main className="container mx-auto pt-5 lg:grid grid-cols-6 justify-center w-full h-full ">
      <section className="col-span-3 flex flex-col">
        <div className="bg-red-200 py-5">
          Deliver to: Abhishek kr Jha, 201204
        </div>
        <div className="">
          <span>Available Offers</span>
          <p className="text-sm">
            10% discount upto $90 on Kotak Mahindra Bank Cards on min spend of
            $100 TCA
          </p>
        </div>
        <div className="flex justify-center items-center">
          <input type="checkbox" name="itemsselected" id="itemsselected" />
          <label htmlFor="itemsselected">1/1 ITEMS SELECTED</label>
          <span>Remove</span>
          <span> Move to wishlist</span>
        </div>
        <div className="">3</div>
        <div className="">4</div>
      </section>
      <section className="col-span-3">
        <div className="bg-teal-300 py-5">hello</div>
      </section>
    </main>
  );
}

export default Cart;
