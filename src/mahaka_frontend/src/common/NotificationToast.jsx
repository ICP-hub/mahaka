import React, { useEffect, useState } from "react";
import { FiInfo, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import notificationManager from "./utils/notificationManager";

const animVar = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -50,
  },
};

const NotificationToast = () => {
  const [notifications, setNotifications] = useState(
    notificationManager.getNotifications()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications([...notificationManager.getNotifications()]);
    }, 0);

    return () => clearInterval(interval);
  }, []);

  const removeNotif = (id) => {
    notificationManager.removeNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AnimatePresence>
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
          variants={animVar}
          className={`p-4 w-80 flex items-start rounded-lg gap-2 text-sm font-medium shadow-lg text-white ${
            notification.type === "error"
              ? "bg-red-600"
              : notification.type === "warning"
              ? "bg-yellow-600"
              : "bg-violet-600"
          } fixed z-999 bottom-4 right-4`}
        >
          <span className="absolute -top-3 -left-3 p-2 rounded-full bg-white">
            <FiInfo size={16} className="text-text" />
          </span>

          <div className="flex font-semibold items-center w-full">
            <span>{notification.message}</span>
            <button
              className="ml-auto"
              onClick={() => removeNotif(notification.id)}
            >
              <FiX size={16} />
            </button>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default NotificationToast;
