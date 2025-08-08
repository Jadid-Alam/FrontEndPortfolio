import '../index.css';
import {useState, useEffect} from 'react';
import ExperienceSection from '../Components/ExperienceSection'

const Experience = ({darkMode}) => {
    const experiencesData = [
      {
      id: 'div7',
      title: 'Lab Assistant',
      company: 'Queen Mary University of London',
      paragraphs: [
        {
          id: 'sp7',
          content: 'I was hired to be a lab demonstrator for the following term because of my excellent academic performance in a prior module. I was able to put my extensive knowledge to use in this role by helping current students directly. ',
        },
        {
          id: 'bp7',
          content: 'During lab sessions, my responsibilities included guiding each student individually, breaking down difficult ideas, and assessing their work and offering helpful criticism. My comprehension of the subject was strengthened by this experience, which also improved my capacity to effectively convey technical information.',
        }
      ],
      alignment: 'right'
    },
    {
      id: 'div6',
      title: 'Web Developer',
      company: 'London Science College',
      paragraphs: [
        {
          id: 'sp6',
          content: 'Over the Summer holidays, I worked as a Freelance Web Developer for a company called London Science College. Where I was responsible for creating a website for the company through Wix Website Builder. I was able to create a website that was both visually appealing and user-friendly using mainly JavaScript.',
        },
        {
          id: 'bp6',
          content: 'I was also was volunteering at London Science College, where I learned how to use WordPress to create a website using custom JavaScript and php. I also learned how to use the plugins to add functionality to the website.',
        }
      ],
      alignment: 'left'
    },
    {
      id: 'div5',
      title: 'Software Engineer',
      company: 'London Science College',
      paragraphs: [
        {
          id: 'sp5',
          content: 'Over the Summer holidays, I also worked as a Freelance Software Engineer for a company called London Science College. Where I was responsible for creating an application that allows the company to create customer objects and store them in a database. Then the customer information can be retrieved to make invoices with ease.',
        },
        {
          id: 'bp5',
          content: 'Through this experience, I was able to learn how to use Java FX and APIs to build pdf files and a dropbox API that send and load data from dropbox.',
        }
      ],
      alignment: 'right'
    },
    {
      id: 'div4',
      title: 'Computer Science Tutor',
      company: 'FunTech',
      paragraphs: [
        {
          id: 'sp4',
          content: 'I worked as a summer camp tutor for a month with FunTech, Where I was trained to teach Python and Unity Game Coder.',
        },
        {
          id: 'bp4',
          content: 'During the employment I oversaw teaching course content, following a tight schedule to boost the student\'s learning ability and setting up tech devices to be ready for teaching. This opportunity has developed my organisation skills along with my communication skills through the repeated planning with the team of tutors.',
        }
      ],
      alignment: 'left'
    },
    {
      id: 'div3',
      title: 'GCSE Tutor',
      company: 'London Science College',
      paragraphs: [
        {
          id: 'sp3',
          content: 'I thought GCSE Students on Maths and Physics for more than 2 years with London Science College.',
        },
        {
          id: 'bp3',
          content: 'This helped develop my communication skills and enhanced my ability to express my ideas and it enhanced my teamworking skills by working with other tutors.',
        }
      ],
      alignment: 'right'
    },
    {
      id: 'div2',
      title: 'Counter-Service Assistant',
      company: 'The Co-operative Group',
      paragraphs: [
        {
          id: 'sp2',
          content: 'I worked in customer service in The Co-operative Group, where I interacted with customers providing excellent service.',
        },
        {
          id: 'bp2',
          content: 'This role helped me develop my patience and communication skills further, as I had to deal with a variety of customers and their queries.',
        }
      ],
      alignment: 'left'
    },
    {
      id: 'div1',
      title: 'Pharmacy Assistant',
      company: 'Boots Pharmacy',
      paragraphs: [
        {
          id: 'sp1',
          content: 'I volunteered at Boots Pharmacy, where I was responsible for assisting the pharmacist in inputting precriptions in the NHS system and providing excellent customer service.',
        },
        {
          id: 'bp1',
          content: 'I was also responsible for calling customers to inform them that their prescriptions were ready for collection. This role helped me develop my communication skills and my ability to work in a team.',
        }
      ],
      alignment: 'right'
    }
  ];

    const [fading, setFading] = useState({});
    const [delayedDarkModeLeft, setDelayedDarkModeLeft] = useState('');
    const [delayedDarkModeRight, setDelayedDarkModeRight] = useState('');
    const [borderColor, setBorderColor] = useState('');


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

  return (
      <div className={` fade-in duration-1000 ease-in-out ${darkMode ? 'dark' : 'light'}`}>
          <main>
            <div className='content py-8 text-center text-mnormal lg:text-normal lg:py-16 z-10'>
              {experiencesData.map(experience => (
                <ExperienceSection
                  key={experience.id}
                  experience={experience}
                  darkMode={darkMode}
                  fading={fading}
                  borderColor={borderColor}
                  delayedDarkModeLeft={delayedDarkModeLeft}
                  delayedDarkModeRight={delayedDarkModeRight}
                />
              ))}
            </div>
          </main>
      </div>
  );
};

export default Experience;

