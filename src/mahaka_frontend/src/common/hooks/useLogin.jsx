import { useDispatch } from "react-redux";
import { plugLogin } from "../../redux/reducers/auth/authReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isPlugLogged");
    if (isLoggedIn) {
      dispatch(plugLogin());
    }
  }, [dispatch]);

  const loginWithPlug = () => {
    dispatch(plugLogin());
    navigate("/user-profile");
  };

  return { loginWithPlug };
};

export default useLogin;
