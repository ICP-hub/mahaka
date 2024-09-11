import { MdEventNote, MdInsertChartOutlined, MdMap } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const MenuSection = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Analytics",
      icon: <MdInsertChartOutlined size={24} />,
    },
    // { path: "/admin/events", label: "Events", icon: <MdEventNote size={24} /> },
    { path: "/admin/venues", label: "Venues", icon: <MdMap size={24} /> },
  ];

  // Check active path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="mt-6">
      <div className="mx-3">
        <div className="relative flex items-center justify-start p-2.5 font-medium leading-5 no-underline rounded-md text-secondaryText">
          <div className="text-secondaryText">
            <div className="text-white text-md">DASHBOARDS</div>
            <div className="text-sm">Admin Role</div>
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