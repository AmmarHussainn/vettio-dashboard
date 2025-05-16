// src/components/Layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#252a31] text-white h-screen fixed left-0 top-0 p-4">
      <div className="flex items-center space-x-2 mb-8 p-2">
        <div className="w-8 h-8 bg-[#faa61b] rounded-full"></div>
        <h1 className="text-xl font-bold">Kai Dashboard</h1>
      </div>
      
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md ${isActive ? 'bg-[#602fc9]' : 'hover:bg-[#353c45]'}`
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/dashboard/successful"
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md ${isActive ? 'bg-[#602fc9]' : 'hover:bg-[#353c45]'}`
          }
        >
          Successful Calls
        </NavLink>
        <NavLink
          to="/dashboard/unsuccessful"
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md ${isActive ? 'bg-[#602fc9]' : 'hover:bg-[#353c45]'}`
          }
        >
          Unsuccessful Calls
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;