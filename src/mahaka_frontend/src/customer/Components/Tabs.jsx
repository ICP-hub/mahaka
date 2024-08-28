import { motion } from "framer-motion";
import { useState } from "react";

const Tabs = ({ tabs, selected, setSelected }) => {
  return (
    <div className="flex items-center flex-wrap">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({ text, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${"text-primary hover:text-slate-600"} font-bold text-xl transition-colors px-2.5 py-4 border-primary relative border-b-2 min-w-40 max-w-min`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 border-b-4 border-primary"
        ></motion.span>
      )}
    </button>
  );
};

export default Tabs;
