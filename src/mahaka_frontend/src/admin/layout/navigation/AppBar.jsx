import { MdMenu } from "react-icons/md";
import ButtonWrapper from "../../../common/ButtonWrapper";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useState } from "react";

const AppBar = ({ toggleNavigation, selected, setSelected }) => {
  return (
    <div className="bg-appBar relative z-49 flex h-16 w-full flex-0 items-center px-4 shadow dark:border-b dark:bg-transparent dark:shadow-none md:px-6 border-border">
      <ButtonWrapper
        size={24}
        color="text-icon hover:text-secondary"
        actionOnButtonClick={() => toggleNavigation()}
      >
        <MdMenu />
      </ButtonWrapper>
      <SliderToggle selected={selected} setSelected={setSelected} />
    </div>
  );
};

const SliderToggle = ({ selected, setSelected }) => {
  return (
    <div className="relative flex w-fit items-center rounded-full ml-auto">
      <button
        className={`text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10 ${
          selected === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setSelected("light");
        }}
      >
        <FiSun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10 ${
          selected === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("dark");
        }}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default AppBar;
