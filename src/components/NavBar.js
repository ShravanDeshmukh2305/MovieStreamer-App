

import React, { useState } from "react";
import Logo from "../MovieLogo.png";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ searchStr, handleSearchChange, handleSearchSubmit, searchHistory, deleteSearchHistoryItem, clearSearchHistory }) {
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  const handleSearchBoxClick = () => {
    setShowHistory(true);
  };

  const handleSearchBoxBlur = () => {
    setTimeout(() => setShowHistory(false), 200); // To allow click event on delete button
  };

  return (
    <div className="flex border space-x-8 items-center pl-3 py-4 relative">
      {/* <img src={Logo} className="w-[50px]" alt="Movie Logo" /> */}
      <h1 style={{ fontWeight: 'bold' }}>MovieStreamer</h1>

      <Link to="/" className="text-blue-400">Movies</Link>
      <Link to="/watchlist" className="text-blue-400">WatchList</Link>
      <Link to="/login" className="text-blue-400">Login</Link>
      <Link to="/signup" className="text-blue-400">Sign Up</Link>
      <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); navigate('/'); }} className="relative">
        <input
          type="text"
          className="border bg-gray-200 border-4 text-center p-1 m-2"
          placeholder="Search for Movies"
          value={searchStr}
          onChange={handleSearchChange}
          onClick={handleSearchBoxClick}
          onBlur={handleSearchBoxBlur}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">Search</button>
        {showHistory && searchHistory.length > 0 && (
          <div className="absolute bg-white border border-gray-300 mt-2 p-2 rounded shadow-lg z-10 w-full">
            <div className="font-bold">Search History:</div>
            {searchHistory.map((history, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="mr-2">{history}</span>
                <button className="text-red-600" onClick={() => deleteSearchHistoryItem(history)}>Delete</button>
              </div>
            ))}
            <button className="text-red-600 mt-2" onClick={clearSearchHistory}>Clear Search History</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default NavBar;









// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function NavBar({ searchStr, handleSearchChange, handleSearchSubmit, searchHistory, deleteSearchHistoryItem, clearSearchHistory }) {
//   const [showHistory, setShowHistory] = useState(false);
//   const navigate = useNavigate();

//   const handleSearchBoxClick = () => {
//     setShowHistory(true);
//   };

//   const handleSearchBoxBlur = () => {
//     setTimeout(() => setShowHistory(false), 200); // To allow click event on delete button
//   };

//   return (
//     <div className="flex items-center pl-3 py-4 border-b border-gray-300 bg-white justify-between relative">
//       <h1 style={{ fontWeight: 'bold', marginLeft: '50px' }}>MovieStreamer</h1>

//       <div className="flex space-x-8">
//         <Link to="/" className="text-blue-400 hover:text-blue-600">Movies</Link>
//         <Link to="/watchlist" className="text-blue-400 hover:text-blue-600">WatchList</Link>
//         <Link to="/login" className="text-blue-400 hover:text-blue-600">Login</Link>
//         <Link to="/signup" className="text-blue-400 hover:text-blue-600">Sign Up</Link>
//       </div>

//       <form 
//         onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); navigate('/'); }} 
//         className="relative flex items-center"
//       >
//         <input
//           type="text"
//           className="border bg-gray-200 border-4 text-center p-1"
//           placeholder="Search for Movies"
//           value={searchStr}
//           onChange={handleSearchChange}
//           onClick={handleSearchBoxClick}
//           onBlur={handleSearchBoxBlur}
//         />
//         <button type="submit" className="p-2 bg-blue-500 text-white mr-12">Search</button>
//         {showHistory && searchHistory.length > 0 && (
//           <div className="absolute bg-white border border-gray-300 mt-2 p-2 rounded shadow-lg z-10 w-full">
//             <div className="font-bold">Search History:</div>
//             {searchHistory.map((history, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <span className="mr-2">{history}</span>
//                 <button className="text-red-600" onClick={() => deleteSearchHistoryItem(history)}>Delete</button>
//               </div>
//             ))}
//             <button className="text-red-600 mt-2" onClick={clearSearchHistory}>Clear Search History</button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }

// export default NavBar;
