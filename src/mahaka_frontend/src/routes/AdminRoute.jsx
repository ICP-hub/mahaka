import { Navigate } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminDashboard from "../admin/pages/Dashboard";
import EventManager from "../admin/pages/EventManager";
import VenueManger from "../admin/pages/VenueManager";
import VenueDetailPage from "../admin/pages/VenueDetail";

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
        path: "venues/venue/:id",
        element: <VenueDetailPage />,
      },
    ],
  },
];
