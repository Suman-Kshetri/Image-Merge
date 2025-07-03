import { NavLink, Outlet, useLocation } from "react-router-dom";

const ToolLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 relative p-6">
      {/* Navbar in Top-Right */}
      <div className="absolute top-4 right-6 space-x-4">
        {location.pathname !== "/merge-image" && (
          <NavLink
            to="/merge-image"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go To Image Merger
          </NavLink>
        )}
        {location.pathname !== "/qr-generator" && (
          <NavLink
            to="/qr-generator"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Go To QR Generator
          </NavLink>
        )}
        <NavLink
          to="/"
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Home
        </NavLink>
      </div>

      {/* Subpage Content */}
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default ToolLayout;
