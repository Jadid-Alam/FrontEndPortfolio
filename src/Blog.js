import './index.css';
import React , {useState, useEffect} from 'react';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';
import sendIcon from './images/send.png';
import downImg from './images/downArrowDark.png';
import downImgDark from './images/downArrow.png';

const Blog = ({darkMode, setDarkMode}) => {

    const [color, setColor] = useState({r:64, g:0, b:140});
    const [inverse, setInverse] = useState(false);
    const [mouse, setMouse] = useState({x:0, y:0});
    const [fading, setFading] = useState({});
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [reload, setReload] = useState(false);

    const colours = [{r:119, g:0, b:225}, {r:47, g:0, b:99}];
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleDownload = () => {
      const fileUrl = "/Jadid-Alam-CV.pdf";
      const link = document.createElement('a');

      link.href = fileUrl;
      link.download = "Jadid-Alam-CV.pdf"; 

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    const changeColor = () => {
        setColor((color) => {
            if (color.r > colours[0].r && color.b > colours[0].b) {
                setInverse(true);
            }
            else if (color.r < colours[1].r && color.b < colours[1].b) {
                setInverse(false);
            }

            if (!inverse) {
                const rn = color.r + 8;
                const bn = color.b + 13;
                return {r:rn, g:color.g, b:bn};
            }
            else
            {
                const rn = color.r - 8;
                const bn = color.b - 13;
                return {r:rn, g:color.g, b:bn};
            }

        });
    };

    useEffect(() => {
        const interval = setInterval(changeColor, 70);
        return () => clearInterval(interval);
    }, [color.r]);

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

    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;

    const handleSubmit = async (e) => {
      e.preventDefault(); 
  
      const formData = new FormData();
      const postId = e.target.id;

      formData.append('comment', e.target[0].value);
      e.target[0].value = '';
      try {
        
        const response = await fetch(`${apiUrl}/api/blog/comment/${postId}/`, {
              method: 'POST',
              body: formData,
              headers: {
                  'Accept': 'application/json',
              },
          });
  
          if (!response.ok) {
              throw new Error('Error adding post' + response.statusText);
          }
  
          const data = await response.json();
          console.log(data);  
      } catch (error) {
          console.error(error);  
      }
      setReload(!reload);
    };

    

  useEffect(() => {
    setReload(!reload);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
          const response = await fetch(`${apiUrl}/api/blog/comments/`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          
          setComments(data.data);
      } catch (error) {
          console.error("Error fetching posts: ", error);
      }
    };

    fetchComments();
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/blog/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            setPosts(data.data);
        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
    };

    fetchPosts();
  }, [reload]);

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFading((prevState) => ({
              ...prevState,
              [entry.target.id]: true,
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

    const headerStyle = 'fixed z-20 top-0 left-0 w-full text-mnav font-semibold md:text-nav md:font-semibold fade-in duration-1000 ease-in-out';
    const logoStyle = 'p-1 max-w-40 md:p-2';
    const navlinkStyle = 'p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition';
    const [hideNav, setHideNav] = useState(true);
        useEffect(() => {
          if (window.innerWidth > 768) {
            setHideNav(true);
          }
        }
        , [window.innerWidth]);
  return (
      <div className={`fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}> 

        <div className={`${darkMode ? 'gradient-dark' : 'gradient'}`} style={fadingCircle}></div>

          <header className={`${headerStyle} ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
                <h4 className={logoStyle} style={{ color: colorString }}>Jadid Alam</h4>
                <nav className="mr-auto my-auto md:my-0 md:mr-auto md:flex">
                  <button onClick={() => setHideNav (prevMode => !prevMode)}><img className='md:hidden md:w-[0px] md:h-0 w-[15px] h-auto' src={darkMode ? downImg : downImgDark}/></button>
                  <ul id='navBarMobile' className={`${darkMode ? 'bg-gray-950' : 'bg-yellow-50'} md:flex fade-in duration-1000 ease-in-out ${hideNav ? "hidden" : "absolute block w-[30%] sm:w-[15%] text-center"}`}>
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/'>Home</Link></li>
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/experience'>Experience</Link></li>
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/projects'>Projects</Link></li>
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}><Link to='/mini-blog'>Blog</Link></li>
                    </ul>
                  </nav>
                  
                  <nav className="mr-1 items-end sm:mr-2 md:mr-4">
                    <ul className="flex justify-end">
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-500' : 'text-black'}`}><a onClick={handleDownload}>Resume</a></li>  
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/contact-me'>Contact Me</Link></li>
                        <button onClick={() => setDarkMode(prevMode => !prevMode)}><img src={darkMode ? lightModeImage : darkModeImage} className='w-[15px] md:w-[35px] h-auto' /></button>
                        
                    </ul>
                  </nav>
            </header>

            <main>
                <div className='content z-10 text-center text-mnormal md:text-normal'>
                  {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (

                      <div key={post.post_id} className='pt-20 md:pt-40 blog-grid'>
                        <div className={`border-r border-b rounded-sm duration-1000 ease-in-out ${darkMode ? 'border-purple-900' : 'border-purple-300'}`}>
                            <figure id={`img${post.post_id}`} alt='posted image' className={`p-1 pt-5 pb-2 md:p-3 md:pt-10 md:pb-3
                            proj-fade duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            <img className='ml-auto'  src={post.image} style={{ width: 'auto', height: '500px' }} />
                            <figcaption className='text-mimgcap md:text-imgcap text-right text-gray-600'>{post.date}</figcaption>
                          </figure>
                          <p id={`p${post.post_id}`} className={`p-1 pt-1 pb-3 md:p-3 md:pt-2 md:pb-6
                                duration-1000 ease-in-out proj-fade
                                ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                                {post.caption}
                          </p>
                        </div>
                        <div className='grid grid-rows-[9fr_1fr]'>
                            <div id={`c${post.post_id}`} className={`p-1 text-mnav md:text-nav md:p-3 text-left fade-in duration-1000 ease-in-out z-10 overflow-y-auto max-h-[600px]
                            proj-fade ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                                  {comments.filter(comment => comment.post_id === post.post_id).map((comment,index) => (
                                    <p key={index} className='pb-1 z-20'>{comment.comment}</p>
                                  )) || <p>No comments available.</p>}
                            </div>
                            <form id={post.post_id} className='p-1 flex' onSubmit={handleSubmit}>
                                <input id={`i${post.post_id}`} type='text' placeholder='Comment' className={`text-mnav md:text-nav p-1 w-[85%] m-auto h-[70%]
                                    border-b rounded-sm ${darkMode ? 'bg-gray-900 border-purple-900 text-yellow-100' : 'bg-gray-200 border-purple-300 text-black'}`} 
                                   />
                                    <button type='submit' className='p-1'><img src={sendIcon} style={{ width: 'auto', height: '30px' }}/></button>
                            </form>
                        </div>
                    </div>
                    ))) : (
                      <p className={`py-40 h-[100vh] ${darkMode ? 'text-yellow-100' : 'text-black'}`}>No posts available</p>
                  )}
                  
                </div>
            </main>

            <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center md:mt-16 md:mb-4 ${darkMode ? 'text-yellow-100' : 'text-black'}`}>&copy; {(new Date).getFullYear()} Jadid Alam. All rights reserved.</h6>
            </footer>
      </div>
  );
}


export default Blog;