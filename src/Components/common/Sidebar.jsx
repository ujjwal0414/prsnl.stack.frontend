import { useState } from "react";
import { NavLink } from "react-router";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaXmark,
} from "react-icons/fa6";
import { sideBarData } from "../../constants/sideBarData";

const Sidebar = ({
  role = "admin",
  mobileOpen,
  setMobileOpen,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState("");

  const closeMobileSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-50 h-screen
          bg-[#ecf2ef] text-[#2d4347]
          shadow-lg lg:shadow-none
          transition-all duration-300

          ${collapsed ? "lg:w-16" : "lg:w-[20vw]"}
          w-72

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#d5e2d9]">
          {!collapsed && (
                      <p className=" text-2xl font-semibold">Tool<span className="text-[#55828b]">Box</span></p>

          )}

          <div className="flex items-center gap-2">
            {/* Desktop Collapse */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 rounded hover:bg-[#cee5d6]"
            >
              {collapsed ? (
                <FaChevronRight />
              ) : (
                <FaChevronLeft />
              )}
            </button>

            {/* Mobile Close */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-2 rounded hover:bg-[#cee5d6]"
            >
              <FaXmark />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-2 overflow-y-auto h-[calc(100vh-64px)] space-y-1">
          {sideBarData
            .filter((item) => item.role.includes(role))
            .map((item) => {
              const hasChildren = item.children?.length > 0;
              const isOpen = openMenu === item.name;

              if (hasChildren) {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() =>
                        setOpenMenu(isOpen ? "" : item.name)
                      }
                      className="w-full flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#cee5d6] transition"
                    >
                      <span className="text-xl shrink-0">
                        {item.icon}
                      </span>

                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">
                            {item.name}
                          </span>

                          <FaChevronDown
                            className={`transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>

                    {!collapsed && isOpen && (
                      <div className="ml-7 mt-1 space-y-1 border-l border-[#c8d8cd] pl-3">
                        {item.children
                          .filter((child) =>
                            child.role.includes(role)
                          )
                          .map((child) => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              onClick={closeMobileSidebar}
                              className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                                  isActive
                                    ? "bg-[#2d4347] text-white"
                                    : "hover:bg-[#cee5d6]"
                                }`
                              }
                            >
                              <span>{child.icon}</span>
                              <span>{child.name}</span>
                            </NavLink>
                          ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                      isActive
                        ? "bg-[#2d4347] text-white"
                        : "hover:bg-[#cee5d6]"
                    }`
                  }
                >
                  <span className="text-xl shrink-0">
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <span>{item.name}</span>
                  )}
                </NavLink>
              );
            })}
        </nav>
      </aside>
    </>
  );
};

export { Sidebar };