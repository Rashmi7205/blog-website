import React,{useContext, useEffect} from 'react';
import axios from 'axios';
import { API_URL } from './utils/scr.login';
import { UserContext,LoginContext } from '../App';
import './css/profile.css'
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {

  const userContext = useContext(UserContext);
  const loginContext= useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(()=>{

    // if( !loginContext.isLoggedIn){
    //    navigate('/login');
    // }

    const fetchData = async()=>{

      try {
          const response = await axios.get(`${API_URL}/profile`,{
          withCredentials:true
        });
  
        const {user} =  response.data;
        
        userContext.setUserDetails(user);
        loginContext.setIsLoggedIn(true);
      } catch (error) {
         toast.error(error.message,{
          autoClose:3000,
          position:toast.POSITION.TOP_CENTER,
         })
      }
    }


    fetchData();
  },[]);

  const blogTitles = [
    "Mastering Asynchronous Programming in JavaScript",
    "The Power of Closures: Understanding Lexical Scope",
    "A Comprehensive Guide to ES6 Features",
    "Building Interactive User Interfaces with React.js",
    "Demystifying Node.js: Server-side JavaScript Explained",
  ];

  return (
      <>
        <div className="profile flex">
            <div className="user-profile">
                  <img className="user-profie-img" src="https://imgs.search.brave.com/NEsmN62PWfJ5Sl_E9ghmCE9PLOzgW0W16Jyn-aw3esw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8wLmpwZw" alt="" />
                  <h2>User name</h2>
                  <p>Lorem ipsum dolor sit anim a ullam voluptas ea exercitationem optio soluta minima impedit facilis.</p>
                  <p>Followers:10 Total Likes:10 </p>
                  <div className="social-links">
                    <a ><i className="fa-brands fa-facebook"></i>Facebook</a>
                    <a ><i className="fa-brands fa-whatsapp"></i>Whatsapp</a>
                    <a ><i className="fa-brands fa-linkedin"></i>LinkedIn</a>
                    <a ><i className="fa-brands fa-twitter"></i>Twitter</a>
                  </div>
                  <button className='btn' 
                  onClick={()=>{navigate('/update/profile')}}
                  >
                    <i className="fa-solid fa-user-pen">
                  </i>Edit Details</button>
            </div>
            <div className="user-blogs">
              <h1>My Blogs</h1>
              <ul className='blog-list'>
                {
                  blogTitles.map((blog,index)=><li key={index}>{blog}
                    <div className="blog-btn">
                    <button className='btn'>
                      <i className="fa-solid fa-pen-to-square" style={{color: "green",}} ></i>
                      </button>
                    <button className='btn'>
                      <i className="fa-solid fa-trash" style={{color: "#e61919",}} ></i>
                    </button>
                    </div>
                  </li>)
                }
              </ul>
            </div>
        </div>
      </>
  )
}

export default Profile