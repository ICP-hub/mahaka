const notifications = [];

const addNotification = (type, message) => {
  const id = Date.now();
  notifications.push({ id, type, message });

  setTimeout(() => {
    removeNotification(id);
  }, 5000);
};

const removeNotification = (id) => {
  const index = notifications.findIndex(
    (notification) => notification.id === id
  );
  if (index > -1) {
    notifications.splice(index, 1);
  }
};

export default {
  success: (message) => addNotification("success", message),
  error: (message) => addNotification("error", message),
  warning: (message) => addNotification("warning", message),
  getNotifications: () => notifications,
  removeNotification,
};
