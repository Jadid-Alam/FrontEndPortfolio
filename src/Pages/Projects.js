import '../index.css';
import {useState, useEffect} from 'react';
import portfolioImage from '../images/portfolioImage.PNG';
import invoiceGif from '../images/InoviceBuilderProjectGif.gif';
import horseGif from '../images/HorseRacingGif.gif';
import hwPortal from '../images/hwPortalGif.gif';
import rustImg from '../images/rust.svg';
import javaImg from '../images/java.svg';
import javascriptImg from '../images/javascript.svg';
import reactImg from '../images/react.svg';
import awsImg from '../images/aws.svg';
import htmlImg from '../images/html.svg';
import cssImg from '../images/css.svg';
import phpImg from '../images/php.svg';
import djangoImg from '../images/django.svg';
import mysqlImg from '../images/mysql.svg';
import pythonImg from '../images/python.png';
import fdmImg from '../images/fdm-expense-app.png';
import awsImgProj from '../images/aws.png';
import ProjectButton from '../Components/ProjectButton.js'
import cplusplusImg from '../images/c++.png'
import tradingAiForgeImg from '../images/TradingAiForgeImg.png'


const Projects = ({darkMode}) => {

    const projectsData = [
    {
        id: 'b8',
        title: 'TradingAiForge (Work In Progress)',
        images: [reactImg,cssImg,javascriptImg,rustImg,cplusplusImg],
        description: 'TradingAIForge is a collaborative group project I\'m currently developing that enables users to build personalized trading bots based on their unique trading styles. The goal is to deliver an intuitive experience focused on ease of customization, with a target of achieving over 80% positive user feedback. Originally a three-person team, the project continued with two active members after one teammate moved on to other commitments.',
        detailImage: { src: tradingAiForgeImg, alt: 'TradingAiForge Image', caption: 'TradingAiForge Image' },
        paragraphs: [
        'The app is built using React and TypeScript for the frontend and leverages Tauri v2 for creating a lightweight, cross-platform desktop application. On the backend, it integrates both Python and C++. Python\'s Tensorflow library handles the machine learning logic, while C++ is used for performance-critical bot execution, including compatibility with MetaTrader 5 for real-time trading.',
        'Users can define entry and exit conditions through a simple UI. The system uses these inputs to train a model using TensorFlow, which learns how and when to trade. The resulting bot is then exported as optimized C++ code, ensuring fast execution in live trading environments. The app also supports loading and editing previous bot configurations for continuous improvement.'
        ],
        transitionDuration: 0.5
    },
    {
        id: 'b7',
        title: 'VPS Server Hosting',
        images: [],
        description: 'I got a VPS to gain hands-on experience with server management and to host both my personal portfolio and the backend for an online game project. It also allowed me to move away from platforms like Vercel and have full control over deployment and performance.',
        detailImage: {  },
        paragraphs: [
        'I configured the VPS from scratch, setting up a secure Linux environment. This included using UFW for firewall management, setting up SSH access with key-based authentication, and disabling password login to enhance security.',
        'For site hosting, I used NGINX as a reverse proxy and configured DNS records to point to my domain. The server has been optimized to handle 50+ concurrent users and has maintained 99.9% uptime since launch.'
        ],
        transitionDuration: 0.5
    },
    {
        id: 'b6',
        title: '1v1 Scramble Game Backend',
        images: [rustImg, awsImg],
        description: 'Developed a real-time multiplayer game backend in Rust, leveraging WebSockets for ultra-low latency. Hosted on AWS, ensuring fast and smooth gameplay.',
        detailImage: { src: awsImgProj, alt: 'AWS Server Status Image', caption: 'AWS Server Status Image' },
        paragraphs: [
        'Originally planned in Python, I chose Rust for its high speed, reducing response times by 40%, crucial for real-time interactions. The backend handles matchmaking, game logic, and seamless synchronization with the front end, ensuring a fluid multiplayer experience.',
        'This project was a deep dive into low-level programming, requiring adaptation from OOP to Rust\'s ownership model. I overcame the learning curve through extensive research, leveraging Rust\'s documentation, Stack Overflow, and Discord communities. The result was a highly scalable backend with efficient word scrambling logic and support for up to 8 concurrent players on AWS Free Tier.'
        ],
        transitionDuration: 0.5
    },
    {
        id: 'b5',
        title: 'FDM Expense App',
        images: [reactImg, cssImg, javascriptImg, djangoImg, mysqlImg, pythonImg],
        description: 'Built a full-stack expense management system using React.js, Django, and MySQL to replace inefficient Excel-based expense tracking.',
        detailImage: { src: fdmImg, alt: 'FDM Expense App Page Image', caption: 'FDM Expense App Page Image' },
        paragraphs: [
        'The system streamlined financial workflows by introducing automated form validation, manager approvals, and real-time claim tracking, reducing processing time by 70%. Employees now submit expenses through a structured system, eliminating errors and manual verification delays.',
        'This was a collaborative project, where I played a key role in ensuring code consistency and best practices. When faced with teammates not following industry standards, I mediated discussions, explained the importance of structured development, and successfully encouraged best practices—leading to a more maintainable and scalable codebase.'
        ],
        transitionDuration: 0.5
    },
    {
        id: 'b4',
        title: 'Full-stack Portfolio',
        images: [reactImg, javascriptImg, rustImg],
        description: 'Developed a personal portfolio website showcasing projects, leveraging Django & MongoDB, later transitioning to a Rust backend for performance improvements.',
        detailImage: { src: portfolioImage, alt: 'Portfolio Image', caption: 'Portfolio Page Image' },
        paragraphs: [
        'This portfolio highlights my technical expertise and adaptability, featuring a modern UI with dark mode and dynamic content updates. Initially built with Django and MongoDB for scalability, I later optimized performance by switching to Rust, ensuring faster response times and enhanced backend efficiency.',
        'I followed an agile development approach, testing features as I built them to ensure seamless functionality. The site has attracted 50+ visitors, demonstrating its effectiveness as a professional showcase of my work.'
        ],
        transitionDuration: 0.5
    },
    {
        id: 'b3',
        title: 'LSC Homework Portal',
        images: [htmlImg, cssImg, javascriptImg, phpImg],
        description: 'Developed a custom homework management system for students and teachers of LSC (London Science Collage) using CSS, PHP on WordPress and Wix.',
        detailImage: { src: hwPortal, alt: 'LSC Homework Portal Gif', caption: 'LSC Homework Portal Gif' },
        paragraphs: [
        'The portal allowed teachers to assign homework and track student submissions via an interactive calendar. Despite Wix\'s restrictive environment and outdated documentation, I found creative solutions, testing multiple methodologies until the system functioned optimally.',
        'Through iterative testing with students, teachers, and the client, I ensured an intuitive and resilient platform. The system is easy to use, hard to break, and enhances academic accountability, benefiting over 100+ students.'
        ],
        transitionDuration: 0.5
    },
    {
        id: 'b2',
        title: 'LSC Invoice Builder',
        images: [javaImg],
        description: 'Developed an automated invoice generation tool using JavaFX, optimizing billing processes and reducing manual data entry by 60%.',
        detailImage: { src: invoiceGif, alt: 'Invoice builder Gif', caption: 'LSC Invoice builder Gif' },
        paragraphs: [
        'Faced with expensive paid APIs for Word document generation, I engineered a custom solution using base APIs, maintaining full functionality without extra costs. This ensured seamless invoice creation, complete with auto-filling features that assume default values when fields are left blank.',
        'Making the application Mac-compatible was another major challenge. After hours of research, I successfully optimized it for cross-platform usage, ensuring usability across different operating systems. The final product significantly reduced workload and improved financial accuracy for over 500 recurring customers.'
        ],
        transitionDuration: 0.5
    },
    {
        id: 'b1',
        title: 'Horse Racing Simulator',
        images: [javaImg],
        description: 'Designed a Java Swing-based betting simulation game, featuring an interactive race experience with an in-game currency system.',
        detailImage: { src: horseGif, alt: 'Horse Racing Simulator Gif', caption: 'Horse Racing Simulator Gif' },
        paragraphs: [
        'Swing’s poor animation handling posed a challenge, but I developed a manual frame update system that emulated smooth movement pixel by pixel, creating a realistic race simulation. Players could place bets and strategize based on race conditions, adding a layer of engagement.',
        'The game attracted over 100+ players, demonstrating strong user retention and interactivity. By implementing an in-game economy, players had an incentive to continue playing, increasing overall engagement.'
        ],
        transitionDuration: 0.5
    },
    ];

    const [fading, setFading] = useState({});
    const [clicked, setClicked] = useState({});

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


    const toggleClick = (event) => {
        const id = event.currentTarget.id;
        document.getElementById(id).scrollIntoView({behavior:'smooth'});
        setClicked((prevState) => ({
            ...prevState,
            [id]: !clicked[id],
        }));
    };

    const defFade = `fade-in duration-1000 ease-in-out`;
    const pStyle = `p-1 py-2 lg:p-3 lg:py-4 text-left z-10 `
    const imageStyle = `w-[10%] mx-[1%] lg:w-[5%] h-[auto] my-auto`;
    const imgDevIcn = `z-10 flex px-[1%]`;
    const projStyle = `overflow-hidden toggle pb-5 lg:pb-8 border-b-2 z-10 duration-500 ease-in-out transform transition-all rounded-sm`;

  return (
        <main className={`${darkMode ? 'dark' : 'light'}`}>
            <div className={`content z-10 pt-14 lg:pt-28 text-center text-mnormal lg:text-normal transform transition-all duration-500 ${darkMode ? 'text-gray-200' : 'text-black'}`}>
                {projectsData.map(project => (
                    <ProjectButton
                        key={project.id}
                        project={project}
                        darkMode={darkMode}
                        clicked={clicked}
                        fading={fading}
                        toggleClick={toggleClick}
                        projStyle={projStyle}
                        imgDevIcn={imgDevIcn}
                        imageStyle={imageStyle}
                        pStyle={pStyle}
                        defFade={defFade}
                    />
                ))}
                

            </div>
        </main>
  );
}


export default Projects;
