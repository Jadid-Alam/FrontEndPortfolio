import '../index.css';
import {motion} from "framer-motion";
import NavBarL from './NavBarL';
import NavBarR from './NavBarR';



const TopPanel = ({darkMode, setDarkMode, selectedNav, setSelectedNav}) => {
    

    const headerStyle = 'fixed z-20 top-0 left-0 w-full text-mnav font-semibold lg:text-nav lg:font-semibold fade-in duration-1000 ease-in-out';
    const logoStyle = 'p-1 max-w-40 lg:p-2';

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
        <header className={`${headerStyle} ${darkMode ? 'dark' : 'light'}`}>
            <motion.h4 variants={shining} animate="animate" className={logoStyle}>Jadid Alam</motion.h4>
            <NavBarL darkMode={darkMode} selectedNav={selectedNav} setSelectedNav={setSelectedNav} />
            <NavBarR darkMode={darkMode} setDarkMode={setDarkMode} selectedNav={selectedNav} setSelectedNav={setSelectedNav} />
        </header>
    );
}

export default TopPanel;
