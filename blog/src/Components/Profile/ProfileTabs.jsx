import React, { useState } from 'react'
import Tabs from './Tabs';

function ProfileTabs() {
  const [type,setType] = useState("follwers");

  const types = ["follwers","follwing","blogs"];

  return (
    <div className='w-3/5 h-4/5'>
        <div className='w-full h-20 flex capitalize'>
              {
                types.map((type)=><div className='text-red-600  p-2 border-2'
                onClick={()=>setType(type)}
                >{type}</div>)
              }
        </div>
        <div className='w-full '>
             <Tabs tab={type} />
        </div>
    </div>
  )
}

export default ProfileTabs