import React,{useState,useContext} from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.css";
import { LoginContext,UserContext } from "../App";
import UserLogout from "./utils/UserLogout";
import logo from '../Components/images/logo-no-background.png'

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedin, setIsLoggedIn} = useContext(LoginContext);
  const usercontext = useContext(UserContext);  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar ">
    <div className="text-[#793FDF] text-4xl font-bold tracking-wide">
      <img src={logo} alt="logo" 
      className="w-[120px] h-auto"
      />
    </div>
    <ul className="menu-item">
        <li><Link to="/" className="link">Home</Link></li>
        <li><Link to="/blog" className="link">Blogs</Link></li>
        <li>
          {
             !isLoggedin
             ?<Link to="/login" className="link">Login</Link>
             :""
            }
        </li>
        <li>
          {
            isLoggedin
            ?<Link to="/profile" className="w-44 flex capitalize bg-sky-600 p-2 rounded-lg text-white font-bold text-xl">
              <img className='nav-profile-img' src={usercontext.userDetails.profilePic.secure_url}/>
              {
                usercontext.userDetails.name
              }
            </Link>
            : <Link to="/signup" className="link text-white bg-slate-700 p-3 rounded-lg">Sign Up</Link>
          }
         
        </li>
      </ul>
    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
      <ul className="small-menu">
      <li>
          {
            isLoggedin
            ?<Link to="/profile" className="flex w-full text-white no-underline bg-slate-600 p-2 rounded-lg"  onClick={toggleMenu}>
              <img className='nav-profile-img mx-2' src={usercontext.userDetails.profilePic.secure_url}/>
              {
                usercontext.userDetails.name
              }
            </Link>
            : <Link to="/signup" className="link  text-white "  onClick={toggleMenu}>Sign Up</Link>
          }
         
        </li>
      <li><Link to="/" className="link"  onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/blog" className="link"  onClick={toggleMenu}>Blogs</Link></li>
        <li>
          {
             isLoggedin
             ?<></>
             :<Link to="/login" className="link">Login</Link>
          }
          
        </li>
       
      </ul>
    </div>
    <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  </nav>
  );
}

export default NavBar;
