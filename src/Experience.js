import './index.css';
import React , {useState, useEffect} from 'react';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';
import downImgDark from './images/downArrow.png';
import downImg from './images/downArrowDark.png';
import {motion} from "framer-motion";

const Experience = ({darkMode, setDarkMode}) => {
    const [fading, setFading] = useState({});
    const [delayedDarkModeLeft, setDelayedDarkModeLeft] = useState('');
    const [delayedDarkModeRight, setDelayedDarkModeRight] = useState('');
    const [borderColor, setBorderColor] = useState('');

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


    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedDarkModeLeft(darkMode ? 'exp-left-gradient-dark' : 'exp-left-gradient');
        }, 300);
        return () => clearTimeout(timer);
    }, [darkMode]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedDarkModeRight(darkMode ? 'exp-right-gradient-dark' : 'exp-right-gradient');
        }, 300);
        return () => clearTimeout(timer);
    }, [darkMode]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBorderColor(darkMode ? 'exp-bottom-dark' : 'exp-bottom');
        }, 300);
        return () => clearTimeout(timer);
    },  [darkMode]);


    const headerStyle = 'fixed z-20 top-0 left-0 w-[100vw] text-mnav font-semibold lg:text-nav lg:font-semibold fade-in duration-1000 ease-in-out';
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
        
        <header className={`${headerStyle} ${darkMode ? 'dark' : 'light'}`}>
            <motion.h4
                variants={shining}
                animate="animate"
                className={logoStyle}>Jadid Alam</motion.h4>
              <nav className="mr-auto my-auto lg:my-0 lg:mr-auto lg:flex">
                  <button onClick={() => setHideNav (prevMode => !prevMode)}><img className='lg:hidden lg:w-[0px] lg:h-0 w-[15px] h-auto' src={darkMode ? downImg : downImgDark}/></button>
                  <ul id='navBarMobile' className={`${darkMode ? 'dark' : 'light'} lg:flex fade-in duration-1000 ease-in-out ${hideNav ? "hidden" : "absolute block w-[30%] sm:w-[15%] text-center"}`}>
                  <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/'>Home</Link></li>
                  <li className={`${navlinkStyle} ${darkMode ? 'darkNavLinkCurr' : 'navLinkCurr'}`}><Link to='/experience'>Experience</Link></li>
                  <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/projects'>Projects</Link></li>
                  <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/scramble-minigame'>1v1 Scramble</Link></li>
                </ul>
              </nav>
              
              <nav className="mr-1 items-end sm:mr-2 lg:mr-4">
                <ul className="flex justify-end">
                    <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><a onClick={handleDownload}>Resume</a></li>
                    <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/contact-me'>Contact Me</Link></li>
                    <button onClick={() => setDarkMode(prevMode => !prevMode)}><img className='w-[15px] lg:w-[35px] h-auto' src={darkMode ? lightModeImage : darkModeImage} /></button>
                </ul>
              </nav>
          </header>

          <main>
              <div className='content py-8 text-center text-mnormal lg:text-normal lg:py-16 z-10'>
               
               <div id='div1' className={`flex fade-in ${fading['div1'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform -translate-x-full transition-all duration-1000'}`}> 
                <div className={`py-4 lg:py-8 exp-left ${borderColor}`}>
                  <h3 id='title1' className={`p-1 py-1 text-mh3 lg:text-h3 lg:p-3 lg:py-2 
                    fade-in duration-1000 ease-in-out ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                    ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Web Developer</h3>
                  
                    <p id='sp1' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                        fade-in duration-1000 ease-in-out ${fading['sp1'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                          Over the Summer holidays, I worked as a <motion.span className={`font-bold`} variants={shining} animate='animate'>Freelance Web Developer </motion.span>for a company called London Science College.
                          Where I was responsible for creating a website for the company through Wix Website Builder. I was able to create a website that was both visually
                           appealing and user-friendly using mainly JavaScript.
                    </p>
                    <p id='bp1' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                          fade-in duration-500 ease-in-out ${fading['bp1'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            I was also was volunteering at London Science College, where I learned how to use <motion.span className={`font-bold`} variants={shining} animate='animate'>WordPress</motion.span> to create a website using custom JavaScript and php.
                             I also learned how to use the plugins to add functionality to the website.
                    </p>
                </div>
                <div className={`py-4 lg:py-8 ${delayedDarkModeLeft}`}></div>
               </div>
                
                <div id='div2' className={`flex fade-in ${fading['div2'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform translate-x-full transition-all duration-1000'}`}> 
                  <div className={`py-4 lg:py-8 ${delayedDarkModeRight}`}></div>
                  <div className={`py-4 lg:py-8 exp-right ${borderColor}`}>
                    <h3 id='title2' className={`p-1 py-1 text-mh3 lg:text-h3 lg:p-3 lg:py-2 
                      fade-in duration-1000 ease-in-out ${fading['title2'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Software Engineer</h3>
                    
                      <p id='sp2' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                          fade-in duration-1000 ease-in-out ${fading['sp2'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Over the Summer holidays, I also worked as a <motion.span className={`font-bold`} variants={shining} animate='animate'>Freelance Software Engineer </motion.span>for a company called London Science College.
                             Where I was responsible for creating an application that allows the company to create customer objects and store them in a database. Then the customer information can be retrieved to make
                             invoices with ease.
                      </p>
                      <p id='bp2' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                            fade-in duration-500 ease-in-out ${fading['bp2'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                              Through this experience, I was able to learn how to use <motion.span className={`font-bold`} variants={shining} animate='animate'>Java FX</motion.span> and APIs to build pdf files and a dropbox API that send and
                               load data from dropbox.
                      </p>
                  </div>
                </div>

                <div id='div3' className={`flex fade-in ${fading['div3'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform -translate-x-full transition-all duration-1000'}`}> 
                <div className={`py-4 lg:py-8 exp-left ${borderColor}`}>
                  <h3 id='title3' className={`p-1 py-1 text-mh3 lg:text-h3 lg:p-3 lg:py-2 
                    fade-in duration-1000 ease-in-out ${fading['title3'] ? 'opacity-100' : 'opacity-0'}
                    ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Computer Science Tutor</h3>
                  
                    <p id='sp3' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                        fade-in duration-1000 ease-in-out ${fading['sp3'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                          I worked as a summer camp tutor for a month with <motion.span className={`font-bold`} variants={shining} animate='animate'>FunTech</motion.span>, Where I was trained to teach Python
                          and Unity Game Coder. 
                    </p>
                    <p id='bp3' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                          fade-in duration-500 ease-in-out ${fading['bp3'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            During the employment I oversaw teaching course content, following a tight schedule to boost the student's learning ability and setting up tech devices to be ready for teaching. 
                            This opportunity has developed my organisation skills along with my communication skills through the repeated planning with the team of tutors.
                    </p>
                </div>
                <div className={`py-4 lg:py-8 ${delayedDarkModeLeft}`}></div>
               </div>
                
                <div id='div4' className={`flex fade-in ${fading['div4'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform translate-x-full transition-all duration-1000'}`}> 
                  <div className={`py-4 lg:py-8 ${delayedDarkModeRight}`}></div>
                  <div className={`py-4 lg:py-8 exp-right ${borderColor}`}>
                    <h3 id='title4' className={`p-1 py-1 text-mh3 lg:text-h3 lg:p-3 lg:py-2 
                      fade-in duration-1000 ease-in-out ${fading['title4'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>GCSE Tutor</h3>
                    
                      <p id='sp4' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                          fade-in duration-1000 ease-in-out ${fading['sp4'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            I thought GCSE Students on Maths and Physics for more than 2 years with <motion.span className={`font-bold`} variants={shining} animate='animate'>London Science College. </motion.span>
                      </p>
                      <p id='bp4' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                            fade-in duration-500 ease-in-out ${fading['bp4'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                              This helped develop my communication skills and enhanced my ability to express my ideas and it enhanced my teamworking skills by working with other tutors.
                      </p>
                  </div>
                </div>

                <div id='div5' className={`flex fade-in ${fading['div5'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform -translate-x-full transition-all duration-1000'}`}> 
                <div className={`py-4 lg:py-8 exp-left ${borderColor}`}>
                  <h3 id='title5' className={`p-1 py-1 text-mh3 lg:text-h3 lg:p-3 lg:py-2 
                    fade-in duration-1000 ease-in-out ${fading['title5'] ? 'opacity-100' : 'opacity-0'}
                    ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Counter-Service Assistant</h3>
                  
                    <p id='sp5' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                        fade-in duration-1000 ease-in-out ${fading['sp5'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}> I worked in customer service in <motion.span className={`font-bold`} variants={shining} animate='animate'>The Co-operative Group</motion.span>, where I interacted with customers
                        providing excellent service.
                    </p>
                    <p id='bp5' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                          fade-in duration-500 ease-in-out ${fading['bp5'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            This role helped me develop my patience and communication skills further, as I had to deal with a variety of customers and their queries.
                    </p>
                </div>
                <div className={`py-4 lg:py-8 ${delayedDarkModeLeft}`}></div>
               </div>
                
                <div id='div6' className={`flex fade-in ${fading['div6'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform translate-x-full transition-all duration-1000'}`}> 
                  <div className={`py-4 lg:py-8 ${delayedDarkModeRight}`}></div>
                  <div className={`py-4 lg:py-8 exp-right ${borderColor}`}>
                    <h3 id='title6' className={`p-1 py-1 text-mh3 lg:text-h3 lg:p-3 lg:py-2 
                      fade-in duration-1000 ease-in-out ${fading['title6'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Pharmacy Assistant</h3>
                    
                      <p id='sp6' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                          fade-in duration-1000 ease-in-out ${fading['sp6'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            I volunteered at <motion.span className={`font-bold`} variants={shining} animate='animate'>Boots Pharmacy</motion.span>, where I was responsible for assisting the pharmacist in inputting precriptions in the NHS system and
                             providing excellent customer service.
                      </p>
                      <p id='bp6' className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                            fade-in duration-500 ease-in-out ${fading['bp6'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                              I was also responsible for calling customers to inform them that their prescriptions were ready for collection.
                               This role helped me develop my communication skills and my ability to work in a team.
                      </p>
                  </div>
                </div>
              </div>
          </main>

          <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center lg:mt-16 lg:mb-4 ${darkMode ? 'text-yellow-100' : 'navLink'}`}>&copy; {(new Date).getFullYear()} Jadid Alam. All rights reserved.</h6>
          </footer>
      </div>
  );
};

export default Experience;

