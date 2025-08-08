import '../index.css';
import {useState, useEffect} from 'react';
import myImage from '../images/LeetcodeProfile.png';
import {motion} from "framer-motion";


const Home = ({darkMode}) => {
    
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

    const textStyle = 'py-96 p-2 text-mheading lg:p-3 lg:py-96 lg:text-heading fade-in duration-1000 ease-in-out';
    const textStyle1 = 'p-1 py-2 lg:p-3 lg:py-5 fade-in duration-1000 ease-in-out';
    const textStyle2 = 'p-1 py-2 lg:p-3 lg:py-4 text-left fade-in duration-1000 ease-in-out';

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


            <main>
                <div className='content z-10 text-center text-mnormal lg:text-normal'>
                  <div>
                      <h2 id='title' className={`${textStyle} ${fading['title'] ? 'opacity-100' : 'opacity-0'} 
                        ${darkMode ? 'text-yellow-100' : 'navLink'}`}>I am <motion.span className={`font-bold`} variants={shining} animate="animate">Jadid Alam</motion.span>,
                        a programmer pursuing a career in the tech industry.</h2>
                  </div>

                  <div className="py-4 lg:py-8">
                        <p id='p1' className={`${textStyle1} ${fading['p1'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>What makes people feel content with their lives? Owning expensive cars? Living in a mansion? Neither.
                            It's having a sense of purpose, goals to strive for!
                        </p>
                      <p id='p2' className={`${textStyle1} ${fading['p2'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Therefore, I make it a priority to set clear goals for myself and organize my daily activities to achieve them. For instance, I often challenge myself using LeetCode to enhance my problem-solving skills and improve my understanding of coding.
                      </p>
                      
                      <figure id='img' className={`p-1 py-5 lg:p-3 lg:py-10 fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                            <a href='https://leetcode.com/u/jadid-alam/'><img src={myImage} alt="LeetCode Profile" style={{ width: '1500px', height: 'auto' }} /></a>
                          <figcaption className='text-mimgcap lg:text-imgcap text-gray-600'>LeetCode Profile</figcaption>
                      </figure>
                  </div>

                  <div>

                      <h3 id='title1' className={`p-1 py-2 text-mh3 lg:text-h3 lg:p-3 lg:py-4 text-left 
                      fade-in duration-1000 ease-in-out ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>Academic History:</h3>

                      <p id='p3' className={`${textStyle2} ${fading['p3'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>I am currently studying <motion.span className={`font-bold`} variants={shining} animate="animate">Computer Science</motion.span> at <motion.span className={`font-bold`} variants={shining} animate="animate">Queen Mary University of London</motion.span>, where I am exploring programming languages, data structures, and honing my skills as a programmer.
                          My passion for Computer Science began in secondary school, but I initially pursued Engineering due to not taking the subject at GCSE.
                      </p>

                      <p id='p4' className={`${textStyle2} ${fading['p4'] ? 'opacity-100' : 'opacity-0'}
                      ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                          After a year at the <motion.span className={`font-bold`} variants={shining} animate="animate">University of Oxford</motion.span> studying <motion.span className={`font-bold`} variants={shining} animate="animate">Engineering</motion.span>, I realised my true interest lay in Computer Science, prompting my transfer to Queen Mary. Here, I am excited to deepen my technical
                          knowledge and gain practical experience, particularly through an individual project in my final year that will allow me to explore my specific interests within the field.
                      </p>
                  </div>
                </div>
            </main>

            
      </div>
  );
}

export default Home;
