import './index.css';
import React , {useState, useEffect} from 'react';
import myImage from './images/LeetcodeProfile.PNG';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';

const Experience = () => {
    const [color, setColor] = useState({r:64, g:0, b:140});
    const [inverse, setInverse] = useState(false);
    const [fading, setFading] = useState({});
    const [darkMode, setDarkMode] = useState(() => {
      const savedMode = sessionStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : false;
    });
    const [delayedDarkModeLeft, setDelayedDarkModeLeft] = useState('');
    const [delayedDarkModeRight, setDelayedDarkModeRight] = useState('');
    const [borderColor, setBorderColor] = useState('');

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

  
    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
  return (
      <div className={`fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}> 
        
        <header className={`fixed z-20 top-0 left-0 w-full text-mnav font-semibold md:text-nav  md:font-semibold fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
              <h4 className="p-1 max-w-40 md:p-2" style={{ color: colorString }}>Jadid Alam</h4>
                <nav className="mr-auto">
                  <ul className="flex">
                    
                    <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                      hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/'>Home</Link></li>

                      <li className={`p-1 md:p-2  transform transition  hover:text-purple-600 
                      hover:translate-y-1 hover:transform hover:transition ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                        <Link to='/experience'>Experience</Link>
                      </li>
                      
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
              <div className='content py-8 text-center text-mnormal md:text-normal md:py-16 z-10'>
               
               <div id='div1' className={`flex fade-in ${fading['div1'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform -translate-x-full transition-all duration-1000'}`}> 
                <div className={`py-4 md:py-8 exp-left ${borderColor}`}>
                  <h3 id='title1' className={`p-1 py-1 text-mh3 md:text-h3 md:p-3 md:py-2 
                    fade-in duration-1000 ease-in-out ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                    ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Web Developer</h3>
                  
                    <p id='sp1' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                        fade-in duration-1000 ease-in-out ${fading['sp1'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          Over the Summer holidays, I worked as a <b style={{ color: colorString }}>Freelance Web Developer </b>for a company called London Science College.
                          Where I was responsible for creating a website for the company through Wix Website Builder. I was able to create a website that was both visually
                           appealing and user-friendly using mainly JavaScript.
                    </p>
                    <p id='bp1' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                          fade-in duration-500 ease-in-out ${fading['bp1'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            I was also was volunteering at London Science College, where I learned how to use <b style={{ color: colorString }}>WordPress</b> to create a website using custom JavaScript and php.
                             I also learned how to use the plugins to add functionality to the website.
                    </p>
                </div>
                <div className={`py-4 md:py-8 ${delayedDarkModeLeft}`}></div>
               </div>
                
                <div id='div2' className={`flex fade-in ${fading['div2'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform translate-x-full transition-all duration-1000'}`}> 
                  <div className={`py-4 md:py-8 ${delayedDarkModeRight}`}></div>
                  <div className={`py-4 md:py-8 exp-right ${borderColor}`}>
                    <h3 id='title2' className={`p-1 py-1 text-mh3 md:text-h3 md:p-3 md:py-2 
                      fade-in duration-1000 ease-in-out ${fading['title2'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Software Engineer</h3>
                    
                      <p id='sp2' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                          fade-in duration-1000 ease-in-out ${fading['sp2'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            Over the Summer holidays, I also worked as a <b style={{ color: colorString }}>Freelance Software Engineer </b>for a company called London Science College.
                             Where I was responsible for creating an application that allows the company to create customer objects and store them in a database. Then the customer information can be retrieved to make
                             invoices with ease.
                      </p>
                      <p id='bp2' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                            fade-in duration-500 ease-in-out ${fading['bp2'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                              Through this experience, I was able to learn how to use <b style={{ color: colorString }}>Java FX</b> and APIs to build pdf files and a dropbox API that send and
                               load data from dropbox.
                      </p>
                  </div>
                </div>

                <div id='div3' className={`flex fade-in ${fading['div3'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform -translate-x-full transition-all duration-1000'}`}> 
                <div className={`py-4 md:py-8 exp-left ${borderColor}`}>
                  <h3 id='title3' className={`p-1 py-1 text-mh3 md:text-h3 md:p-3 md:py-2 
                    fade-in duration-1000 ease-in-out ${fading['title3'] ? 'opacity-100' : 'opacity-0'}
                    ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Computer Science Tutor</h3>
                  
                    <p id='sp3' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                        fade-in duration-1000 ease-in-out ${fading['sp3'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          I worked as a summer camp tutor for a month with <b style={{ color: colorString }}>FunTech</b>, Where I was trained to teach Python 
                          and Unity Game Coder. 
                    </p>
                    <p id='bp3' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                          fade-in duration-500 ease-in-out ${fading['bp3'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            During the employment I oversaw teaching course content, following a tight schedule to boost the student's learning ability and setting up tech devices to be ready for teaching. 
                            This opportunity has developed my organisation skills along with my communication skills through the repeated planning with the team of tutors.
                    </p>
                </div>
                <div className={`py-4 md:py-8 ${delayedDarkModeLeft}`}></div>
               </div>
                
                <div id='div4' className={`flex fade-in ${fading['div4'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform translate-x-full transition-all duration-1000'}`}> 
                  <div className={`py-4 md:py-8 ${delayedDarkModeRight}`}></div>
                  <div className={`py-4 md:py-8 exp-right ${borderColor}`}>
                    <h3 id='title4' className={`p-1 py-1 text-mh3 md:text-h3 md:p-3 md:py-2 
                      fade-in duration-1000 ease-in-out ${fading['title4'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>GCSE Tutor</h3>
                    
                      <p id='sp4' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                          fade-in duration-1000 ease-in-out ${fading['sp4'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            I thought GCSE Students on Maths and Physics for more than 2 years with <b style={{ color: colorString }}>London Science College. </b>
                      </p>
                      <p id='bp4' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                            fade-in duration-500 ease-in-out ${fading['bp4'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                              This helped develop my communication skills and enhanced my ability to express my ideas and it enhanced my teamworking skills by working with other tutors.
                      </p>
                  </div>
                </div>

                <div id='div5' className={`flex fade-in ${fading['div5'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform -translate-x-full transition-all duration-1000'}`}> 
                <div className={`py-4 md:py-8 exp-left ${borderColor}`}>
                  <h3 id='title5' className={`p-1 py-1 text-mh3 md:text-h3 md:p-3 md:py-2 
                    fade-in duration-1000 ease-in-out ${fading['title5'] ? 'opacity-100' : 'opacity-0'}
                    ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Counter-Service Assistant</h3>
                  
                    <p id='sp5' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                        fade-in duration-1000 ease-in-out ${fading['sp5'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}> I worked in customer service in <b style={{ color: colorString }}>The Co-operative Group</b>, where I interacted with customers
                        providing excellent service.
                    </p>
                    <p id='bp5' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                          fade-in duration-500 ease-in-out ${fading['bp5'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            This role helped me develop my patience and communication skills further, as I had to deal with a variety of customers and their queries.
                    </p>
                </div>
                <div className={`py-4 md:py-8 ${delayedDarkModeLeft}`}></div>
               </div>
                
                <div id='div6' className={`flex fade-in ${fading['div6'] ? 'opacity-100 transform translate-x-0 transition-all duration-1000' : 'opacity-0 transform translate-x-full transition-all duration-1000'}`}> 
                  <div className={`py-4 md:py-8 ${delayedDarkModeRight}`}></div>
                  <div className={`py-4 md:py-8 exp-right ${borderColor}`}>
                    <h3 id='title6' className={`p-1 py-1 text-mh3 md:text-h3 md:p-3 md:py-2 
                      fade-in duration-1000 ease-in-out ${fading['title6'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Pharmacy Assistant</h3>
                    
                      <p id='sp6' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                          fade-in duration-1000 ease-in-out ${fading['sp6'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            I volunteered at <b style={{ color: colorString }}>Boots Pharmacy</b>, where I was responsible for assisting the pharmacist in inputting precriptions in the NHS system and
                             providing excellent customer service.
                      </p>
                      <p id='bp6' className={`p-1 py-1 md:p-3 md:py-2 text-mnormal md:text-normal
                            fade-in duration-500 ease-in-out ${fading['bp6'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                              I was also responsible for calling customers to inform them that their prescriptions were ready for collection.
                               This role helped me develop my communication skills and my ability to work in a team.
                      </p>
                  </div>
                </div>
              </div>
          </main>

          <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center md:mt-16 md:mb-4 ${darkMode ? 'text-yellow-100' : 'text-black'}`}>&copy; 2024 Jadid Alam. All rights reserved.</h6>
          </footer>
      </div>
  );
};

export default Experience;

