import Master from "../customer/Layout/Master";
import Home from "../customer/Pages/Home";
import PaymentComponent from "../customer/Pages/Payment";
import SingleEvent from "../customer/Pages/SingleEvent";
import UserProfile from "../customer/Pages/UserProfile";

export const customerRouting = [
  {
    path: "/",
    element: <Master />,
    children: [
      { index: true, element: <Home /> },
      { path: "venues/:id", element: <SingleEvent /> },
      { path: "payment", element: <PaymentComponent /> },
      { path: "user-profile", element: <UserProfile /> },
    ],
  },
];
