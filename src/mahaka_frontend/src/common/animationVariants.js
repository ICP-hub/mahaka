// Stagger animations :
export const createStaggerContainer = (staggerAmount = 0.5) => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: staggerAmount,
    },
  },
});

export const createStaggerVariant = (duration = 0.5) => ({
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration } },
});

// Fade in animation
export const fadeIn = (direction, duration = 0.3, delay = 0) => {
  return {
    initial: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: duration,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

// Rotate animation
export const rotate = (degree, duration = 0.3, delay = 0) => {
  return {
    initial: {
      rotate: 0,
    },
    animate: {
      rotate: degree,
      transition: {
        duration: duration,
        delay: delay,
        type: "tween",
      },
    },
  };
};
