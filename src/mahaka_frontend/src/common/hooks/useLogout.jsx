import { useDispatch } from "react-redux";
// import { logout } from "../../redux/reducers/auth/authReducer";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const logoutAndRedirect = () => {
  //   dispatch(NFIDLogout());
  //   navigate("/");
  // };

  // return logoutAndRedirect;
};
