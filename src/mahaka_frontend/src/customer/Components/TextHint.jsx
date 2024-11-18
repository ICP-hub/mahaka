import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { HiOutlineInformationCircle } from "react-icons/hi";

const TextHint = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="text-xs cursor-pointer relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      <div>
        <HiOutlineInformationCircle size={16} />
      </div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute min-w-20 text-start p-2 bg-card shadow-[rgba(0,_0,_0,_0.30)_0px_5px_15px] rounded-md -right-1/2 -left-1/2"
        >
          {text}
        </motion.div>
      )}
    </div>
  );
};

TextHint.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextHint;
