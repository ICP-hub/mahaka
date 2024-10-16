import { Navigate } from "react-router-dom";
import ManagementLayout from "../management/layout/ManagementLayout";
import ManagementDashboard from "../management/pages/Dashboard";
import MemberManager from "../management/pages/MemberManager";
import UserActivity from "../management/pages/UserActivity";
import VenueManager from "../management/pages/VenueManager";

/* management routes */
export const managementRoutes = [
  {
    path: "/management",
    element: <ManagementLayout />,
    children: [
      // Redirect to dashboard component
      { index: true, element: <Navigate to="/management/dashboard" /> },
      { path: "dashboard", element: <ManagementDashboard /> },
    //   { path: "events", element: <EventManager /> },
    //   { path: "venues", element: <VenueManger /> },
    //   {
    //     path: "venues/venue/:title/:id",
    //     element: <VenueDetailPage />,
    //   },
      { path: "members", element: <MemberManager /> },
      // { path: "sales", element: <Sales /> },
      { path: "venues", element: <VenueManager /> },
      { path: "useractivity", element: <UserActivity /> },


    ],
  },
];
