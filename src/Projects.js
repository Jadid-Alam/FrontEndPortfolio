import './index.css';
import React , {useState, useEffect} from 'react';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';
import portfolioImage from './images/portfolioImage.PNG';
import invoiceGif from './images/InoviceBuilderProjectGif.gif';
import horseGif from './images/HorseRacingGif.gif';
import hwPortal from './images/hwPortalGif.gif';

const Projects = () => {

    const [color, setColor] = useState({r:64, g:0, b:140});
    const [inverse, setInverse] = useState(false);
    const [mouse, setMouse] = useState({x:0, y:0});
    const [fading, setFading] = useState({});
    const [darkMode, setDarkMode] = useState(() => {
      const savedMode = sessionStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : false;
    });
    const [clicked, setClicked] = useState({});

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

    useEffect(() => {
      const toggleElements = document.querySelectorAll('.toggle');

      toggleElements.forEach((element) => {
          setClicked((prevState) => ({
              ...prevState,
              [element.id]: false,
          }));
      });
    }, []);
    

    const toggleClick = (event) => {
      const id = event.currentTarget.id;
      setClicked((prevState) => ({
        ...prevState,
        [id]: !clicked[id],
      }));
    };

    const toggleDarkMode = () => {
        if (darkMode) {
            setDarkMode(false);
        }
        else
        {
            setDarkMode(true);
        }
        sessionStorage.setItem('darkMode', JSON.stringify(darkMode));
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
  return (
      <div className={`fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}> 

        <div className={`${darkMode ? 'gradient-dark' : 'gradient'}`} style={fadingCircle}></div>

          <header className={`fixed z-20 top-0 left-0 w-full text-mnav font-semibold md:text-nav md:font-semibold fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
                <h4 className="p-1 max-w-40 md:p-2" style={{ color: colorString }}>Jadid Alam</h4>
                  <nav className="mr-auto">
                    <ul className="flex">

                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                        hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/'>Home</Link></li>

                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                        hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/experience'>Experience</Link></li>

                        
                        
                        <li className={`p-1 md:p-2  transform transition  hover:text-purple-600 
                        hover:translate-y-1 hover:transform hover:transition ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                          <Link to='/projects'>Projects</Link>
                        </li>

                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                        hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/mini-blog'>Mini-Blog</Link></li>
                        
                        
                        
                    </ul>
                  </nav>
                  
                  <nav className="mr-1 items-end sm:mr-2 md:mr-4">
                    <ul className="flex justify-end">
                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition
                            ${darkMode ? 'text-purple-500' : 'text-black'}`}><a onClick={handleDownload}>Resume</a></li>    
                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition
                            ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/contact-me'>Contact Me</Link></li>
                        <button onClick={toggleDarkMode}><img src={darkMode ? lightModeImage : darkModeImage} style={{ width: '35px', height: 'auto' }} /></button>
                        
                    </ul>
                  </nav>
            </header>

            <main>
                <div className='content z-10 pt-14 md:pt-28 text-center text-mnormal md:text-normal split transform transition-all duration-500'>
                  <button id='b1' className={`toggle pb-10 md:pb-16 z-10 duration-500 ease-in-out transform transition-all rounded-sm
                  ${clicked['b1'] ? 'proj-span split' : 'proj-fade' }
                  ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                  ${darkMode ? 'hover:border-purple-900 hover:border ' : 'hover:border hover:border-purple-300'}
                  `} onClick={toggleClick}>
                      <div className={`z-10`}>
                        <h3 id='title1' className={`p-1 pt-10 text-mh3 md:text-h3 md:p-3 md:pt-16 text-left 
                        fade-in duration-1000 ease-in-out ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Full-stack Portfolio</h3>

                        <p id='descipton1' className={`p-1 py-2 md:p-3 md:py-4 text-left
                          fade-in duration-1000 ease-in-out ${fading['descipton1'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          This personal project is a <b style={{ color: colorString }}>full-stack portfolio</b> that showcases my resume, skills, 
                          experience and my Dynamic Web Development Skills. Including a mini-blog of my professional journey.
                        </p>

                        <small id='small1' className={`text-small
                          fade-in duration-1000 ease-in-out ${fading['small1'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b1'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          Click to View More Detail
                        </small>
                      </div>
                      
                      <figure id='img' className={`p-1 py-5 md:p-3 md:py-10 z-10 ${clicked['b1'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <img src={portfolioImage} alt="LeetCode Profile" style={{ width: '500px', height: 'auto' }} />
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>Portfolio Page Image</figcaption>
                      </figure>

                      <p id='p1' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b1'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p1'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        This project was developed using <b style={{ color: colorString }}>React JS, Tailwind CSS, Django </b> and <b style={{ color: colorString }}>MongoDB </b> 
                         and is hosted on <b style={{ color: colorString }}>Vercel</b>. I made use of reacts hooks to manage states and cause effects such as the dark mode toggle,
                         elements fading in and dynamic colour changing elements.
                      </p>

                      <p id='p2' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b1'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p2'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        Throughout the development of this project, I learned how to make efficient <b style={{ color: colorString }}> Dynamic Web Apps </b>
                         that allows the user to navigate between different pages without having to reload the page with the use of <b style={{ color: colorString }}>Router </b>
                         module from React. I also learned how to Implement <b style={{ color: colorString }}>Django </b> and how React and Django can communicate with each other.
                      </p>
                  </button>

                  <button id='b2' className={`toggle pb-10 md:pb-16 z-10 transform transition-all rounded-sm
                  ${clicked['b2'] ? 'proj-span split' : 'proj-fade' }
                  ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                  ${darkMode ? 'hover:border-purple-900 hover:border ' : 'hover:border hover:border-purple-300'}
                  `} onClick={toggleClick}>
                      <div className={`z-10`}>
                        <h3 id='title2' className={`p-1 pt-10 text-mh3 md:text-h3 md:p-3 md:pt-16 text-left 
                        fade-in duration-1000 ease-in-out ${fading['title2'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>LSC Invoice Builder</h3>

                        <p id='descipton2' className={`p-1 py-2 md:p-3 md:py-4 text-left
                          fade-in duration-1000 ease-in-out ${fading['descipton2'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          This is a <b style={{ color: colorString }}>Commissioned Project </b>that I developed for a client. The project is a <b style={{ color: colorString }}>Invoice Builder </b> 
                          that allows the user to create invoices for their customer, that can be added to the system, with minimal effort. 
                        </p>
                        <small id='small2' className={`text-small
                          fade-in duration-1000 ease-in-out ${fading['small2'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b2'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          Click to View More Detail
                        </small>
                      </div>
                      
                      <figure id='img2' className={`p-1 py-5 md:p-3 md:py-10 z-10 ${clicked['b2'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <img src={invoiceGif} alt="Invoice builder gif" style={{ width: '500px', height: 'auto' }} />
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>Invoice builder</figcaption>
                      </figure>

                      <p id='p3' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b2'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p3'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          This project was developed using <b style={{ color: colorString }}>Java Fx </b> and APIs such as <b style={{ color: colorString }}>iText </b>and 
                          <b style={{ color: colorString }}> Dropbox API </b>to generate PDFs and store the data in a connected Dropbox account.
                      </p>

                      <p id='p4' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b2'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p4'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        During the development of this project, I have learned the importance of using compatible development kits and runtime environments to avoid issues during launch. 
                        I also learned how to use APIs to interact with other services and how to use Java Fx to create a user-friendly interface.
                      </p>
                  </button>

                  <button id='b3' className={`toggle pb-10 md:pb-16 z-10 transform transition-all rounded-sm
                  ${clicked['b3'] ? 'proj-span split' : 'proj-fade' }
                  ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                  ${darkMode ? 'hover:border-purple-900 hover:border ' : 'hover:border hover:border-purple-300'}
                  `} onClick={toggleClick}>
                      <div className={`z-10`}>
                        <h3 id='title3' className={`p-1 pt-10 text-mh3 md:text-h3 md:p-3 md:pt-16 text-left 
                        fade-in duration-1000 ease-in-out ${fading['title3'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Horse Racing Simulator</h3>

                        <p id='descipton3' className={`p-1 py-2 md:p-3 md:py-4 text-left
                          fade-in duration-1000 ease-in-out ${fading['descipton3'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          This is an individual project that I developed, where I developed a Horse racing simulator that allows users to bet on horses and watch the horses
                           race with a winner being declared at the end.
                        </p>

                        <small id='small3' className={`text-small
                          fade-in duration-1000 ease-in-out ${fading['small3'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b3'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          Click to View More Detail
                        </small>
                      </div>
                      
                      <figure id='img3' className={`p-1 py-5 md:p-3 md:py-10 z-10 ${clicked['b3'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <img src={horseGif} alt="Horse Racing Simulator" style={{ width: '500px', height: 'auto' }} />
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>Horse Racing Simulator</figcaption>
                      </figure>

                      <p id='p5' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b3'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p5'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        This project was developed using <b style={{ color: colorString }}>Java's Swing</b> library. I have used object-oriented programming to create
                         classes for horses, interface, betting system etc. I have also used a controller class to manage the interactions between different classes,
                         Which allowed me to avoid code duplication and make the code more readable and maintainable.
                      </p>

                      <p id='p6' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b3'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p6'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        This project has taught me the importance of using object-oriented programming to create reusable classes and methods. I have also learned how vital a
                         controller class is in large projects. I have also learned how to use Java's Swing library to create a user-friendly interfaces.
                      </p>
                  </button>

                  <button id='b4' className={`toggle pb-10 md:pb-16 z-10 transform transition-all rounded-sm
                  ${clicked['b4'] ? 'proj-span split' : 'proj-fade' }
                  ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
                  ${darkMode ? 'hover:border-purple-900 hover:border ' : 'hover:border hover:border-purple-300'}
                  `} onClick={toggleClick}>
                      <div className={`z-10`}>
                        <h3 id='title4' className={`p-1 pt-10 text-mh3 md:text-h3 md:p-3 md:pt-16 text-left 
                        fade-in duration-1000 ease-in-out ${fading['title4'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>LSC Homework Portal</h3>

                        <p id='descipton4' className={`p-1 py-2 md:p-3 md:py-4 text-left
                          fade-in duration-1000 ease-in-out ${fading['descipton4'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          I was <b style={{ color: colorString }}>Commissioned </b> to make a Homework Portal Website for a client that allows teachers to assign homework to students
                           and it allows the students to view their homework through the portal.
                        </p>

                        <small id='small4' className={`text-small
                          fade-in duration-1000 ease-in-out ${fading['small4'] ? 'opacity-100' : 'opacity-0'}
                          ${clicked['b4'] ? 'hidden' : '' }
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          Click to View More Detail
                        </small>
                      </div>
                      
                      <figure id='img4' className={`p-1 py-5 md:p-3 md:py-10 z-10 ${clicked['b4'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <img src={hwPortal} alt="LSC Homework Portal" style={{ width: '500px', height: 'auto' }} />
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>LSC Homework Portal</figcaption>
                      </figure>

                      <p id='p7' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b4'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p7'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        This project was developed using Wix Website builder. The design was made using Wix's drag and drop feature and the functionality was implemented using
                         JavaScript and Wix's APIs. The website was hosted on Wix's servers and Wix's database was used to store the data. Although Wix website builder is very
                         restrictive it is a helpful tool for people who do not have a lot of experience in web development.
                      </p>

                      <p id='p8' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b4'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p8'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        During the development of this project, I have learned how important documentation is to programmers because when I was developing this project, I had to
                         use Wix's documentation to understand how to use their APIs, however the Wix documentation was outdated, meaning I had to use various online sources to
                         understand each API and how to use them.
                      </p>
                  </button>       

              </div>
            </main>

            <footer>
                <h6 className={`content z-10 mt-16 mb-2 text-center md:mt-44 md:mb-4 ${darkMode ? 'text-yellow-100' : 'text-black'}`}>&copy; 2024 Jadid Alam. All rights reserved.</h6>
            </footer>
      </div>
  );
}


export default Projects;
