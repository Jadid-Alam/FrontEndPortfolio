import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Scramble from './Scramble';
import Experience from './Experience';
import Projects from './Projects';
import ContactMe from './ContactMe';

function App() {

    const [darkMode, setDarkMode] = useState(() => {
        return sessionStorage.getItem('darkMode') === 'true';
    });

  const renderWithProps = (Component) => (props) => {
    window.scrollTo(0, 0);
    return <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />;
  };

  useEffect(() => {
      sessionStorage.setItem('darkMode',darkMode.toString());
  }, [darkMode]);

  return (
    <Router>
      <div className='App'> 
          <Switch>
            <Route exact path="/" render={renderWithProps(Home)} />
            <Route path="/scramble-minigame" render={renderWithProps(Scramble)} />
            <Route path="/experience" render={renderWithProps(Experience)} />
            <Route path="/projects" render={renderWithProps(Projects)} />
            <Route path="/contact-me" render={renderWithProps(ContactMe)} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
