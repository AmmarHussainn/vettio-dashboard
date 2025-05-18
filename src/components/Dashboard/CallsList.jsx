// // src/components/Dashboard/CallsList.jsx
// import { useState, useEffect, use } from 'react';
// import { getCalls, markAsRead, markAsFavorite } from '../../services/api';
// import AudioPlayer from './AudioPlayer';
// import CallDetails from './CallDetails';

// const CallsList = ({ successful, limit, filter = 'all' }) => {
//   const [calls, setCalls] = useState([]);
//   const [filteredCalls, setFilteredCalls] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [selectedCall, setSelectedCall] = useState(null);
//   const [error, setError] = useState(null);

//   const filtereCalls = calls.filter((call) => {
//     // First filter by successful/unsuccessful based on route
//     const matchesRoute = successful
//       ? call.analysis?.successEvaluation === 'true'
//       : call.analysis?.successEvaluation !== 'true';

//     // Then apply the additional filter
//     if (filter === 'read') return matchesRoute && call.read;
//     if (filter === 'unread') return matchesRoute && !call.read;
//     if (filter === 'favourite') return matchesRoute && call.favourite;
//     if (filter === 'successful')
//       return call.analysis?.successEvaluation === 'true';

//     return matchesRoute;
//   });
//   const handleFilter = () => {
//     let newdata = filtereCalls;
//     setFilteredCalls(newdata);
//   };

//   console.log('Filtered Calls:', filteredCalls);
//   useEffect(() => {
//     handleFilter();
//   }, [filter]);

//   useEffect(() => {
//     const fetchCalls = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await getCalls(successful, page, 10);
//         // Validate and clean the data before setting it
//         const validatedCalls = Array.isArray(data)
//           ? data.map((call) => ({
//               ...call,
//               analysis: call.analysis || {
//                 summary: 'No summary available',
//                 structuredData: {},
//                 successEvaluation: 'false',
//               },
//               phoneNumber: call.phoneNumber || 'Unknown number',
//               monoRecording: call.monoRecording || null,
//             }))
//           : [];
//         setCalls(validatedCalls);
//         setFilteredCalls(validatedCalls);
//       } catch (error) {
//         console.error('Error fetching calls:', error);
//         setError('Failed to load calls. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCalls();
//   }, [successful, page]);

//   const handleMarkAsRead = async (callId) => {
//     try {
//       await markAsRead(callId);
//       let newArray = calls.map((call) =>
//         call.id === callId ? { ...call, read: true } : call
//       );
//       setFilteredCalls(newArray);
//       setCalls(newArray);
//     } catch (error) {
//       console.error('Error marking as read:', error);
//     }
//   };

//   const handleMarkAsFavorite = async (callId) => {
//     try {
//       await markAsFavorite(callId);
//       let newArray = calls.map((call) =>
//         call.id === callId ? { ...call, favourite: !call.favourite } : call
//       );
//       setCalls(newArray);
//       setFilteredCalls(newArray);
//     } catch (error) {
//       console.error('Error marking as favorite:', error);
//     }
//   };

//   if (loading) {
//     return <div className='text-center py-8'>Loading...</div>;
//   }

//   // Update your filtering logic to consider both successful prop and filter

//   // setCalls(filteredCalls)

//   // useEffect(() => {
//   //   let newdata = filteredCalls
//   //   setCalls(newdata);
//   // }, []);

//   return (
//     <div className='space-y-4'>
//       <div className='grid grid-cols-1 gap-4'>
//         {filteredCalls?.map((call) => {
//           // Safely access properties with fallbacks
//           const analysis = call.analysis || {};
//           const summary = analysis.summary || 'No summary available';
//           const successEvaluation = analysis.successEvaluation || 'false';
//           const structuredData = analysis.structuredData || {};

//           return (
//             <div
//               key={call.id}
//               className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-md ${
//                 !call.read ? 'border-l-4 border-[#602fc9]' : ''
//               } ${call.favourite ? 'bg-yellow-50' : ''}`}
//               onClick={() => setSelectedCall(call)}
//             >
//               <div className='flex justify-between items-start'>
//                 <div className='flex-1'>
//                   <div className='flex items-center space-x-3'>
//                     <span
//                       className={`inline-block w-3 h-3 rounded-full ${
//                         successEvaluation === 'true'
//                           ? 'bg-green-500'
//                           : 'bg-red-500'
//                       }`}
//                     ></span>
//                     <h3 className='font-medium text-[#252a31]'>
//                       {call.phoneNumber || 'Unknown number'}
//                     </h3>
//                   </div>
//                   <p className='text-sm text-gray-500 mt-1'>
//                     {summary.substring(0, 100)}...
//                   </p>

//                   {structuredData.email && (
//                     <div className='mt-2'>
//                       <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800'>
//                         Email Collected
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <div className='flex space-x-2'>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleMarkAsFavorite(call.id, e);
//                     }}
//                     className={`p-1 rounded-full ${
//                       call.favourite ? 'text-[#faa61b]' : 'text-gray-400'
//                     } hover:text-[#faa61b]`}
//                   >
//                     ★
//                   </button>
//                   {!call.read && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleMarkAsRead(call.id, e);
//                       }}
//                       className='p-1 rounded-full text-[#602fc9] hover:bg-[#602fc9] hover:text-white'
//                     >
//                       ✓
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className='flex justify-between items-center mt-4'>
//         <button
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className='px-4 py-2 bg-[#f9f9f9] rounded-md disabled:opacity-50'
//         >
//           Previous
//         </button>
//         <span className='text-sm text-gray-600'>Page {page}</span>
//         <button
//           onClick={() => setPage((p) => p + 1)}
//           disabled={calls.length < 10}
//           className='px-4 py-2 bg-[#f9f9f9] rounded-md disabled:opacity-50'
//         >
//           Next
//         </button>
//       </div>

