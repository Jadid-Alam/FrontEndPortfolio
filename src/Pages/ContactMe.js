import '../index.css';
import {useState, useEffect} from 'react';
import gmailImage from '../images/gmail.png';
import linkedinImage from '../images/linkedin.png';
import githubImage from '../images/github.png';
import phoneImage from '../images/telephone.png';
import {motion} from "framer-motion";

const ContactMe = ({darkMode}) => {
    const [fading, setFading] = useState({});

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
    <main className={`h-screen ${darkMode ? 'dark' : 'light'}`}>
        <div className={`content text-center text-mnormal lg:text-normal split z-10 `}>
          <div>
              <h2 id='title' className={`py-16 p-2 text-mheading lg:p-3 lg:py-64 lg:text-heading 
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
  );
}

export default ContactMe;