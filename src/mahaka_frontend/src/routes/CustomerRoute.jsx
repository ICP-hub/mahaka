import Master from "../customer/Layout/Master";
import Home from "../customer/Pages/Home";
import PaymentComponent from "../customer/Pages/Payment";
import SingleEvent from "../customer/Pages/SingleEvent";

export const customerRouting = [
  {
    path: "/",
    element: <Master />,
    children: [
      { index: true, element: <Home /> },
      { path: "single-event", element: <SingleEvent /> },
      { path: "payment", element: <PaymentComponent /> },
    ],
  },
];
