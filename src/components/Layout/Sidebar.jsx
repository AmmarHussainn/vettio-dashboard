// src/components/Layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-[#252a31] text-white h-screen fixed left-0 top-0 p-4 flex flex-col">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2 mb-8 p-2">
        <div className="w-8 h-8 bg-[#faa61b] rounded-full"></div>
        <h1 className="text-xl font-bold">Kai Dashboard</h1>
      </div>
      
      {/* Navigation Links */}
      <nav className="space-y-2 flex-1">
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
      
      {/* Logout Button - positioned at the bottom */}
      <div className="mt-auto pb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 rounded-md text-red-400 hover:bg-[#353c45] hover:text-red-300 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;