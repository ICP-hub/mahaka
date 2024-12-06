import { HiOutlineStar, HiOutlineUserGroup } from "react-icons/hi2";
import {
  MdEventNote,
  MdInsertChartOutlined,
  MdMap,
  MdPerson,
  MdHistory,
  MdEvent,
} from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const MenuSection = () => {
  const location = useLocation();

  const { userRole } = useSelector((state) => state.users);

  const menuItems = [
    { path: "/management/venues", label: "Venues", icon: <MdMap size={24} /> },
    {
      path: "/management/wahana",
      label: "Wahana",
      icon: <HiOutlineStar size={24} />,
    },
    // { path: "/admin/events", label: "Events", icon: <MdEventNote size={24} /> },
    // { path: "/management/venues", label: "Venues", icon: <MdMap size={24} /> },
    // { path: "/management/voucher", label: "Voucher", icon: <MdMap size={24} /> },
    {
      path: "/management/events",
      label: "Events",
      icon: <MdEventNote size={24} />,
    },

    // {
    //   path: "/management/users",
    //   label: "users",
    //   icon: <HiOutlineUserGroup size={24} />,
    // },
    // { path: "/management/sales", label: "Sales", icon: <MdEqualizer size={24} /> },
    {
      path: "/management/useractivity",
      label: "Ticket History",
      icon: <MdHistory size={24} />,
    },
    {
      path: "/management/ticket",
      label: " Offline Ticket",
      icon: <IoTicketOutline size={26} />,
    },
  ];

  // Check active path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="mt-6">
      <div className="mx-3">
        <div className="relative flex items-center justify-start p-2.5 font-medium leading-5 no-underline rounded-md text-secondaryText">
          <div className="text-secondaryText">
            <div className="text-white text-md">DASHBOARD</div>
            <div className="text-sm capitalize">{userRole || "User role"}</div>
          </div>
        </div>
      </div>
      {menuItems.map(({ path, label, icon }) => (
        <div className="mx-3 mb-1" key={path}>
          <Link
            to={path}
            className={`relative flex items-center gap-2 justify-start p-2.5 font-medium leading-5 no-underline rounded-md ${
              isActive(path)
                ? "bg-hover text-white"
                : "text-secondaryText hover:bg-hover hover:text-white"
            }`}
          >
            {icon}
            {label}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MenuSection;
