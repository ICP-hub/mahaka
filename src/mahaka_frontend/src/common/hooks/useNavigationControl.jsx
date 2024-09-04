import { useReducer, useEffect } from "react";

// Initial state
const initialNavigationState = {
  isOpen: window.innerWidth > 960,
  mode: "side", // 'over', 'side'
};

// Reducer function
const navigationReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_NAVIGATION":
      return {
        ...state,
        isOpen: action.payload !== undefined ? action.payload : !state.isOpen,
      };
    case "SET_NAVIGATION_MODE":
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
};

const useNavigationControl = () => {
  const [state, dispatch] = useReducer(
    navigationReducer,
    initialNavigationState
  );

  const toggleNavigation = (isOpen) => {
    dispatch({ type: "TOGGLE_NAVIGATION", payload: isOpen });
  };

  const setNavigationMode = (mode) => {
    dispatch({ type: "SET_NAVIGATION_MODE", payload: mode });
  };

  // Handle window resize to adjust navigation state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 960 && state.isOpen) {
        dispatch({ type: "TOGGLE_NAVIGATION", payload: false });
      }
      if (window.innerWidth > 960) {
        dispatch({ type: "TOGGLE_NAVIGATION", payload: true });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [state.isOpen]);

  return {
    state,
    toggleNavigation,
    setNavigationMode,
  };
};

export default useNavigationControl;
