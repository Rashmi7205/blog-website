import React from 'react'
import Comments from './Comments'

export default function CommentList({currentBlogId,comments}) {
    return (
    <div >
        {
            comments.length?
            comments.map((comment)=><Comments id={comment.id} comment={comment} blogId={currentBlogId}/>)
            :"Add first  Comment on this post"
        }
    </div>
  )
}
