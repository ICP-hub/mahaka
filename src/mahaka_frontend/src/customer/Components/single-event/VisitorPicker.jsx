import React, { useState } from "react";
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from "react-icons/hi2";

const VisitorPicker = () => {
  const [numberOfVisitors, setNumberOfVisitors] = useState(0);
  const pricePerVisitor = 500000;

  const totalPrice = numberOfVisitors * pricePerVisitor;

  const increment = () => setNumberOfVisitors(numberOfVisitors + 1);
  const decrement = () =>
    setNumberOfVisitors(numberOfVisitors > 0 ? numberOfVisitors - 1 : 0);

  return (
    <div className="flex flex-col sm:flex-row w-full justify-between">
      <div className="mb-4 md:mb-0">
        <h4 className="font-bold text-lg mb-1">Select Number of Visitors</h4>
        <p className="font-medium text-gray-700">
          Rp. {totalPrice.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          className="p-2 border-secondary text-gray-700 rounded-lg border-2 border-gray-300 focus:outline-none focus:bg-secondary focus:text-white"
        >
          <HiOutlineMinusSmall size={20} />
        </button>
        <span className="px-6 py-2 text-lg border rounded-lg border-primary">
          {numberOfVisitors}
        </span>
        <button
          onClick={increment}
          className="p-2 border-secondary text-gray-700 rounded-lg border-2 border-gray-300 focus:outline-none focus:bg-secondary focus:text-white"
        >
          <HiOutlinePlusSmall size={20} />
        </button>
      </div>
    </div>
  );
};

export default VisitorPicker;