//       {selectedCall && (
//         <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
//           <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
//             <div className='p-6'>
//               <div className='flex justify-between items-start'>
//                 <h2 className='text-xl font-bold text-[#252a31]'>
//                   Call Details
//                 </h2>
//                 <button
//                   onClick={() => setSelectedCall(null)}
//                   className='text-gray-500 hover:text-gray-700'
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className='mt-6 space-y-4'>
//                 {selectedCall && (
//                   <CallDetails
//                     call={selectedCall}
//                     onClose={() => setSelectedCall(null)}
//                   />
//                 )}
//                 <AudioPlayer url={selectedCall.monoRecording} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CallsList;




// src/components/Dashboard/CallsList.jsx
import { useState, useEffect } from 'react';
import { getCalls, markAsRead, markAsFavorite } from '../../services/api';
import AudioPlayer from './AudioPlayer';
import CallDetails from './CallDetails';

const CallsList = ({ successful, filter = 'all' }) => {
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // New state for page size
  const [selectedCall, setSelectedCall] = useState(null);
  const [error, setError] = useState(null);

  const filterCalls = (calls) => {
    return calls.filter((call) => {
      // First filter by successful/unsuccessful based on route
      const matchesRoute = successful
        ? call.analysis?.successEvaluation === 'true'
        : call.analysis?.successEvaluation !== 'true';

      // Then apply the additional filter
      if (filter === 'read') return matchesRoute && call.read;
      if (filter === 'unread') return matchesRoute && !call.read;
      if (filter === 'favourite') return matchesRoute && call.favourite;
      if (filter === 'successful') return call.analysis?.successEvaluation === 'true';

      return matchesRoute;
    });
  };

  useEffect(() => {
    const fetchCalls = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCalls(successful, page, pageSize); // Use pageSize here
        const validatedCalls = Array.isArray(data)
          ? data.map((call) => ({
              ...call,
              analysis: call.analysis || {
                summary: 'No summary available',
                structuredData: {},
                successEvaluation: 'false',
              },
              phoneNumber: call.phoneNumber || 'Unknown number',
              monoRecording: call.monoRecording || null,
            }))
          : [];
        setCalls(validatedCalls);
        setFilteredCalls(filterCalls(validatedCalls));
      } catch (error) {
        console.error('Error fetching calls:', error);
        setError('Failed to load calls. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [successful, page, pageSize, filter]); // Add pageSize to dependencies

  const handleMarkAsRead = async (callId, e) => {
    e?.stopPropagation();
    try {
      await markAsRead(callId);
      const newArray = calls.map((call) =>
        call.id === callId ? { ...call, read: true } : call
      );
      setCalls(newArray);
      setFilteredCalls(filterCalls(newArray));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleMarkAsFavorite = async (callId, e) => {
    e?.stopPropagation();
    try {
      await markAsFavorite(callId);
      const newArray = calls.map((call) =>
        call.id === callId ? { ...call, favourite: !call.favourite } : call
      );
      setCalls(newArray);
      setFilteredCalls(filterCalls(newArray));
    } catch (error) {
      console.error('Error marking as favorite:', error);
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setPage(1); // Reset to first page when changing page size
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {filteredCalls?.map((call) => {
          const analysis = call.analysis || {};
          const summary = analysis.summary || 'No summary available';
          const successEvaluation = analysis.successEvaluation || 'false';
          const structuredData = analysis.structuredData || {};

          return (
            <div
              key={call.id}
              className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-md ${
                !call.read ? 'border-l-4 border-[#602fc9]' : ''
              } ${call.favourite ? 'bg-yellow-50' : ''}`}
              onClick={() => setSelectedCall(call)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        successEvaluation === 'true' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                    <h3 className="font-medium text-[#252a31]">
                      {call.phoneNumber || 'Unknown number'}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {summary.substring(0, 100)}...
                  </p>

                  {structuredData.email && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                        Email Collected
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => handleMarkAsFavorite(call.id, e)}
                    className={`p-1 rounded-full ${
                      call.favourite ? 'text-[#faa61b]' : 'text-gray-400'
                    } hover:text-[#faa61b]`}
                  >
                    ★
                  </button>
                  {!call.read && (
                    <button
                      onClick={(e) => handleMarkAsRead(call.id, e)}
                      className="p-1 rounded-full text-[#602fc9] hover:bg-[#602fc9] hover:text-white"
                    >
                      ✓
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-[#f9f9f9] rounded-md disabled:opacity-50 w-full sm:w-auto"
        >
          Previous
        </button>
        
        <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
          <span className="text-sm text-gray-600">Page {page}</span>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="pageSize" className="text-sm text-gray-600">
              Show:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#602fc9]"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={filteredCalls.length < pageSize}
          className="px-4 py-2 bg-[#f9f9f9] rounded-md disabled:opacity-50 w-full sm:w-auto"
        >
          Next
        </button>
      </div>

      {selectedCall && (
        <CallDetails
          call={selectedCall}
          onClose={() => setSelectedCall(null)}
          onMarkRead={handleMarkAsRead}
          onMarkFavorite={handleMarkAsFavorite}
        />
      )}
    </div>
  );
};

export default CallsList;