import React from 'react';
import payimg from  '../../assets/images/payment.png'
const PaymentComponent = () => {
  return (
    <div className="w-full max-h-screen bg-white m-auto">
      <div className="max-w-7xl w-full  mx-auto   rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <div className="order-2 md:order-1 bg-white p-16 ">
          <h2 className="text-3xl font-black ">Payment</h2>
          <hr className="my-3 text-[#ACACAC]" />
          <div className="py-4">
            <label className="block text-2xl font-black text-[#0A0D13]">Pay With:</label>
            <div className="flex items-center mt-2">
              <input type="radio" id="card" name="payment" className="mr-2" defaultChecked />
              <label htmlFor="card" className="mr-4 text-lg font-black ">Card</label>
              <input type="radio" id="icp" name="payment" className="mr-2" />
              <label htmlFor="icp" className='text-lg font-normal'>ICP Wallet</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-black text-[#0A0D13]">Card Number</label>
            <input
              type="text"
              className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC] rounded-md"
              placeholder="1234 5678 9101 1121"
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-black text-[#0A0D13]">Expiration Date</label>
              <input
                type="text"
                className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC]  rounded-md"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-lg font-black text-[#0A0D13]">CVV</label>
              <input
                type="text"
                className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC]  rounded-md"
                placeholder="***"
              />
            </div>
          </div>
          <div className="mb-5">
            <input type="checkbox" id="saveCard" className="mr-2 " />
            <label htmlFor="saveCard">Save card details</label>
          </div>
          <button className="w-full bg-orange-500 text-white py-2 rounded-md">Process Payment</button>
          <p className="text-[#ACACAC] text-base font-normal mt-5">
            Lorem ipsum dolor sit amet consectetur. Malesuada sed senectus id tincidunt amet scelerisque
            diamam velit blandit. Bibendum fusce sed enim cursus sed in in. Quis malesuada mattis.
          </p>
        </div>
        <div className="order-1 md:order-2 bg-[#F9FAFA] p-16">
          <h2 className="text-3xl font-black ">Order Summary</h2>
          <hr className="my-3 text-[#ACACAC]" />
          <div className="flex items-center mb-8 mt-8 w-full ">
            <img src={payimg} alt="Ticket" className="w-12 h-12 object-cover rounded-md mr-4" />
            <div>
              <h3 className="text-2xl font-black">Ticket Name</h3>
              <p className="text-base font-normal text-[#ACACAC]">Premium</p>
            </div>
            <div className="ml-auto">
              <p className="text-2xl font-black">Rp. 49.80</p>
              <p className="text-base font-normal text-[#ACACAC]">Qty: 2</p>
            </div>
          </div>
          <hr className="my-4 text-[#ACACAC]" />
          <div className="flex justify-between ">
            <span className="text-lg font-normal text-[#0A0D13]">Subtotal</span>
            <span className="text-lg font-black text-[#0A0D13]">Rp. 49.80</span>
          </div>
          <hr className="my-4 text-[#ACACAC]" />
          <div className="flex justify-between font-bold text-xl">
            <span className='text-lg font-normal text-[#0A0D13]'>Total</span>
            <span className='text-3xl font-black text-[#0A0D13]'>Rp. 49.80</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
