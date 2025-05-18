// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { 
  Routes, 
  Route, 
  Outlet,
  useLocation,
  useOutletContext 
} from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import CallsList from '../components/Dashboard/CallsList';
import StatsCard from '../components/Dashboard/StatsCard';
import { getSuccessfulCount, getUnsuccessfulCount } from '../services/api';

const DashboardLayout = () => {
  const [filter, setFilter] = useState('all');
  const location = useLocation();

  // Reset filter when navigating between tabs
  useEffect(() => {
    setFilter('all');

  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar 
          currentFilter={filter}
          onFilterChange={setFilter} 
        />
        <main className="p-6 mt-16">
          <Outlet context={{ filter }} />
        </main>
      </div>
    </div>
  );
};

const Overview = () => {
  const [successfulCount, setSuccessfulCount] = useState(0);
  const [unsuccessfulCount, setUnsuccessfulCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { filter } = useOutletContext();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [successful, unsuccessful] = await Promise.all([
          getSuccessfulCount(),
          getUnsuccessfulCount(),
        ]);
        setSuccessfulCount(successful.count);
        setUnsuccessfulCount(unsuccessful.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Successful Calls"
          value={successfulCount}
          color="bg-green-100 text-green-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          }
        />
        <StatsCard
          title="Unsuccessful Calls"
          value={unsuccessfulCount}
          color="bg-red-100 text-red-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-[#252a31] mb-4">Recent Successful Calls</h3>
        <CallsList successful={true} limit={5} filter={filter} />
      </div>
    </div>
  );
};

const FilteredCallsList = ({ successful }) => {
  const { filter } = useOutletContext();
  return <CallsList successful={successful} filter={filter} />;
};

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="successful" element={<FilteredCallsList successful={true} />} />
        <Route path="unsuccessful" element={<FilteredCallsList successful={false} />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;