import './App.css';
import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './Pages/Loading';
import Home from './Pages/Home';
import Scrabble from './Pages/Scrabble';
import Experience from './Pages/Experience';
import Projects from './Pages/Projects';
import ContactMe from './Pages/ContactMe';
import TopPanel from './Components/TopPanel';
import FooterPanel from './Components/FooterPanel';
import BackgroundEffect from './Components/BackgroundEffect';

function App() {
  const [selectedNav, setSelectedNav] = useState("")
  const [darkMode, setDarkMode] = useState(() => {
      return sessionStorage.getItem('darkMode') === 'true';
  });

  const renderWithProps = (Component) => (props) => {
    window.scrollTo(0, 0);
    return <Component {...props} darkMode={darkMode} />;
  };

  useEffect(() => {
      sessionStorage.setItem('darkMode',darkMode.toString());
  }, [darkMode]);

  return (
    <Router className={`h-screen fade-in duration-1000 ease-in-out ${darkMode ? 'dark' : 'light'}`}>
      <TopPanel darkMode={darkMode} setDarkMode={setDarkMode} selectedNav={selectedNav} setSelectedNav={setSelectedNav}/>
      <BackgroundEffect darkMode={darkMode} selectedNav={selectedNav}/>
      <div className='App'> 
          <Switch>
            <Route exact path="/" render={renderWithProps(Loading)} />
            <Route exact path="/home" render={renderWithProps(Home)} />
            <Route path="/scrabble-minigame" render={renderWithProps(Scrabble)} />
            <Route path="/experience" render={renderWithProps(Experience)} />
            <Route path="/projects" render={renderWithProps(Projects)} />
            <Route path="/contact-me" render={renderWithProps(ContactMe)} />
          </Switch>
      </div>
      <FooterPanel darkMode={darkMode} />
    </Router>
  );
}

export default App;
