import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import useMeasure from "react-use-measure";

const ModalPopup = () => {
  const ModalOne = ({ open, setOpen, children }) => {
    const [scope, animate] = useAnimate();
    const [drawerRef, { height }] = useMeasure();

    const y = useMotionValue(0);
    const controls = useDragControls();

    const handleClose = async () => {
      animate(scope.current, {
        opacity: [1, 0],
      });

      const yStart = typeof y.get() === "number" ? y.get() : 0;

      await animate("#drawer", {
        y: [yStart, height],
      });

      setOpen(false);
    };

    return (
      <>
        {open && (
          <motion.div
            ref={scope}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-neutral-950/70"
          >
            <div className="border border-red-500 flex items-center justify-center w-full">
              <motion.div
                id="drawer"
                ref={drawerRef}
                onClick={(e) => e.stopPropagation()}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 h-[75vh] overflow-hidden rounded-t-3xl bg-white w-full"
                style={{ y }}
                drag="y"
                dragControls={controls}
                onDragEnd={() => {
                  if (y.get() >= 100) {
                    handleClose();
                  }
                }}
                dragListener={false}
                dragConstraints={{
                  top: 0,
                  bottom: 0,
                }}
                dragElastic={{
                  top: 0,
                  bottom: 0.5,
                }}
              >
                <div className="absolute left-0 right-0 top-0 z-10 flex justify-center p-4">
                  <button
                    onPointerDown={(e) => {
                      controls.start(e);
                    }}
                    className="h-2 w-14 cursor-grab touch-none rounded-full active:cursor-grabbing bg-secondary"
                  ></button>
                </div>
                <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12 no-scrollbar">
                  {children}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </>
    );
  };

  return { ModalOne };
};

export default ModalPopup;
