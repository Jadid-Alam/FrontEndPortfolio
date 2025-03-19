import './index.css';
import React , {useState, useEffect} from 'react';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';
import gmailImage from './images/gmail.png';
import linkedinImage from './images/linkedin.png';
import githubImage from './images/github.png';
import phoneImage from './images/telephone.png';
import downImg from './images/downArrowDark.png';
import downImgDark from './images/downArrow.png';
import {motion} from "framer-motion";

const ContactMe = ({darkMode, setDarkMode}) => {
    const [mouse, setMouse] = useState({x:0, y:0});
    const [fading, setFading] = useState({});

    const handleDownload = () => {
      const fileUrl = "/Jadid-Alam-CV.pdf";
      const link = document.createElement('a');

      link.href = fileUrl;
      link.download = "Jadid-Alam-CV.pdf"; 

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouse({x: e.clientX, y: e.clientY});
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouse.x, mouse.y]);

    useEffect(() => {
        const elements = document.querySelectorAll('.fade-in');
    
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setFading((prevState) => ({
                  ...prevState,
                  [entry.target.id]: true,
                }));
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
    
        elements.forEach((element) => {
          observer.observe(element);
        });
    
        return () => {
          elements.forEach((element) => {
            observer.unobserve(element);
          });
        };
      }, []);

    const fadingCircle = {
        position: 'fixed',
        top: mouse.y - 1500,
        left: mouse.x - 1500,
        zIndex: 0,
        width: '3000px',
        height: '3000px',
        borderRadius: '50%',
        pointerEvents: 'none',
    };
    const headerStyle = 'fixed z-20 top-0 left-0 w-full text-mnav font-semibold lg:text-nav lg:font-semibold fade-in duration-1000 ease-in-out';
    const logoStyle = 'p-1 max-w-40 lg:p-2';
    const navlinkStyle = 'p-1 lg:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition';
    const [hideNav, setHideNav] = useState(true);
        useEffect(() => {
          if (window.innerWidth > 768) {
            setHideNav(true);
          }
        }
        , [window.innerWidth]);

    const shining = {
        animate: {
            color: ['#bf00e1','#2f0077','#bf00e1'],
            transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
            },
        }
    }

  return (
      <div className={` fade-in duration-1000 ease-in-out ${darkMode ? 'dark' : 'light'}`}>
        <div className={`${darkMode ? 'gradient-dark' : 'gradient'}`} style={fadingCircle}></div>
        <header className={`${headerStyle} ${darkMode ? 'dark' : 'light'}`}>
            <motion.h4
                variants={shining}
                animate="animate"
                className={logoStyle}>Jadid Alam</motion.h4>
              <nav className="mr-auto my-auto lg:my-0 lg:mr-auto lg:flex">
                  <button onClick={() => setHideNav (prevMode => !prevMode)}><img className='lg:hidden lg:w-[0px] lg:h-0 w-[15px] h-auto' src={darkMode ? downImg : downImgDark}/></button>
                  <ul id='navBarMobile' className={`${darkMode ? 'dark' : 'light'} lg:flex fade-in duration-1000 ease-in-out ${hideNav ? "hidden" : "absolute block  sm:w-[15%] text-center"}`}>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/'>Home</Link></li>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/experience'>Experience</Link></li>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/projects'>Projects</Link></li>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/scramble-minigame'>1v1 Scramble</Link></li>
                  </ul>
                </nav>
                
                <nav className="mr-1 items-end sm:mr-2 lg:mr-4">
                  <ul className="flex justify-end">
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><a onClick={handleDownload}>Resume</a></li>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLinkCurr' : 'navLinkCurr'}`}>
                        <Link to='/contact-me'>Contact Me</Link>
                      </li>
                      <button onClick={() => setDarkMode(prevMode => !prevMode)}><img  src={darkMode ? lightModeImage : darkModeImage} className='w-[15px] lg:w-[35px] h-auto' alt='DarkMode button' /></button>
                      
                  </ul>
                </nav>
          </header>

          <main>
              <div className='content text-center text-mnormal lg:text-normal split z-10'>
                <div>
                    <h2 id='title' className={`py-20 p-2 text-mheading lg:p-3 lg:py-64 lg:text-heading 
                      fade-in duration-1000 ease-in-out ${fading['title'] || 1==1 ? 'opacity-100' : 'opacity-0'} 
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Interested in <motion.span className={`font-bold`} variants={shining} animate='animate'>collaborating</motion.span> or have any inquiries? Feel free to <motion.span className={`font-bold`} variants={shining} animate='animate'>reach out</motion.span>.</h2>
                </div>

                <div className="pb-16 lg:py-40 grid grid-cols-2 grid-rows-2">
                    
                    <figure id='gmail' className={`p-5 py-4 lg:p-10 lg:py-5
                      fade-in duration-1000 ease-in-out 
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                          <a id='gmail-link' href='mailto:jadid.alam.08@gmail.com'>
                            <img id='gmail-img' src={gmailImage} 
                            alt="Email: jadid.alam.08@gmail.com" style={{ width: '200px', height: 'auto' }} />
                          </a>
                        <figcaption id='gmail-cap' className='text-mimgcap lg:text-imgcap text-gray-500'>Email: jadid.alam.08@gmail.com</figcaption>
                    </figure>

                    <figure id='github' className={`p-5 py-4 lg:p-10 lg:py-5
                      fade-in duration-1000 ease-in-out 
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                          <a href='https://github.com/Jadid-Alam?tab=repositories'><img src={githubImage} alt="My GitHub repository" style={{ width: '200px', height: 'auto' }} /></a>
                        <figcaption className='text-mimgcap lg:text-imgcap text-gray-500'>My GitHub repository</figcaption>
                    </figure>

                    <figure id='linkedin' className={`p-5 py-4 lg:p-10 lg:py-5
                      fade-in duration-1000 ease-in-out 
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                          <a href='https://www.linkedin.com/in/jadid-alam-b57a112a5/'><img src={linkedinImage} alt="My Linked-in Profile" style={{ width: '200px', height: 'auto' }} /></a>
                        <figcaption className='text-mimgcap lg:text-imgcap text-gray-500'>My Linked-in Profile</figcaption>
                    </figure>

                    <figure id='phone' className={`p-5 py-4 lg:p-10 lg:py-5
                      fade-in duration-1000 ease-in-out 
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                          <a href='tel:+447491277476'><img src={phoneImage} alt="Phone: +447491277476" style={{ width: '200px', height: 'auto' }} /></a>
                        <figcaption className='text-mimgcap lg:text-imgcap text-gray-500'>Phone: +447491277476</figcaption>
                    </figure>
                </div>

              </div>
          </main>

          <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center lg:mt-16 lg:mb-4 ${darkMode ? 'text-yellow-100' : 'navLink'}`}>&copy; {(new Date).getFullYear()} Jadid Alam. All rights reserved.</h6>
          </footer>
      </div>
  );
}

export default ContactMe;