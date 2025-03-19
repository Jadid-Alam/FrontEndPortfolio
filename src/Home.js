import './index.css';
import React , {useState, useEffect} from 'react';
import myImage from './images/LeetcodeProfile.PNG';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';
import downImgDark from './images/downArrow.png';
import downImg from './images/downArrowDark.png';
import {motion} from "framer-motion";

const Home = ({darkMode, setDarkMode}) => { 
    const [color, setColor] = useState({r:64, g:0, b:140});
    const [inverse, setInverse] = useState(false);
    const [mouse, setMouse] = useState({x:0, y:0});
    const [fading, setFading] = useState({});
    const [hideNav, setHideNav] = useState(true);
    const colours = [{r:119, g:0, b:225}, {r:47, g:0, b:99}];

    const handleDownload = () => {
      const fileUrl = "/Jadid-Alam-CV.pdf";
      const link = document.createElement('a');

      link.href = fileUrl;
      link.download = "Jadid-Alam-CV.pdf"; 

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    const changeColor = () => {
        setColor((color) => {
            if (color.r > colours[0].r && color.b > colours[0].b) {
                setInverse(true);
            }
            else if (color.r < colours[1].r && color.b < colours[1].b) {
                setInverse(false);
            }

            if (!inverse) {
                const rn = color.r + 8;
                const bn = color.b + 13;
                return {r:rn, g:color.g, b:bn};
            }
            else
            {
                const rn = color.r - 8;
                const bn = color.b - 13;
                return {r:rn, g:color.g, b:bn};
            }

        });
    };

    useEffect(() => {
        const interval = setInterval(changeColor, 70);
        return () => clearInterval(interval);
    }, [color.r]);

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

    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
    const headerStyle = 'fixed z-20 top-0 left-0 w-full text-mnav font-semibold md:text-nav md:font-semibold fade-in duration-1000 ease-in-out';
    const logoStyle = 'p-1 max-w-40 md:p-2';
    const navlinkStyle = 'p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition';
    const textStyle = 'py-96 p-2 text-mheading md:p-3 md:py-96 md:text-heading fade-in duration-1000 ease-in-out';
    const textStyle1 = 'p-1 py-2 md:p-3 md:py-5 fade-in duration-1000 ease-in-out';
    const textStyle2 = 'p-1 py-2 md:p-3 md:py-4 text-left fade-in duration-1000 ease-in-out';

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
      <div className={`fade-in duration-1000 ease-in-out ${darkMode ? 'dark' : 'light'}`}>

        <div className={`${darkMode ? 'gradient-dark' : 'gradient'}`} style={fadingCircle}></div>

          <header className={`${headerStyle} ${darkMode ? 'dark' : 'light'}`}>
                <motion.h4
                    variants={shining}
                    animate="animate"
                    className={logoStyle}>Jadid Alam</motion.h4>
                <nav className="mr-auto my-auto md:my-0 md:mr-auto md:flex">
                  <button onClick={() => setHideNav (prevMode => !prevMode)}><img className='md:hidden md:w-[0px] md:h-0 w-[15px] h-auto mt-auto' src={darkMode ? downImg : downImgDark}/></button>
                  <ul id='navBarMobile' className={`${darkMode ? 'dark' : 'light'} md:flex fade-in duration-1000 ease-in-out ${hideNav ? "hidden" : "absolute block  w-[30%] sm:w-[15%] text-center"}`}>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLinkCurr' : 'navLinkCurr'}`}><Link to='/'>Home</Link></li>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/experience'>Experience</Link></li>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/projects'>Projects</Link></li>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/scramble-minigame'>1v1 Scramble</Link></li>
                  </ul>
                </nav>
                
                <nav className="mr-1 items-end sm:mr-2 md:mr-4">
                  <ul className="flex justify-end">
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><a onClick={handleDownload}>Resume</a></li>
                      <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/contact-me'>Contact Me</Link></li>
                      <button onClick={() => setDarkMode(prevMode => !prevMode)}>
                        <img className='w-[15px] md:w-[35px] h-auto' src={darkMode ? lightModeImage : darkModeImage}/>
                      </button>
                  </ul>
                </nav>
                
            </header>

            <main>
                <div className='content z-10 text-center text-mnormal md:text-normal'>
                  <div>
                      <h2 id='title' className={`${textStyle} ${fading['title'] ? 'opacity-100' : 'opacity-0'} 
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>I am <b style={{ color: colorString }}>Jadid Alam</b>,
                        a programmer pursuing a career in the tech industry.</h2>
                  </div>

                  <div className="py-4 md:py-8">
                        <p id='p1' className={`${textStyle1} ${fading['p1'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>What makes people feel content with their lives? Owning expensive cars? Living in a mansion? Neither.
                            It's having a sense of purpose, goals to strive for!
                        </p>
                      <p id='p2' className={`${textStyle1} ${fading['p2'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Therefore, I make it a priority to set clear goals for myself and organize my daily activities to achieve them.
                          For instance, I focus on completing challenges on LeetCode to enhance my coding skills and improve my acceptance rate.
                      </p>
                      
                      <figure id='img' className={`p-1 py-5 md:p-3 md:py-10 fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            <a href='https://leetcode.com/u/ec23119/'><img src={myImage} alt="LeetCode Profile" style={{ width: '1500px', height: 'auto' }} /></a>
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>LeetCode Profile</figcaption>
                      </figure>
                  </div>

                  <div>

                      <h3 id='title1' className={`p-1 py-2 text-mh3 md:text-h3 md:p-3 md:py-4 text-left 
                      fade-in duration-1000 ease-in-out ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Academic History:</h3>

                      <p id='p3' className={`${textStyle2} ${fading['p3'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>I am currently studying <b style={{ color: colorString }}>Computer Science</b> at <b style={{ color: colorString }}>Queen Mary University of London</b>, where I am exploring programming languages, data structures, and honing my skills as a programmer.
                          My passion for Computer Science began in secondary school, but I initially pursued Engineering due to not taking the subject at GCSE.
                      </p>

                      <p id='p4' className={`${textStyle2} ${fading['p4'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                          After a year at the <b style={{ color: colorString }}>University of Oxford</b> studing <b style={{ color: colorString }}>Engineering</b>, I realised my true interest lay in Computer Science, prompting my transfer to Queen Mary. Here, I am excited to deepen my technical 
                          knowledge and gain practical experience, particularly through an individual project in my final year that will allow me to explore my specific interests within the field.
                      </p>
                  </div>
                </div>
            </main>

            <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center md:mt-16 md:mb-4 ${darkMode ? 'text-yellow-100' : 'navLink'}`}>&copy; {(new Date).getFullYear()} Jadid Alam. All rights reserved.</h6>
            </footer>
      </div>
  );
}

export default Home;
