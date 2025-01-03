import { Navigate } from "react-router-dom";
import ManagementLayout from "../management/layout/ManagementLayout";
import MgtUserList from "../management/pages/UserList";
import MgtVenueDetailPage from "../management/pages/VenueDetail";
import MgtDashBoard from "../management/pages/Dashboard";
import MgtVenueManger from "../management/pages/VenueManager";
import MgtUserActivity from "../management/pages/UserActivity";
import MgtWahana from "../management/pages/Wahana";
import MgtVoucher from "../management/pages/Voucher";
import MgtTicket from "../management/pages/Ticket";
import MgtEvent from "../management/pages/Event";
import MgtWahanaDetail from "../management/pages/MgtWahanaDetail";
import MgtEventDetail from "../management/pages/MgtEventDetail";

/* management routes */
export const managementRoutes = [
  {
    path: "/management",
    element: <ManagementLayout />,
    children: [
      // Redirect to dashboard component
      { index: true, element: <Navigate to="/management/events" /> },
      {
        path: "venues/venue/:title/:id",
        element: <MgtVenueDetailPage />,
      },
      { path: "dashboard", element: <MgtDashBoard /> },
      // { path: "users", element: <MgtUserList /> },
      { path: "venues", element: <MgtVenueManger /> },
      { path: "useractivity", element: <MgtUserActivity /> },
      { path: "wahana", element: <MgtWahana /> },
      {
        path: "wahana/:venueId/:id",
        element: <MgtWahanaDetail />,
      },
      { path: "voucher", element: <MgtVoucher /> },
      { path: "ticket", element: <MgtTicket /> },
      { path: "events", element: <MgtEvent /> },
      {
        path: "events/event/:venueId/:id",
        element: <MgtEventDetail />,
      },
    ],
  },
];
