// src/components/Layout/Navbar.jsx
import { useState } from 'react';
import { 
  BarsArrowDownIcon, 
  EnvelopeIcon, 
  StarIcon, 
  CheckIcon 
} from '@heroicons/react/24/outline';

const Navbar = ({ onFilterChange, currentFilter }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filters = [
    { value: 'all', label: 'All Calls' },
    { value: 'unread', label: 'Unread', icon: <EnvelopeIcon className="w-4 h-4" /> },
    { value: 'read', label: 'Read', icon: <CheckIcon className="w-4 h-4" /> },
    // { value: 'successful', label: 'Successful', icon: <StarIcon className="w-4 h-4" /> }
    { value: 'favourite', label: 'Favourite', icon: <StarIcon className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-white shadow-sm fixed top-0 left-64 right-0 h-16 flex items-center justify-between px-6 z-10">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-[#252a31]">Dashboard</h2>
      </div>
      
      {/* Desktop Filter Buttons */}
      <div className="hidden md:flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              currentFilter === filter.value
                ? 'bg-[#602fc9] text-white'
                : 'bg-[#f9f9f9] text-[#252a31] hover:bg-gray-200'
            }`}
          >
            {filter.icon && <span className="mr-1">{filter.icon}</span>}
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Mobile Filter Dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="p-2 rounded-full bg-[#f9f9f9] hover:bg-gray-200"
        >
          <BarsArrowDownIcon className="w-5 h-5 text-[#252a31]" />
        </button>
        
        {showMobileFilters && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  onFilterChange(filter.value);
                  setShowMobileFilters(false);
                }}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  currentFilter === filter.value
                    ? 'bg-[#602fc9] text-white'
                    : 'text-[#252a31] hover:bg-gray-100'
                }`}
              >
                {filter.icon && <span className="mr-2">{filter.icon}</span>}
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;