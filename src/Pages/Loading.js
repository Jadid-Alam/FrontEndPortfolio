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

    const loadingAnimation = {
        initial: {
            scale: 1,
        },
        animate: {
            scale: [1,0.5,1],
            rotate: [0,360],
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
    };

    return (
        <main className={`fixed inset-0 flex items-center justify-center overflow-hidden z-40 ${darkMode ? 'dark' : 'light'}`}>
            <motion.h1 variants={loadingAnimation}
                initial='initial'
                animate='animate' className={`z-40 w-20 h-20 bg-purple-600 rounded-lg text-center align-middle text-heading font-bold 
                ${darkMode ? 'text-yellow-100' : 'navLink'}`}>
                J
            </motion.h1>
        </main>
    );
}

export default Loading;
