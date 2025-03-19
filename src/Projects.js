import './index.css';
import React , {useState, useEffect} from 'react';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';
import portfolioImage from './images/portfolioImage.PNG';
import invoiceGif from './images/InoviceBuilderProjectGif.gif';
import horseGif from './images/HorseRacingGif.gif';
import hwPortal from './images/hwPortalGif.gif';
import downImg from './images/downArrowDark.png';
import downImgDark from './images/downArrow.png';
import {motion} from "framer-motion";
import rustImg from './images/rust.svg';
import javaImg from './images/java.svg';
import javascriptImg from './images/javascript.svg';
import reactImg from './images/react.svg';
import awsImg from './images/aws.svg';
import htmlImg from './images/html.svg';
import cssImg from './images/css.svg';
import phpImg from './images/php.svg';
import djangoImg from './images/django.svg';
import mysqlImg from './images/mysql.svg';
import pythonImg from './images/python.png';
import fdmImg from './images/fdm-expense-app.png';
import awsImgProj from './images/aws.png';


const Projects = ({darkMode, setDarkMode}) => {

    const [mouse, setMouse] = useState({x:0, y:0});
    const [fading, setFading] = useState({});
    const [clicked, setClicked] = useState({});

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
      const toggleElements = document.querySelectorAll('.toggle');

      toggleElements.forEach((element) => {
          setClicked((prevState) => ({
              ...prevState,
              [element.id]: false,
          }));
      });
    }, []);
    



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

    const toggleClick = (event) => {
        const id = event.currentTarget.id;
        document.getElementById(id).scrollIntoView({behavior:'smooth'});
        setClicked((prevState) => ({
            ...prevState,
            [id]: !clicked[id],
        }));
    };

    const defFade = `fade-in duration-1000 ease-in-out`;
    const headerStyle = `fixed z-20 top-0 left-0 w-full text-mnav font-semibold lg:text-nav lg:font-semibold  ${defFade} `;
    const logoStyle = 'p-1 max-w-40 lg:p-2';
    const navlinkStyle = 'p-1 lg:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition';
    const pStyle = `p-1 py-2 lg:p-3 lg:py-4 text-left z-10 `
    const imageStyle = `w-[10%] mx-[1%] lg:w-[5%] h-[auto] my-auto`;
    const imgDevIcn = `z-10 flex px-[1%]`;
    const projStyle = `overflow-hidden toggle pb-5 lg:pb-8 border-b-2 z-10 duration-500 ease-in-out transform transition-all rounded-sm`;

  return (
      <div className={` ${defFade}  ${darkMode ? 'dark' : 'light'}`}>

        <div className={`${darkMode ? 'gradient-dark' : 'gradient'}`} style={fadingCircle}></div>

          <header className={`${headerStyle} ${darkMode ? 'dark' : 'light'}`}>
              <motion.h4
                  variants={shining}
                  animate="animate"
                  className={logoStyle}>Jadid Alam</motion.h4>
                <nav className="mr-auto my-auto lg:my-0 lg:mr-auto lg:flex">
                  <button onClick={() => setHideNav (prevMode => !prevMode)}><img className='lg:hidden lg:w-[0px] lg:h-0 w-[15px] h-auto' src={darkMode ? downImg : downImgDark}/></button>
                  <ul id='navBarMobile' className={`${darkMode ? 'dark' : 'light'} lg:flex  ${defFade}  ${hideNav ? "hidden" : "absolute block sm:w-[15%] text-center"}`}>
                        <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/'>Home</Link></li>
                        <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><Link to='/experience'>Experience</Link></li>
                        <li className={`${navlinkStyle} ${darkMode ? 'darkNavLinkCurr' : 'navLinkCurr'}`}><Link to='/projects'>Projects</Link></li>
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
                <div className={`content z-10 pt-14 lg:pt-28 text-center text-mnormal lg:text-normal transform transition-all duration-500 ${darkMode ? 'text-gray-200' : 'text-black'}`}>

                    <button id='b6' className={` ${projStyle}
                              ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                              ${darkMode ? 'hover:border-purple-900' : 'hover:border-b-purple-300'}`} onClick={toggleClick}>
                        <div className={`z-10`}>
                            <h3 id='title6' className={`p-1 pt-10 text-mh3 lg:text-h3 lg:p-3 lg:pt-16 text-left
                         ${defFade}  ${fading['title6'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>1v1 Scramble Game Backend
                            </h3>

                            <div className={imgDevIcn}>
                                <img src={rustImg} className={imageStyle} />
                                <img src={awsImg} className={imageStyle} />
                            </div>

                            <p id='descipton6' className={`p-1 py-2 lg:p-3 lg:py-4 text-left
                           ${defFade}  ${fading['descipton6'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                Developed a real-time multiplayer game backend in <motion.span className={'front-bold'} variants={shining} animate="animate">Rust</motion.span>, leveraging <motion.span className={'front-bold'} variants={shining} animate="animate">WebSockets</motion.span> for ultra-low latency. Hosted on <motion.span className={'front-bold'} variants={shining} animate="animate">AWS</motion.span>, ensuring fast and smooth gameplay.
                            </p>

                            <small id='small6' className={`text-small
                           ${defFade}  ${fading['small6'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b6'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                Click to View More Detail
                            </small>
                        </div>

                        <motion.div
                            initial={{ height: '0%', opacity: 0 }}
                            animate={{ height: clicked['b6'] ? ['0%','auto'] : ['auto',"0"], opacity: clicked['b6'] ? [0,1] : [1,0] }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className={`overflow-hidden`}>

                            <figure id='img6' className={`p-1 py-5 lg:p-3 lg:py-10 z-10 ${clicked['b6'] ? 'block' : 'hidden' } ${fading['img6'] ? 'opacity-100' : 'opacity-0'}
                             ${defFade}  ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                <img src={awsImgProj} alt="LeetCode Profile" style={{ width: '500px', height: 'auto' }} />
                                <figcaption className='text-mimgcap lg:text-imgcap text-left text-gray-600'>AWS Server Status Image</figcaption>
                            </figure>

                            <p id='p12' className={`${pStyle} 
                             ${defFade}  ${clicked['b6'] ? 'block' : 'hidden' } ${fading['p12'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                Originally planned in Python, I chose <motion.span className={'front-bold'} variants={shining} animate="animate">Rust</motion.span> for its high speed, reducing response times by 40%, crucial for real-time interactions. The backend handles matchmaking, game logic, and seamless synchronization with the front end, ensuring a fluid multiplayer experience.
                            </p>

                            <p id='p11' className={`${pStyle}  
                             ${defFade}  ${clicked['b6'] ? 'block' : 'hidden' } ${fading['p11'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                This project was a deep dive into low-level programming, requiring adaptation from OOP to Rust’s ownership model. I overcame the learning curve through extensive research, leveraging Rust’s documentation, Stack Overflow, and Discord communities. The result was a highly scalable backend with efficient word scrambling logic and support for up to 8 concurrent players on AWS Free Tier.
                            </p>
                        </motion.div>
                    </button>

                    <button id='b5' className={` ${projStyle}
                              ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                              ${darkMode ? 'hover:border-purple-900' : ' hover:border-b-purple-300'}`} onClick={toggleClick}>
                        <div className={`z-10`}>
                            <h3 id='title5' className={`p-1 pt-10 text-mh3 lg:text-h3 lg:p-3 lg:pt-16 text-left
                         ${defFade}  ${fading['title5'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>FDM Expense App
                            </h3>

                            <div className={imgDevIcn}>
                                <img src={reactImg} className={imageStyle} />
                                <img src={cssImg} className={imageStyle} />
                                <img src={javascriptImg} className={imageStyle} />
                                <img src={djangoImg} className={imageStyle} />
                                <img src={mysqlImg} className={imageStyle} />
                                <img src={pythonImg} className={imageStyle} />
                            </div>

                            <p id='descipton5' className={`p-1 py-2 lg:p-3 lg:py-4 text-left
                           ${defFade}  ${fading['descipton5'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                Built a full-stack expense management system using <motion.span className={'front-bold'} variants={shining} animate="animate">React.js</motion.span>, <motion.span className={'front-bold'} variants={shining} animate="animate">Django</motion.span>, and <motion.span className={'front-bold'} variants={shining} animate="animate">MySQL</motion.span> to replace inefficient Excel-based expense tracking.
                            </p>

                            <small id='small5' className={`text-small
                           ${defFade}  ${fading['small5'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b5'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                Click to View More Detail
                            </small>
                        </div>

                        <motion.div
                            initial={{ height: '0%', opacity: 0 }}
                            animate={{ height: clicked['b5'] ? ['0%','auto'] : ['auto',"0"], opacity: clicked['b5'] ? [0,1] : [1,0] }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className={`overflow-hidden`}>

                            <figure id='img5' className={`p-1 py-5 lg:p-3 lg:py-10 z-10 ${clicked['b5'] ? 'block' : 'hidden' } ${fading['img5'] ? 'opacity-100' : 'opacity-0'}
                             ${defFade}  ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                <img src={fdmImg} alt="LeetCode Profile" style={{ width: '100%', height: 'auto' }} />
                                <figcaption className='text-mimgcap lg:text-imgcap text-left text-gray-600'>FDM Expense App Page Image</figcaption>
                            </figure>

                            <p id='p10' className={`${pStyle} 
                             ${defFade}  ${clicked['b5'] ? 'block' : 'hidden' } ${fading['p10'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                The system streamlined financial workflows by introducing automated form validation, manager approvals, and real-time claim tracking, reducing processing time by 70%. Employees now submit expenses through a structured system, eliminating errors and manual verification delays.
                            </p>

                            <p id='p9' className={`${pStyle}  
                             ${defFade}  ${clicked['b5'] ? 'block' : 'hidden' } ${fading['p9'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                This was a collaborative project, where I played a key role in ensuring code consistency and best practices. When faced with teammates not following industry standards, I mediated discussions, explained the importance of structured development, and successfully encouraged best practices—leading to a more maintainable and scalable codebase.
                            </p>
                        </motion.div>
                    </button>

                <button id='b1' className={` ${projStyle}
                              ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                              ${darkMode ? 'hover:border-purple-900' : 'hover:border-b-purple-300'}`} onClick={toggleClick}>
                    <div className={`z-10`}>
                        <h3 id='title1' className={`p-1 pt-10 text-mh3 lg:text-h3 lg:p-3 lg:pt-16 text-left
                         ${defFade}  ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Full-stack Portfolio</h3>

                        <div className={imgDevIcn}>
                            <img src={reactImg} className={imageStyle} />
                            <img src={javascriptImg} className={imageStyle} />
                        </div>

                        <p id='descipton1' className={`p-1 py-2 lg:p-3 lg:py-4 text-left
                           ${defFade}  ${fading['descipton1'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Developed a personal portfolio website showcasing projects, leveraging <motion.span className={'front-bold'} variants={shining} animate="animate">React.js</motion.span> and originally <motion.span className={'front-bold'} variants={shining} animate="animate">Django & MongoDB</motion.span>, later transitioning to a Rust backend for performance improvements.
                        </p>

                        <small id='small1' className={`text-small
                           ${defFade}  ${fading['small1'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b1'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Click to View More Detail
                        </small>
                    </div>

                    <motion.div
                        initial={{ height: '0%', opacity: 0 }}
                        animate={{ height: clicked['b1'] ? ['0%','auto'] : ['auto',"0"], opacity: clicked['b1'] ? [0,1] : [1,0] }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`overflow-hidden`}>

                        <figure id='img' className={`p-1 py-5 lg:p-3 lg:py-10 z-10 ${clicked['b1'] ? 'block' : 'hidden' } ${fading['img'] ? 'opacity-100' : 'opacity-0'}
                             ${defFade}  ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            <img src={portfolioImage} alt="LeetCode Profile" style={{ width: '500px', height: 'auto' }} />
                            <figcaption className='text-mimgcap lg:text-imgcap text-left text-gray-600'>Portfolio Page Image</figcaption>
                        </figure>

                        <p id='p1' className={`${pStyle} 
                             ${defFade}  ${clicked['b1'] ? 'block' : 'hidden' } ${fading['p1'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            This portfolio highlights my technical expertise and adaptability, featuring a modern UI with dark mode and dynamic content updates. Initially built with Django and MongoDB for scalability, I later optimized performance by switching to Rust, ensuring faster response times and enhanced backend efficiency.
                        </p>

                        <p id='p2' className={`${pStyle}  
                             ${defFade}  ${clicked['b1'] ? 'block' : 'hidden' } ${fading['p2'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            I followed an agile development approach, testing features as I built them to ensure seamless functionality. The site has attracted 50+ visitors, demonstrating its effectiveness as a professional showcase of my work.
                        </p>
                    </motion.div>
                </button>

                    <button id='b4' className={` ${projStyle}
                              ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                              ${darkMode ? 'hover:border-purple-900' : 'hover:border-b-purple-300'}`} onClick={toggleClick}>
                        <div className={`z-10`}>
                            <h3 id='title4' className={`p-1 pt-10 text-mh3 lg:text-h3 lg:p-3 lg:pt-16 text-left
                         ${defFade}  ${fading['title4'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>LSC Homework Portal</h3>

                            <div className={imgDevIcn}>
                                <img src={htmlImg} className={imageStyle} />
                                <img src={cssImg} className={imageStyle} />
                                <img src={javascriptImg} className={imageStyle} />
                                <img src={phpImg} className={imageStyle} />
                            </div>

                            <p id='descipton4' className={`p-1 py-2 lg:p-3 lg:py-4 text-left
                           ${defFade}  ${fading['descipton4'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                Developed a custom homework management system using <motion.span className={'front-bold'} variants={shining} animate="animate">JavaScript</motion.span>, <motion.span className={'front-bold'} variants={shining} animate="animate">CSS</motion.span>, and <motion.span className={'front-bold'} variants={shining} animate="animate">PHP</motion.span> on <motion.span className={'front-bold'} variants={shining} animate="animate">WordPress & Wix</motion.span>.
                            </p>

                            <small id='small4' className={`text-small
                           ${defFade}  ${fading['small4'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b4'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                Click to View More Detail
                            </small>
                        </div>

                        <motion.div
                            initial={{ height: '0%', opacity: 0 }}
                            animate={{ height: clicked['b4'] ? ['0%','auto'] : ['auto',"0"], opacity: clicked['b4'] ? 1 : 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className={`overflow-hidden`}>
                            <figure id='img4' className={`p-1 py-5 lg:p-3 lg:py-10 z-10 ${clicked['b4'] ? 'block' : 'hidden' }
                             ${defFade}  ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                <img src={hwPortal} alt="LSC Homework Portal" style={{ width: '500px', height: 'auto' }} />
                                <figcaption className='text-mimgcap lg:text-imgcap text-left text-gray-600'>LSC Homework Portal</figcaption>
                            </figure>

                            <p id='p7' className={`${pStyle} ${clicked['b4'] ? 'block' : 'hidden' }
                             ${defFade}  ${fading['p7'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                The portal allowed teachers to assign homework and track student submissions via an interactive calendar. Despite Wix's restrictive environment and outdated documentation, I found creative solutions, testing multiple methodologies until the system functioned optimally.
                            </p>

                            <p id='p8' className={`${pStyle} ${clicked['b4'] ? 'block' : 'hidden' }
                             ${defFade}  ${fading['p8'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                                Through iterative testing with students, teachers, and the client, I ensured an intuitive and resilient platform. The system is easy to use, hard to break, and enhances academic accountability, benefiting over 100+ students.
                            </p>
                        </motion.div>
                    </button>

                <button id='b2' className={` ${projStyle}
                              ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                              ${darkMode ? 'hover:border-purple-900' : 'hover:border-b-purple-300'}`} onClick={toggleClick}>
                    <div className={`z-10`}>
                        <h3 id='title2' className={`p-1 pt-10 text-mh3 lg:text-h3 lg:p-3 lg:pt-16 text-left
                         ${defFade}  ${fading['title2'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>LSC Invoice Builder</h3>

                        <div className={imgDevIcn}>
                            <img src={javaImg} className={imageStyle} />
                        </div>

                        <p id='descipton2' className={`p-1 py-2 lg:p-3 lg:py-4 text-left
                           ${defFade}  ${fading['descipton2'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Developed an automated invoice generation tool using <motion.span className={'front-bold'} variants={shining} animate="animate">JavaFX</motion.span>, optimizing billing processes and reducing manual data entry by 60%.
                        </p>
                        <small id='small2' className={`text-small
                           ${defFade}  ${fading['small2'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b2'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Click to View More Detail
                        </small>
                    </div>

                    <motion.div
                        initial={{ height: '0%', opacity: 0 }}
                        animate={{ height: clicked['b2'] ? ['0%','auto'] : ['auto',"0"], opacity: clicked['b2'] ? 1 : 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className={`overflow-hidden`}>
                        <figure id='img2' className={`p-1 py-5 lg:p-3 lg:py-10 z-10 ${clicked['b2'] ? 'block' : 'hidden' }
                             ${defFade}  ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            <img src={invoiceGif} alt="Invoice builder gif" style={{ width: '500px', height: 'auto' }} />
                            <figcaption className='text-mimgcap lg:text-imgcap text-left text-gray-600'>Invoice builder</figcaption>
                        </figure>

                        <p id='p3' className={`${pStyle} ${clicked['b2'] ? 'block' : 'hidden' }
                             ${defFade}  ${fading['p3'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Faced with expensive paid APIs for Word document generation, I engineered a custom solution using base APIs, maintaining full functionality without extra costs. This ensured seamless invoice creation, complete with auto-filling features that assume default values when fields are left blank.
                        </p>

                        <p id='p4' className={`${pStyle} ${clicked['b2'] ? 'block' : 'hidden' }
                             ${defFade}  ${fading['p4'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Making the application Mac-compatible was another major challenge. After hours of research, I successfully optimized it for cross-platform usage, ensuring usability across different operating systems. The final product significantly reduced workload and improved financial accuracy for over 500 recurring customers.
                        </p>
                    </motion.div>
                </button>

                <button id='b3' className={` ${projStyle}
                              ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                              ${darkMode ? 'hover:border-purple-900' : 'hover:border-b-purple-300'}`} onClick={toggleClick}>
                    <div className={`z-10`}>
                        <h3 id='title3' className={`p-1 pt-10 text-mh3 lg:text-h3 lg:p-3 lg:pt-16 text-left
                         ${defFade}  ${fading['title3'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Horse Racing Simulator</h3>

                        <div className={imgDevIcn}>
                            <img src={javaImg} className={imageStyle} />
                        </div>

                        <p id='descipton3' className={`p-1 py-2 lg:p-3 lg:py-4 text-left
                           ${defFade}  ${fading['descipton3'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Designed a Java Swing-based betting simulation game, featuring an interactive race experience with an in-game currency system.
                        </p>

                        <small id='small3' className={`text-small
                           ${defFade}  ${fading['small3'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b3'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Click to View More Detail
                        </small>
                    </div>

                    <motion.div
                        initial={{ height: '0%', opacity: 0 }}
                        animate={{ height: clicked['b3'] ? ['0%','auto'] : ['auto',"0"], opacity: clicked['b3'] ? 1 : 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className={`overflow-hidden`}>
                        <figure id='img3' className={`p-1 py-5 lg:p-3 lg:py-10 z-10 ${clicked['b3'] ? 'block' : 'hidden' }
                             ${defFade}  ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            <img src={horseGif} alt="Horse Racing Simulator" style={{ width: '500px', height: 'auto' }} />
                            <figcaption className='text-mimgcap lg:text-imgcap text-left text-gray-600'>Horse Racing Simulator</figcaption>
                        </figure>

                        <p id='p5' className={`${pStyle} ${clicked['b3'] ? 'block' : 'hidden' }
                             ${defFade}  ${fading['p5'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            Swing’s poor animation handling posed a challenge, but I developed a manual frame update system that emulated smooth movement pixel by pixel, creating a realistic race simulation. Players could place bets and strategize based on race conditions, adding a layer of engagement.
                        </p>

                        <p id='p6' className={`${pStyle} ${clicked['b3'] ? 'block' : 'hidden' }
                             ${defFade}  ${fading['p6'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            The game attracted over 100+ players, demonstrating strong user retention and interactivity. By implementing an in-game economy, players had an incentive to continue playing, increasing overall engagement.
                        </p>
                    </motion.div>
                </button>

              </div>
            </main>

            <footer>
                <h6 className={`content z-10 mt-16 mb-2 text-center lg:mt-44 lg:mb-4 ${darkMode ? 'text-yellow-100' : 'navLink'}`}>&copy; {(new Date).getFullYear()} Jadid Alam. All rights reserved.</h6>
            </footer>
      </div>
  );
}


export default Projects;
