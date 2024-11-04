import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiFillQuestionCircle } from "react-icons/ai";
import { motion } from "framer-motion";

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
      className="texthint text-xs"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <AiFillQuestionCircle size={22} className="text-icons" />
      </div>
      {isHovered && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="texthinttext"
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