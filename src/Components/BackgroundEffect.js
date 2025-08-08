import '../index.css';
import {useState, useEffect} from 'react';

const BackgroundEffect = ({darkMode,selectedNav}) => {
    const [mouse, setMouse] = useState({x:0, y:0});

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouse({x: e.clientX, y: e.clientY});
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouse.x, mouse.y]);

    const fadingCircle = {
        position: 'fixed',
        top: mouse.y - 1500,
        left: mouse.x - 1500,
        zIndex: 0,
        width: '3000px',
        height: '3000px',
        borderRadius: '50%',
        pointerEvents: 'none',
    };

    return (
        <>
            {selectedNav !== 'experience' ? (<div className={`${darkMode ? 'gradient-dark' : 'gradient'}`} style={fadingCircle}></div>) : (<></>)}
        </>

    );
}

export default BackgroundEffect;
