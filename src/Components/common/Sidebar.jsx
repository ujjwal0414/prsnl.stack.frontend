import { useState } from "react";
import { NavLink } from "react-router";
import { sideBarData } from "../../constants/sideBarData.jsx";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa6";

const Sidebar = ({ role = "admin" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState("");

  return (
    <aside
      className={`bg-[#ecf2ef] text-[#2d4347] h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-[20vw]"
      }`}
    >
      {/* Header */}
      <div className="h-[10vh] flex items-center justify-between px-4 border-b border-[#87bba2]">
        {!collapsed && <h1 className="font-semibold">Dashboard</h1>}

        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="p-2 h-[80vh]  space-y-1">
        {sideBarData
          .filter((item) => item.role.includes(role))
          .map((item) => {
            const hasChildren = item.children?.length;

            return (
              <div key={item.name}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenMenu((prev) =>
                          prev === item.name ? "" : item.name
                        )
                      }
                      className="w-full flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#cee5d6]"
                    >
                      <span className="text-xl">{item.icon}</span>

                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">
                            {item.name}
                          </span>

                          <FaChevronDown
                            className={`transition ${
                              openMenu === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>

                    {!collapsed && openMenu === item.name && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children
                          .filter((child) => child.role.includes(role))
                          .map((child) => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              className={({ isActive }) =>
                                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                                  isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-[#cee5d6]"
                                }`
                              }
                            >
                              {child.icon}
                              {child.name}
                            </NavLink>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 ${
                        isActive ? "bg-blue-600" : "hover:bg-[#cee5d6]"
                      }`
                    }
                  >
                    <span className="text-xl">{item.icon}</span>

                    {!collapsed && <span>{item.name}</span>}
                  </NavLink>
                )}
              </div>
            );
          })}
      </nav>
      <div className="">

      </div>
    </aside>
  );
};

export { Sidebar };