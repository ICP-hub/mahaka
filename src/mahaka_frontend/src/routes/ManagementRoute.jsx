import { Navigate } from "react-router-dom";
import ManagementLayout from "../management/layout/ManagementLayout";
import MgtUserList from "../management/pages/UserList";
import MgtVenueDetailPage from "../management/pages/VenueDetail";
import MgtDashBoard from "../management/pages/Dashboard";
import MgtVenueManger from "../management/pages/VenueManager";
import MgtUserActivity from "../management/pages/UserActivity";
import MgtWahana from "../management/pages/Wahana";
import MgtVoucher from "../management/pages/Voucher";

/* management routes */
export const managementRoutes = [
  {
    path: "/management",
    element: <ManagementLayout />,
    children: [
      // Redirect to dashboard component
      { index: true, element: <Navigate to="/management/wahana" /> },
      {
        path: "venues/venue/:title/:id",
        element: <MgtVenueDetailPage />,
      },
      { path: "dashboard", element: <MgtDashBoard /> },
      // { path: "users", element: <MgtUserList /> },
      { path: "venues", element: <MgtVenueManger /> },
      { path: "useractivity", element: <MgtUserActivity /> },
      { path: "wahana", element: <MgtWahana /> },
      { path: "voucher", element: <MgtVoucher /> },

    ],
  },
];
