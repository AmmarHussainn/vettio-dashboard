// // src/components/Dashboard/CallDetails.jsx
// import { useEffect } from 'react';
// import AudioPlayer from './AudioPlayer';

// const CallDetails = ({ call, onClose }) => {
//   // Close modal when clicking outside
//   const handleOutsideClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };
   
//   // Close modal on Escape key press
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [onClose]);

//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//       onClick={handleOutsideClick}
//     >
//       <div 
//         className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to overlay
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-6">
//             <h2 className="text-xl font-bold text-[#252a31]">
//               Call Details
//             </h2>
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation(); // Stop event from bubbling
//                 onClose();
//               }}
//               className="text-gray-500 hover:text-gray-700 p-1 text-2xl leading-none"
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           </div>
          
//           <div className="space-y-6">
//             {/* Status Badge */}
//             <div className="flex items-center space-x-2">
//               <span className={`inline-block w-3 h-3 rounded-full ${
//                 call.analysis.successEvaluation === 'true' 
//                   ? 'bg-green-500' 
//                   : 'bg-red-500'
//               }`}></span>
//               <span className="font-medium">
//                 {call.analysis.successEvaluation === 'true' 
//                   ? 'Successful Call' 
//                   : 'Unsuccessful Call'}
//               </span>
//             </div>
            
//             {/* Basic Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
//                 <p className="mt-1 text-lg font-medium text-[#252a31]">
//                   {call.phoneNumber}
//                 </p>
//               </div>
              
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500">Call ID</h4>
//                 <p className="mt-1 text-sm text-[#252a31] font-mono">
//                   {call.id}
//                 </p>
//               </div>
//             </div>
            
//             {/* Summary */}
//             <div className="bg-[#f9f9f9] p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-gray-500 mb-2">Summary</h4>
//               <p className="text-[#252a31]">{call.analysis.summary}</p>
//             </div>
            
//             {/* Audio Player */}
//             <div>
//               <h4 className="text-sm font-medium text-gray-500 mb-2">Recording</h4>
//               <AudioPlayer url={call.monoRecording} />
//             </div>
            
//             {/* Email from structuredData */}
//             {call.analysis.structuredData?.email && (
//               <div className="border-t pt-4">
//                 <h4 className="text-sm font-medium text-gray-500">Collected Email</h4>
//                 <div className="mt-2 p-3 bg-purple-50 rounded-md">
//                   <p className="text-purple-800 font-medium break-all">
//                     {call.analysis.structuredData.email}
//                   </p>
//                 </div>
//               </div>
//             )}
            
//             {/* Contact Information (if available) */}
//             {call.contact && (
//               <div className="border-t pt-4">
//                 <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
//                 <div className="mt-2 bg-[#f9f9f9] p-4 rounded-lg">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs font-medium text-gray-500">Name</p>
//                       <p className="text-[#252a31]">{call.contact.name}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs font-medium text-gray-500">Email</p>
//                       <p className="text-[#602fc9] break-all">{call.contact.email}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs font-medium text-gray-500">Role</p>
//                       <p className="text-[#252a31]">{call.contact.role}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs font-medium text-gray-500">Company</p>
//                       <p className="text-[#252a31]">{call.contact.company}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CallDetails;



// src/components/Dashboard/CallDetails.jsx
import { useEffect } from 'react';
import { StarIcon, CheckIcon } from '@heroicons/react/24/solid';
import AudioPlayer from './AudioPlayer';

const CallDetails = ({ call, onClose, onMarkRead, onMarkFavorite }) => {
  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleMarkFavorite = (e) => {
    e.stopPropagation();
    onMarkFavorite(call.id);
  };

  const handleMarkRead = (e) => {
    e.stopPropagation();
    onMarkRead(call.id);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOutsideClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#252a31]">
                Call Details
              </h2>
              {/* Action Buttons */}
              <div className="flex space-x-3 mt-2">
                <button
                  onClick={handleMarkFavorite}
                  className={`flex items-center px-3 py-1 rounded-full text-sm ${
                    call.favourite
                      ? 'bg-[#faa61b] text-white'
                      : 'bg-[#f9f9f9] text-[#252a31] hover:bg-gray-200'
                  }`}
                >
                  <StarIcon className="w-4 h-4 mr-1" />
                  {call.favourite ? 'Favorited' : 'Favorite'}
                </button>
                {!call.read && (
                  <button
                    onClick={handleMarkRead}
                    className="flex items-center px-3 py-1 rounded-full text-sm bg-[#602fc9] text-white hover:bg-[#5027a8]"
                  >
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700 p-1 text-2xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center space-x-2">
              <span className={`inline-block w-3 h-3 rounded-full ${
                call.analysis.successEvaluation === 'true' 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
              }`}></span>
              <span className="font-medium">
                {call.analysis.successEvaluation === 'true' 
                  ? 'Successful Call' 
                  : 'Unsuccessful Call'}
              </span>
            </div>
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                <p className="mt-1 text-lg font-medium text-[#252a31]">
                  {call.phoneNumber}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Call ID</h4>
                <p className="mt-1 text-sm text-[#252a31] font-mono">
                  {call.id}
                </p>
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-[#f9f9f9] p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Summary</h4>
              <p className="text-[#252a31]">{call.analysis.summary}</p>
            </div>
            
            {/* Audio Player */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Recording</h4>
              <AudioPlayer url={call.monoRecording} />
            </div>
            
            {/* Email from structuredData */}
            {call.analysis.structuredData?.email && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-500">Collected Email</h4>
                <div className="mt-2 p-3 bg-purple-50 rounded-md">
                  <p className="text-purple-800 font-medium break-all">
                    {call.analysis.structuredData.email}
                  </p>
                </div>
              </div>
            )}
            
            {/* Contact Information (if available) */}
            {call.contact && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                <div className="mt-2 bg-[#f9f9f9] p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Name</p>
                      <p className="text-[#252a31]">{call.contact.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Email</p>
                      <p className="text-[#602fc9] break-all">{call.contact.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Role</p>
                      <p className="text-[#252a31]">{call.contact.role}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Company</p>
                      <p className="text-[#252a31]">{call.contact.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallDetails;