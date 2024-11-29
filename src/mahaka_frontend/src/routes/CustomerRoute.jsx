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
import EventPage from "../customer/Pages/EventPage";
import WahanaPage from "../customer/Pages/WahanaPage";
import { element } from "prop-types";
import UserProfileData from "../customer/Components/UserProfileComponents/UserProfileData";
import UserBookingData from "../customer/Components/UserProfileComponents/UserBookingData";
import { Navigate } from "react-router-dom";
import PaymentTest from "../customer/Pages/PaymentTest";
import CardCheckout from "../customer/Pages/CardCheckout";
import PaymentStatusUpdate from "../customer/Pages/PaymentStatusUpdate.jsx";
import EventPayment from "../customer/Pages/EventPayment.jsx";
import WahanaPayment from "../customer/Pages/WahanaPayment.jsx";

export const customerRoutes = [
  {
    path: "/",
    element: <Master />,
    children: [
      { index: true, element: <Home /> },
      { path: "venues/:id", element: <SingleEvent /> },
      { path: "venues/:id/:id/payment2", element: <PaymentTest /> },
      { path: "venues/:id/:id/payment2/checkout", element: <CardCheckout /> },
      { path: "payment/checkout", element: <CardCheckout /> },
      { path: "/stripe/:id/:id", element: <PaymentStatusUpdate /> },
      { path: ":ids/events/:eventId", element: <EventPage /> },
      {
        path: ":ids/events/:eventId/:ticketype/payment",
        element: <EventPayment />,
      },
      { path: ":ids/wahanas/:eventId", element: <WahanaPage /> },
      { path: ":ids/wahanas/:eventId/payment", element: <WahanaPayment /> },
      { path: "payment", element: <PaymentComponent /> },
      // { path: "wahana-payment", element: <WahanaPayment /> },
      {
        path: "user",
        element: <UserProfile />,
        children: [
          { index: true, element: <Navigate to="/user/my-profile" /> },
          { path: "my-profile", element: <UserProfileData /> },
          { path: "my-booking", element: <UserBookingData /> },
        ],
      },
      { path: "about-us", element: <AboutMahaka /> },
      { path: "our-services", element: <ServicesMahaka /> },
      { path: "contact-us", element: <ContactMahaka /> },
      { path: "ticket", element: <Ticket /> },
      { path: "wahanas", element: <HeaderWahanas /> },
    ],
  },
];
