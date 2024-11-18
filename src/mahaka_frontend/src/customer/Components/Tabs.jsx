import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const Tabs = ({ tabs, selected, setSelected }) => {
  return (
    <div className="flex items-center flex-wrap">
      {tabs.map(({ tab, link }) => (
        <Chip
          text={tab}
          selected={selected === link}
          setSelected={setSelected}
          key={tab}
          link={link}
        />
      ))}
    </div>
  );
};

const Chip = ({ text, selected, setSelected, link }) => {
  console.log(selected);
  return (
    <Link
      to={link}
      onClick={() => setSelected(link)}
      className={`${"text-primary hover:text-slate-600"} font-bold md:text-xl transition-colors px-2.5 py-4 border-primary relative border-b-2 min-w-40 max-w-min flex items-center justify-center`}
    >
      <div className="relative z-10">{text}</div>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 border-b-4 border-primary"
        ></motion.span>
      )}
    </Link>
  );
};

export default Tabs;
