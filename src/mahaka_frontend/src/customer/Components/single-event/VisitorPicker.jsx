import React, { useState } from "react";
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from "react-icons/hi2";

const VisitorPicker = ({
  numberOFVisitor = 1,
  setNumberOFVisitor,
  max = 1,
}) => {
  const increment = () => setNumberOFVisitor(numberOFVisitor + 1);
  const decrement = () =>
    setNumberOFVisitor(numberOFVisitor > 1 ? numberOFVisitor - 1 : 1);

  return (
    <div className="flex flex-col sm:flex-row w-full justify-between">
      <div className="mb-4 md:mb-0">
        <h4 className="font-bold text-lg mb-1">Select Number of Visitors</h4>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          className="p-2 border-secondary text-gray-700 rounded-lg border-2 border-gray-300 focus:outline-none focus:bg-secondary focus:text-white"
        >
          <HiOutlineMinusSmall size={20} />
        </button>
        <span className="px-6 py-2 text-lg border rounded-lg border-primary">
          {numberOFVisitor}
        </span>
        <button
          onClick={increment}
          disabled={numberOFVisitor == max}
          className="p-2 border-secondary text-gray-700 rounded-lg border-2 border-gray-300 focus:outline-none focus:bg-secondary focus:text-white"
        >
          <HiOutlinePlusSmall size={20} />
        </button>
      </div>
    </div>
  );
};

export default VisitorPicker;
