import '../index.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const Loading = ({darkMode, setDarkMode}) => {
    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() => {
        history.push('/home');
        }, 1500);

        return () => clearTimeout(timer); 
    }, [history]);

    const backgroundAnimation = {
        animate: {
            x: [100,-5,0],
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
    };

    const letterAnimation = {
        animate: {
            x: [-200,10,0],
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
    };

    return (
        <main className={`fixed inset-0 flex items-center justify-center overflow-hidden z-40 ${darkMode ? 'dark' : 'light'}`}>
            <motion.h1 variants={backgroundAnimation}
                animate='animate' className={`z-40 w-20 h-20 bg-purple-600 rounded-lg text-center align-middle text-heading font-bold 
                ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                <motion.p
                variants={letterAnimation}
                animate='animate'
                >J</motion.p>
            </motion.h1>
        </main>
    );
}

export default Loading;
