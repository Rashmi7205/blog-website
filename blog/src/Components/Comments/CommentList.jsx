import React from 'react'
import Comments from './Comments'

export default function CommentList({currentBlogId,comments}) {
    return (
    <div >
        {
           comments?.length?comments.map((ele)=><Comments key={currentBlogId} comment={ele} blogId={currentBlogId}/>)
            :"Be the first to comment"
        }
    </div>
  )
}
