import '../index.css';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import downImgDark from '../images/downArrow.png';
import downImg from '../images/downArrowDark.png';

const NavBarL = ({darkMode, selectedNav, setSelectedNav}) => {
    const [hideNav, setHideNav] = useState(true);

    const navlinkStyle = 'p-1 lg:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition';

    useEffect(() => {
      if (window.innerWidth > 768) {
        setHideNav(true);
      }
    }
    , [window.innerWidth]);

   
    return (
        <nav className="mr-auto my-auto lg:my-0 lg:mr-auto lg:flex">
            <button onClick={() => setHideNav (prevMode => !prevMode)}><img className='lg:hidden lg:w-[0px] lg:h-0 w-[15px] h-auto mt-auto' src={darkMode ? downImg : downImgDark}/></button>
            <ul id='navBarMobile' className={`${darkMode ? 'dark' : 'light'} lg:flex fade-in duration-1000 ease-in-out ${hideNav ? "hidden" : "absolute block  w-[30%] sm:w-[15%] text-center"}`}>
                <li className={`${navlinkStyle} ${darkMode ? `${selectedNav === 'home' ? 'darkNavLinkCurr' : 'darkNavLink'}`:`${selectedNav === 'home' ? 'navLinkCurr' : 'navLink'}`}`}><Link onClick={()=>{setSelectedNav('home')}} to='/home'>Home</Link></li>
                <li className={`${navlinkStyle} ${darkMode ? `${selectedNav === 'experience' ? 'darkNavLinkCurr' : 'darkNavLink'}`:`${selectedNav === 'experience' ? 'navLinkCurr' : 'navLink'}`}`}><Link onClick={()=>{setSelectedNav('experience')}} to='/experience'>Experience</Link></li>
                <li className={`${navlinkStyle} ${darkMode ? `${selectedNav === 'projects' ? 'darkNavLinkCurr' : 'darkNavLink'}`:`${selectedNav === 'projects' ? 'navLinkCurr' : 'navLink'}`}`}><Link onClick={()=>{setSelectedNav('projects')}} to='/projects'>Projects</Link></li>
                <li className={`${navlinkStyle} ${darkMode ? `${selectedNav === 'scrabble' ? 'darkNavLinkCurr' : 'darkNavLink'}`:`${selectedNav === 'scrabble' ? 'navLinkCurr' : 'navLink'}`}`}><Link onClick={()=>{setSelectedNav('scrabble')}} to='/scrabble-minigame'>1v1 Scrabble</Link></li>
            </ul>
        </nav>
    );
}

export default NavBarL;
