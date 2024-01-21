import React,{useState,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/NavBar.css";
import { LoginContext,UserContext } from "../App";
import UserLogout from "./utils/UserLogout";
import logo from '../Components/images/logo-no-background.png'
import { useSelector } from "react-redux";

function NavBar() {

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedin = useSelector((state)=>(state.auth?.isLoggedIn));
  const userData = useSelector((state)=>state?.auth?.userData);  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar z-50 text-sm font-semibold">
    <div className="text-[#793FDF] text-4xl font-bold tracking-wide">
      <img src={logo} alt="logo" 
      className="w-[120px] h-auto block"
      onClick={()=>navigate('/')}
      />
    </div>
    <ul className="w-3/5 md:flex items-center justify-between hidden">
        <li><Link to="/" className="link">Home</Link></li>
        <li><Link to="/blog" className="link">Blogs</Link></li>
        <li><Link to="/contact" className="link">Contact</Link></li>
        <li><Link to="/about" className="link">About us</Link></li>
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
            ?<Link to="/profile" className="w-44 flex items-center justify-around capitalize bg-sky-600 p-2 rounded-lg text-white font-bold text-xl no-underline">
              <img className='nav-profile-img' src={userData?.profilePic?.secure_url}/>
              {
               userData?.name
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
              <img className='nav-profile-img mx-2' src={userData?.profilePic?.secure_url}/>
              {
               userData?.name
              }
            </Link>
            : <Link to="/signup" className="link  text-white "  onClick={toggleMenu}>Sign Up</Link>
          }
         
        </li>
      <li><Link to="/" className="link"  onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/blog" className="link"  onClick={toggleMenu}>Blogs</Link></li>
        <li><Link to="/contact" className="link">Contact</Link></li>
        <li><Link to="/about" className="link">About us</Link></li>
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
