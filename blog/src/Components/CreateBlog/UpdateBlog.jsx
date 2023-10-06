import React,{useRef,useState,useEffect} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {createPost, getBlogById, updatePost} from '../../Redux/Slices/blogSlice';


function UpdateBlog() {
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {blogid} = useParams();

    const [blogData,setBlogData] = useState({
        title:"",
        description:"",
        content:"",
        catagory:"",
        image:null,
    });

    const getCurrentBlog = async ()=>{
        if(!blogid){
            return;
        }
        const data = await dispatch(getBlogById(blogid));
        if(data?.payload?.blog){
            setBlogData({
                ...blogData,
                title:data.payload.blog.title,
                description:data.payload.blog.description,
                content:data.payload.blog.content,
                catagory:data.payload.blog.catagory,
            });
            setImagePreview(data.payload.blog.image.secure_url);
        }
    }

    const [imagePreview,setImagePreview] = useState("https://th.bing.com/th/id/OIP.sedusKw9sYxEJgRvUsgmCAHaE8?w=288&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7");



    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setBlogData({
            ...blogData,
            [name]:value,
        });
    }

    const handleImageInput = (e)=>{
       const image = e.target.files[0];
       setBlogData(
        {
            ...blogData,
            image,
        }
       );
       setImagePreview(URL.createObjectURL(image));
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let content=null;
        if (editorRef.current) {
        content = editorRef.current.getContent();
      }

      if(!blogData.title || !content){
        toast.info("Title and content is mandatory");
        return;
        }
        
        setBlogData({
            ...blogData,
            content,
        });
        const updateObj  ={
            blogid,
            blogData
        }
        const response = await dispatch(updatePost(updateObj));

        if(response.payload){
            setBlogData(
                {
                    title:"",
                    description:"",
                    content:"",
                    catagory:"",
                    image:null,
                }
            );
            navigate('/blog');
        }


    };

    useEffect(()=>{
        getCurrentBlog();
    },[]);

    return (
    <div className='w-full my-6 flex'>
        <form
        onSubmit={handleFormSubmit}
        encType='multipart/form-data'
        className='w-4/5 bg-slate-200 flex flex-col items-center justify-around md:py-8 md:px-5  rounded-md shadow-md'
        >
        <h1 className='text-3xl font-semibold text-purple-600'>Update Blog</h1>
        <div className='w-full my-3 flex items-start  flex-col gap-2'>
            <img src={imagePreview} 
            alt="your_image"
            className='w-[4/5] rounded-md h-[400px]'
            />
            <h1 className='text-xl font-semibold text-purple-600 cursor-pointer'>Add image</h1>
            <label htmlFor="image"
            className='text-2xl text-purple-700 bg-white w-[70px] h-[70px] flex rounded-full'
            >
                <i className="fa-regular fa-image"></i>
            </label>
            <input 
            className='hidden'
            type="file" 
            name="image" 
            id="image" 
            onChange={handleImageInput}
            />
        </div>
        <div className='w-full my-3 flex items-start  flex-col gap-2'>
            <label htmlFor="title"
            className='text-xl font-semibold text-purple-600 cursor-pointer'
            >
                Title
            </label>
            <input type="text" 
            className='w-full h-[30px] rounded-md border-none outline-none text-md font-semibold capitalize'
            id='title'
            name='title'
            value={blogData.title}
            onChange={handleInputChange}
            />
        </div>
        <div className='w-full my-3  flex  flex-col gap-2'>
        <label htmlFor="description"
            className='text-xl font-semibold text-purple-600 cursor-pointer'
            >
                description
            </label>
            <input type="text" 
            className='w-full h-[30px] rounded-md border-none outline-none text-md font-semibold capitalize'
            id='description'
            name='description'
            value={blogData.description}
            onChange={handleInputChange}
            />
        </div>
        <div className='w-full my-3'>
        <h3 className='text-xl font-semibold text-purple-600'>Content</h3>
        <Editor
        initialValue={blogData.content}
         onInit={(evt, editor) => editorRef.current = editor}
         init={{
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:18px }'
         }}
       />
        </div>
        <div className='w-full my-3  flex items-start  flex-col gap-2'>
        <label htmlFor="catagory"
            className='text-xl font-semibold text-purple-600 cursor-pointer'
            >
                catagory
            </label>
            <input type="text" 
            className='w-full h-[30px] rounded-md border-none outline-none text-md font-semibold capitalize'
            id='catagory'
            name='catagory'
            value={blogData.catagory}
            onChange={handleInputChange}
            />
        </div>
        <button 
        type='submit'
        className='w-[90%] text-center h-[40px] font-semibold text-white tracking-widest rounded-md  bg-purple-600 hover:bg-purple-800'
        >
           Update 
        </button>
        </form>
        
       
    </div>        
  )
}

export default UpdateBlog