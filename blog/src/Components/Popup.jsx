import React, { useState } from 'react';

const Popup = ({data,onclick}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => setPopupOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
      >
        Open Popup
      </button>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <button onClick={()=>setPopupOpen(!isPopupOpen)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
