import './index.css';
import React , {useState, useEffect} from 'react';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';
import gmailImage from './images/gmail.png';
import linkedinImage from './images/linkedin.png';
import githubImage from './images/github.png';
import phoneImage from './images/telephone.png';

const ContactMe = () => {

    const [color, setColor] = useState({r:64, g:0, b:140});
    const [inverse, setInverse] = useState(false);
    const [mouse, setMouse] = useState({x:0, y:0});
    const [fading, setFading] = useState({});
    const [darkMode, setDarkMode] = useState(() => {
      const savedMode = sessionStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : false;
    });

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
      <div className={` fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}> 
        <div className={`${darkMode ? 'gradient-dark' : 'gradient'}`} style={fadingCircle}></div>
        <header className={`fixed z-20 top-0 left-0 w-full text-mnav font-semibold md:text-nav md:font-semibold fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
              <h4 className="p-1 max-w-40 md:p-2" style={{ color: colorString }}>Jadid Alam</h4>
                <nav className="mr-auto">
                  <ul className="flex">
                      <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition
                          ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/'>Home</Link></li>

                      <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                      hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/experience'>Experience</Link></li>

                      <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                      hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/projects'>Projects</Link></li>

                      <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                      hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/mini-blog'>Mini-Blog</Link></li>
                      
                      
                  </ul>
                </nav>
                
                <nav className="mr-1 items-end sm:mr-2 md:mr-4">
                  <ul className="flex justify-end">
                      <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition
                          ${darkMode ? 'text-purple-500' : 'text-black'}`}><a onClick={handleDownload}>Resume</a></li>  
                      

                      <li className={`p-1 md:p-2  transform transition  hover:text-purple-600 
                      hover:translate-y-1 hover:transform hover:transition ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                        <Link to='/contact-me'>Contact Me</Link>
                      </li>
                      <button onClick={toggleDarkMode}><img  src={darkMode ? lightModeImage : darkModeImage} style={{ width: '35px', height: 'auto' }} alt='DarkMode button' /></button>
                      
                  </ul>
                </nav>
          </header>

          <main>
              <div className='content text-center text-mnormal md:text-normal split z-10'> 
                <div>
                    <h2 id='title' className={`py-20 p-2 text-mheading md:p-3 md:py-64 md:text-heading 
                      fade-in duration-1000 ease-in-out ${fading['title'] || 1==1 ? 'opacity-100' : 'opacity-0'} 
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Interested in <b style={{color: colorString}}>collaborating</b> or have any inquiries? Feel free to <b style={{color: colorString}}>reach out</b>.</h2>
                </div>

                <div className="pb-16 md:py-40 grid grid-cols-2 grid-rows-2">
                    
                    <figure id='gmail' className={`p-5 py-4 md:p-10 md:py-5
                      fade-in duration-1000 ease-in-out 
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <a id='gmail-link' href='mailto:jadid.alam.08@gmail.com'>
                            <img id='gmail-img' src={gmailImage} 
                            alt="Email: jadid.alam.08@gmail.com" style={{ width: '200px', height: 'auto' }} />
                          </a>
                        <figcaption id='gmail-cap' className='text-mimgcap md:text-imgcap text-gray-500'>Email: jadid.alam.08@gmail.com</figcaption>
                    </figure>

                    <figure id='github' className={`p-5 py-4 md:p-10 md:py-5
                      fade-in duration-1000 ease-in-out 
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <a href='https://github.com/Jadid-Alam?tab=repositories'><img src={githubImage} alt="My GitHub repository" style={{ width: '200px', height: 'auto' }} /></a>
                        <figcaption className='text-mimgcap md:text-imgcap text-gray-500'>My GitHub repository</figcaption>
                    </figure>

                    <figure id='linkedin' className={`p-5 py-4 md:p-10 md:py-5
                      fade-in duration-1000 ease-in-out 
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <a href='https://www.linkedin.com/in/jadid-alam-b57a112a5/'><img src={linkedinImage} alt="My Linked-in Profile" style={{ width: '200px', height: 'auto' }} /></a>
                        <figcaption className='text-mimgcap md:text-imgcap text-gray-500'>My Linked-in Profile</figcaption>
                    </figure>

                    <figure id='phone' className={`p-5 py-4 md:p-10 md:py-5
                      fade-in duration-1000 ease-in-out 
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <a href='tel:+447491277476'><img src={phoneImage} alt="Phone: +447491277476" style={{ width: '200px', height: 'auto' }} /></a>
                        <figcaption className='text-mimgcap md:text-imgcap text-gray-500'>Phone: +447491277476</figcaption>
                    </figure>
                </div>

              </div>
          </main>

          <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center md:mt-16 md:mb-4 ${darkMode ? 'text-yellow-100' : 'text-black'}`}>&copy; 2024 Jadid Alam. All rights reserved.</h6>
          </footer>
      </div>
  );
}

export default ContactMe;