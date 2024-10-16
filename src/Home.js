import './index.css';
import React , {useState, useEffect} from 'react';
import myImage from './images/LeetcodeProfile.PNG';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';

const Home = () => {

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
      <div className={`fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}> 

        <div className={`${darkMode ? 'gradient-dark' : 'gradient'}`} style={fadingCircle}></div>

          <header className={`fixed z-20 top-0 left-0 w-full text-mnav font-semibold md:text-nav md:font-semibold fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
                <h4 className="p-1 max-w-40 md:p-2" style={{ color: colorString }}>Jadid Alam</h4>
                  <nav className="mr-auto">
                    <ul className="flex">
                        <li className={`p-1 md:p-2  transform transition  hover:text-purple-600 
                        hover:translate-y-1 hover:transform hover:transition ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                          <Link to='/'>Home</Link>
                        </li>

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
                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition
                            ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/contact-me'>Contact Me</Link></li>
                        <button onClick={toggleDarkMode}><img src={darkMode ? lightModeImage : darkModeImage} style={{ width: '35px', height: 'auto' }} /></button>
                        
                    </ul>
                  </nav>
            </header>

            <main>
                <div className='content z-10 text-center text-mnormal md:text-normal'>
                  <div>
                      <h2 id='title' className={`py-96 p-2 text-mheading md:p-3 md:py-96 md:text-heading 
                        fade-in duration-1000 ease-in-out ${fading['title'] ? 'opacity-100' : 'opacity-0'} 
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>I am <b style={{ color: colorString }}>Jadid Alam</b>, 
                        a programmer pursuing a career in the tech industry.</h2>
                  </div>

                  <div className="py-4 md:py-8">
                        <p id='p1' className={`p-1 py-2 md:p-3 md:py-5
                            fade-in duration-1000 ease-in-out ${fading['p1'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'text-black'}`}>What makes people feel content with their lives? Owning expensive cars? Living in a mansion? Neither. 
                            It's having a sense of purpose, goals to strive for!
                        </p>
                      <p id='p2' className={`p-1 py-2 md:p-3 md:py-5
                            fade-in duration-500 ease-in-out ${fading['p2'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Therefore, I make it a priority to set clear goals for myself and organize my daily activities to achieve them. 
                          For instance, I focus on completing challenges on LeetCode to enhance my coding skills and improve my acceptance rate.
                      </p>
                      
                      <figure id='img' className={`p-1 py-5 md:p-3 md:py-10
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            <a href='https://leetcode.com/u/ec23119/'><img src={myImage} alt="LeetCode Profile" style={{ width: '1500px', height: 'auto' }} /></a>
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>LeetCode Profile</figcaption>
                      </figure>
                  </div>

                  <div>

                      <h3 id='title1' className={`p-1 py-2 text-mh3 md:text-h3 md:p-3 md:py-4 text-left 
                      fade-in duration-1000 ease-in-out ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Academic History:</h3>

                      <p id='p3' className={`p-1 py-2 md:p-3 md:py-4 text-left
                      fade-in duration-1000 ease-in-out ${fading['p3'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>I am currently studying <b style={{ color: colorString }}>Computer Science</b> at <b style={{ color: colorString }}>Queen Mary University of London</b>, where I am exploring programming languages, data structures, and honing my skills as a programmer. 
                          My passion for Computer Science began in secondary school, but I initially pursued Engineering due to not taking the subject at GCSE.
                      </p>

                      <p id='p4' className={`p-1 py-2 md:p-3 md:py-4 text-left
                      fade-in duration-1000 ease-in-out ${fading['p4'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          After a year at the <b style={{ color: colorString }}>University of Oxford</b> studing <b style={{ color: colorString }}>Engineering</b>, I realized my true interest lay in Computer Science, prompting my transfer to Queen Mary. Here, I am excited to deepen my technical 
                          knowledge and gain practical experience, particularly through an individual project in my final year that will allow me to explore my specific interests within the field.
                      </p>
                  </div>
                </div>
            </main>

            <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center md:mt-16 md:mb-4 ${darkMode ? 'text-yellow-100' : 'text-black'}`}>&copy; 2024 Jadid Alam. All rights reserved.</h6>
            </footer>
      </div>
  );
}

export default Home;
