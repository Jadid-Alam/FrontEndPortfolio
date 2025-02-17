import './App.css';
import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import Experience from './Experience';
import Projects from './Projects';
import ContactMe from './ContactMe';
import AddPost from './AddPost';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const renderWithProps = (Component) => (props) => {
    window.scrollTo(0, 0);
    return <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />;
  };

  return (
    <Router>
      <div className='App'> 
          <Switch>
            <Route exact path="/" render={renderWithProps(Home)} />
            <Route path="/mini-blog" render={renderWithProps(Blog)} />
            <Route path="/experience" render={renderWithProps(Experience)} />
            <Route path="/projects" render={renderWithProps(Projects)} />
            <Route path="/contact-me" render={renderWithProps(ContactMe)} />
            <Route path="/add-post" component={AddPost} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
