import { motion } from "framer-motion";
import { useState } from "react";
import { fadeIn, rotate } from "./common/AnimationVariants";

const Testing = () => {
  const [animation, setAnimation] = useState(null);
  return (
    <div className="text-lg">
      <h1 className="font-medium">Animation Variants</h1>
      <div className="flex flex-col p-6">
        <div className="flex flex-col gap-y-8">
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-success"
              onClick={() => setAnimation(fadeIn("down", 0.5, 0))}
            >
              FadeInLeft
            </button>
            <button className="px-4 py-2 bg-success">FadeInRight</button>
            <button className="px-4 py-2 bg-success">RotateLeft</button>
            <button className="px-4 py-2 bg-success">RotateRight</button>
          </div>
          <span className="flex w-full items-center justify-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={animation}
              className="h-10 w-10 bg-sky-500"
            ></motion.div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Testing;
