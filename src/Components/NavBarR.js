import '../index.css';
import {useState, useEffect} from 'react';
import darkModeImage from '../images/night-mode.png';
import lightModeImage from '../images/day-mode.png';
import { Link } from 'react-router-dom';
import downImgDark from '../images/downArrow.png';
import downImg from '../images/downArrowDark.png';
import {motion} from "framer-motion";



const NavBarR = ({darkMode, setDarkMode, selectedNav,setSelectedNav}) => {
    const [hideNav, setHideNav] = useState(true);

    const handleDownload = () => {
      const fileUrl = "/Jadid-Alam-CV.pdf";
      const link = document.createElement('a');

      link.href = fileUrl;
      link.download = "Jadid-Alam-CV.pdf"; 

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const headerStyle = 'fixed z-20 top-0 left-0 w-full text-mnav font-semibold lg:text-nav lg:font-semibold fade-in duration-1000 ease-in-out';
    const logoStyle = 'p-1 max-w-40 lg:p-2';
    const navlinkStyle = 'p-1 lg:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition';

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
        <nav className="mr-1 items-end sm:mr-2 lg:mr-4">
            <ul className="flex justify-end">
                <li className={`${navlinkStyle} ${darkMode ? 'darkNavLink' : 'navLink'}`}><a onClick={handleDownload}>Resume</a></li>
                <li className={`${navlinkStyle} ${darkMode ? `${selectedNav === 'contact-me' ? 'darkNavLinkCurr' : 'darkNavLink'}`:`${selectedNav === 'contact-me' ? 'navLinkCurr' : 'navLink'}`}`}><Link onClick={()=>{setSelectedNav('contact-me')}} to='/contact-me'>Contact Me</Link></li>
                <button onClick={() => setDarkMode(prevMode => !prevMode)}>
                <img className='w-[15px] lg:w-[35px] h-auto' src={darkMode ? lightModeImage : darkModeImage}/>
                </button>
            </ul>
        </nav>

    );
}

export default NavBarR;
