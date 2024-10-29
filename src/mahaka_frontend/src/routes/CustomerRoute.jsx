import Master from "../customer/Layout/Master";
import AboutMahaka from "../customer/Pages/AboutMahaka";
import ContactMahaka from "../customer/Pages/ContactMahaka";
import Home from "../customer/Pages/Home";
import PaymentComponent from "../customer/Pages/Payment";
import ServicesMahaka from "../customer/Pages/ServicesMahaka";
import SingleEvent from "../customer/Pages/SingleEvent";
import UserProfile from "../customer/Pages/UserProfile";
import Ticket from "../customer/Pages/Ticket";
import HeaderWahanas from "../customer/Pages/HeaderWahanas";

export const customerRoutes = [
  {
    path: "/",
    element: <Master />,
    children: [
      { index: true, element: <Home /> },
      { path: "venues/:id", element: <SingleEvent /> },
      { path: "payment", element: <PaymentComponent /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "about-us", element: <AboutMahaka /> },
      { path: "our-services", element: <ServicesMahaka /> },
      { path: "contact-us", element: <ContactMahaka /> },
      { path: "ticket", element: <Ticket /> },
      { path: "wahanas", element: <HeaderWahanas /> }
      
    ],
  },
];
