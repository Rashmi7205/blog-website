import React from 'react';
import FollwerTab from './FollwerTab';
import FollwingTab from './FollowingTab';
import UserBlogs from './UserBlogs';


function UserTabs() {
  return (
    <div className='w-full py-3'>
        <UserBlogs/>
    </div>
  )
}

export default UserTabs