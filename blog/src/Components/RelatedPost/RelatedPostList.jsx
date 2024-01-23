
import {useSelector} from 'react-redux';
import Blogcard from '../BlogCard/Blogcard';

function RelatedPostList({id,setid}) {
  
    const blogList = useSelector((state)=>state?.blogData?.blogs);

  return (
    <div className='w-full flex flex-col items-center my-4'>
        <h1 className="text-2xl font-bold text-left w-full ">Also Read This </h1>
        <div className="flex flex-col">
            {
                blogList && blogList.slice(0,4).map((blogData)=>
                {
                  if(id !== blogData._id){
                   
                    return <Blogcard data={blogData} onclick={()=>setid(blogData._id)}/>
                 }
                }
                )
            }
        </div>  
    </div>
  )
}

export default RelatedPostList