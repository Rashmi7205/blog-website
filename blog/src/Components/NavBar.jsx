import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/NavBar.css";
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
             ?<Link to="/login" className="no-underline inline-flex items-center gap-2 rounded border border-indigo-600 px-8 py-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">Login</Link>
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
            : <Link to="/signup" className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 no-underline">Sign Up</Link>
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
