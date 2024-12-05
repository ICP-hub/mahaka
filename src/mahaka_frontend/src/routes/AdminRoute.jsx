import { Navigate } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminDashboard from "../admin/pages/Dashboard";
import EventManager from "../admin/pages/EventManager";
import MemberManager from "../admin/pages/MemberManager";
import VenueManger from "../admin/pages/VenueManager";
import VenueDetailPage from "../admin/pages/VenueDetail";
import Sales from "../admin/pages/Sales";
import TicketPurchase from "../admin/pages/TicketPurchase";
import AdminWahana from "../admin/pages/Wahana";
import AdminBanner from "../admin/pages/Banner";
import AdminTestimonial from "../admin/pages/AdminTestimonial";
import EventDetailPage from "../admin/pages/EventDetail";
import WahanaDetailPage from "../admin/pages/WahanaDetail";

/* Admin routes */
export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // Redirect to dashboard component
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "events", element: <EventManager /> },
      {
        path: "events/event/:venueId/:id",
        element: <EventDetailPage />,
      },
      { path: "venues", element: <VenueManger /> },
      {
        path: "venues/venue/:title/:id",
        element: <VenueDetailPage />,
      },
      { path: "members", element: <MemberManager /> },
      { path: "sales", element: <Sales /> },
      { path: "purchaseTicket", element: <TicketPurchase /> },
      { path: "wahana", element: <AdminWahana /> },
      {
        path: "wahana/:venueId/:id",
        element: <WahanaDetailPage />,
      },
      { path: "banner", element: <AdminBanner /> },
      { path: "testimonial", element: <AdminTestimonial /> },
    ],
  },
];
