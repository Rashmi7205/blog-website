import React from 'react';

const Loader = () => {

  return (
    <div className='w-full h-full flex flex-col'>  
     <div className="spinner animate-spin w-10 h-10  rounded-full  border-r-4 border-blue-600">
    </div>
        Loading...
    </div>
     
  );
};

export default Loader;