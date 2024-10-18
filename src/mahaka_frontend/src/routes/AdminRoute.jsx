import { Navigate } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminDashboard from "../admin/pages/Dashboard";
import EventManager from "../admin/pages/EventManager";
import MemberManager from "../admin/pages/MemberManager";
import VenueManger from "../admin/pages/VenueManager";
import VenueDetailPage from "../admin/pages/VenueDetail";
import Sales from "../admin/pages/Sales";
// import TicketPurchase from "../admin/pages/TicketPurchase";

/* Admin routes */
export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // Redirect to dashboard component
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "dashboard", element: <AdminDashboard /> },
      // { path: "events", element: <EventManager /> },
      { path: "venues", element: <VenueManger /> },
      {
        path: "venues/venue/:title/:id",
        element: <VenueDetailPage />,
      },
      { path: "members", element: <MemberManager /> },
      { path: "sales", element: <Sales /> },
      // { path: "purchaseTicket", element: <TicketPurchase /> },


    ],
  },
];
