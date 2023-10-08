import React from 'react';
import logo from '../Components/images/logo-no-background.png';

function Footer() {
  return (
    <footer className='w-full  bg-purple-500 text-white text-center text-lg py-10 z-50 mt-[150px]'>
    <div className="footer-content w-full flex md:flex-row flex-col items-center justify-between">
      <div className="footer-logo w-2/5 flex flex-col">
        <img src={logo} alt="Company Logo"
        className='w-[150px] md:w-[250px] h-auto'
        />
        <span>justwrite</span>
      </div>
      <div className="footer-links w-1/5">
        <ul className='my-3 flex flex-col h-full'>
          <li><a href="/" className='link text-white'>Home</a></li>
          <li><a href="/about" className='link text-white '>About Us</a></li>
          <li><a href="/services" className='link text-white'>Services</a></li>
          <li><a href="/contact" className='link text-white'>Contact</a></li>
        </ul>
      </div>
      <div className="footer-social w-2/5 flex text-2xl">
        <a href="#" className='text-white'><i className="fab fa-facebook"></i></a>
        <a href="#"  className='text-white'><i className="fab fa-twitter"></i></a>
        <a href="#"  className='text-white'><i className="fab fa-instagram"></i></a>
      </div>
    </div>
    <div className="footer-bottom text-sm">
      &copy; {new Date().getFullYear()} justwrite pvt. ltd. . All rights reserved.
    </div>
  </footer>
  )
}

export default Footer