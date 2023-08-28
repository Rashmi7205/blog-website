import React from 'react'
import FollwerTab from './FollwerTab'
import FollowingTab from './FollowingTab'
import MyBlogTab from './MyBlogTab'

function Tabs({tab}) {
    
    if(tab==="follwing"){
        return <FollowingTab/>
    }
    else 
    if(tab==="blogs"){
        return <MyBlogTab/>
    }

    return <FollwerTab/>
}

export default Tabs