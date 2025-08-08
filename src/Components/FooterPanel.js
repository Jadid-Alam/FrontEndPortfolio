import '../index.css';



const FooterPanel = ({darkMode}) => {

    return (
        <footer className={`${darkMode ? 'dark' : 'light'}`}>
            <h6 className={`content z-10 mt-8 mb-2 text-center lg:mt-16 lg:mb-4 ${darkMode ? 'text-yellow-100' : 'navLink'}`}>&copy; {(new Date).getFullYear()} Jadid Alam. All rights reserved.</h6>
        </footer>
    );
}

export default FooterPanel;
