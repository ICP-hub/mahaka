import { useDispatch } from "react-redux";
import { plugLogin } from "../../redux/reducers/auth/authReducer";

const useLogin = () => {
  const dispatch = useDispatch();
  const loginWithPlug = () => {
    dispatch(plugLogin());
    // navigate("/user-profile");
  };

  return { loginWithPlug };
};

export default useLogin;
