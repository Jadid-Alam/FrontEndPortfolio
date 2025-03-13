import './index.css';
import React , {useState, useEffect, useRef} from 'react';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';
import downImg from './images/downArrowDark.png';
import downImgDark from './images/downArrow.png';

const Scramble  = ({darkMode, setDarkMode}) => {

    const [color, setColor] = useState({r:64, g:0, b:140});
    const [inverse, setInverse] = useState(false);
    const colours = [{r:119, g:0, b:225}, {r:47, g:0, b:99}];
    const [page, setPage] = useState(0);
    const gameState = useRef(0);

    const handleDownload = () => {
        const fileUrl = "/Jadid-Alam-CV.pdf";
        const link = document.createElement('a');

        link.href = fileUrl;
        link.download = "Jadid-Alam-CV.pdf";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // styles
    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
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

    // backend connection and game logic
    const socketRef = useRef(null);
    const [available, setAvailable] = useState(String("0000"));
    const matchNames = ["Alpaca","Bridge","Clam","Dilly"]
    const matchLetters = ['a','b','c','d']
    const inputRef = useRef(null);
    const [anagram, setAnagram] = useState("Anagram");
    const [myPts, setMyPts] = useState(0);
    const [oppPts, setOppPts] = useState(0);
    const [winner, setWinner] = useState(0);
    const [reconnecting, setReconnecting] = useState(0);

    const connectToMatch = () => {
        const ws = new WebSocket("wss://jadid-alam.duckdns.org/ws/");
        ws.onopen = () => {
            socketRef.current = ws;
            setPage(1)
            setReconnecting(0)
            console.log("joined");
        };

        ws.onmessage = (event) => {
            let s =  "";
            if (event.data === "ping") {
                sendMessage("pong")
            }
            else {
                s = event.data.toString().split(':');
                if (s[0] === 'a') {
                    setAvailable(s[1]);
                }
                else if (s[0] === 's') {
                    setAnagram(s[1]);
                    StartGame();
                }
                else if (s[0] === 'p') {
                    setMyPts(parseInt(s[1],10));
                }
                else if (s[0] === 'o') {
                    setOppPts(parseInt(s[1],10));  // add animation of increasing.
                }                                       /// left at d ... also need to make won section.
                else if (s[0] === 'f') {
                    if (s[1] === 'u') {
                        setWinner(0)
                        gameState.current = 5;
                    }
                    else if (s[1] === 'o') {
                        setWinner(1)
                        gameState.current = 5;
                    }
                    else if (s[1] === 'd') {
                        setWinner(2)
                        gameState.current = 5;
                    }
                    else if (s[1] === 'x') {
                        gameState.current = 4;
                    }
                    setTimeout(() => resetGame(), 5000)
                }
            }

        };

        ws.onerror = (error) => console.error("WebSocket Error:", error);
        ws.onclose = () => {
            if (socketRef.current !== null) {
                const interval = setInterval(() => {
                    resetGame();
                }, 5000);
                return () => {
                    clearInterval(interval);
                };
            } else if (reconnecting < 6) {
                console.log("reconnecting...");
                setReconnecting(prev => prev+1);
                setTimeout(() => connectToMatch(), 1000)
            } else {
                resetGame();
            }
        }
    };

    const sendMessage = (d) => {
        if (!socketRef.current) {
            return;
        }
        if (socketRef.current.readyState !== WebSocket.OPEN) {
            console.log("WebSocket Connection Closed");
            return;
        }
        socketRef.current.send(d);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage("g:"+inputRef.current.value);
            inputRef.current.value = "";
        }
    };


    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (seconds > 0) {
            const interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [seconds]);

    const WaitingRoom = (c) => {
        sendMessage(c)
        gameState.current = 3;
    }

    const StartGame = () => {
        gameState.current = 1;
        setSeconds(5)
        setTimeout(() => OngoingGame(), 5500)
    }

    const OngoingGame = () => {
        gameState.current = 2;
        setSeconds(60)
    }

    useEffect(() => {
        if (page === 3) {
            connectToMatch();
        }
    }, [page]);

    useEffect(() => {
        let interval;
        if (page === 1 && gameState.current === 0) {
            interval = setInterval(() => {
                sendMessage("r");
            }, 5000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [page, gameState.current]);

    const resetGame = () => {
        gameState.current = 0;
        socketRef.current = null;
        setPage(0);
        setAnagram("Anagram");
        setMyPts(0);
        setOppPts(0);
        setWinner(0);
        setReconnecting(0);
    }

    // styles
    const mainButtonStyle = `border b-2 block w-[40%] my-10 mx-auto p-4 ${darkMode ? 'text-purple-500' : 'text-black'}`;
    const gameHeader = `text-gh my-20 mx-auto p-10 text-center ${darkMode ? 'text-purple-500' : 'text-black'}`;
    const roomStyle = `text-heading m-gt border-2 flex w-full ${darkMode ? 'text-purple-500' : 'text-black'}`
    const roomName = `border-2 text-left w-full`;
    const roomFill = `border-2 w-full text-right`;
    const transitionStyle = `text-center py-[20%] text-heading`;
    const backButton = `block h-[5%] border-2 mx-2 text-centre`

    return (
        <div className={`min-h-screen fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
            <header className={`${headerStyle} ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
                <h4 className={logoStyle} style={{ color: colorString }}>Jadid Alam</h4>
                <nav className="mr-auto my-auto md:my-0 md:mr-auto md:flex">
                    <button onClick={() => setHideNav (prevMode => !prevMode)}><img className='md:hidden md:w-[0px] md:h-0 w-[15px] h-auto' src={darkMode ? downImg : downImgDark}/></button>
                    <ul id='navBarMobile' className={`${darkMode ? 'bg-gray-950' : 'bg-yellow-50'} md:flex fade-in duration-1000 ease-in-out ${hideNav ? "hidden" : "absolute block w-[30%] sm:w-[15%] text-center"}`}>
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/'>Home</Link></li>
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/experience'>Experience</Link></li>
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/projects'>Projects</Link></li>
                        <li className={`${navlinkStyle} ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}><Link to='/scramble-minigame'>1v1 Scramble</Link></li>
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
                <div className='mt-10 md:mt-20 content z-10 text-mnormal md:text-normal w-full h-[90vh] md:h-[80.0vh] bg-white '>
                    {page === 1 ? (
                        <div className="block h-full">
                            <button className={backButton} onClick={() => setPage(0)}>Back</button>
                            {gameState.current === 0 ? (
                                <ul className={`border-2 px-20 py-20 my-20 mx-20 justify-center`}>
                                    {matchNames.map((serverName, index) => {
                                        if (available.charAt(index) === '2') {
                                            return (
                                                <li className={roomStyle} key={index} value={available.charAt(index)}>
                                                    <p className={roomName}>{serverName}:</p> <p className={roomFill}>{available.charAt(index)}/2</p>
                                                </li>
                                            )
                                        }
                                        else return (
                                            <li key={index} value={available.charAt(index)}>
                                                <button className={roomStyle} onClick={() => WaitingRoom(matchLetters[index])}>
                                                    <p className={roomName}>{serverName}:</p> <p className={roomFill}>{available.charAt(index)}/2</p>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : gameState.current === 1 ? (
                                <div>
                                    <p className={transitionStyle}>Starting in: {seconds}</p>
                                </div>
                            ) : gameState.current === 2 ? (
                                <div className={`border-2 h-[95%]`}>
                                    <p className={`text-center h-[5%]`}>Time Remaining: {seconds}</p>
                                    <div className={`grid grid-cols-[15%_70%_15%] h-[95%]`}>
                                        <div className={`text-left ml-2`}>
                                            <p>You</p>
                                            <p>{myPts}</p>
                                            <p>adding pts</p>
                                        </div>
                                        <div className={``}>
                                            <p className={`text-center text-gh font-bold`}>{anagram}</p>
                                            <input
                                                className={`block mx-auto w-[90%] h-[10%] text-gt text-center font-bold border-2 m-6`}
                                                ref={inputRef}
                                                onKeyDown={handleKeyDown}
                                                type="text"
                                                maxLength={anagram.length}
                                                minLength={3}
                                                placeholder="Please input a Guess"
                                            />
                                            <button className={`block mx-auto border-2 m-6 text-gt font-bold w-[50%] h-[10%]`} onClick={handleKeyDown}>Guess!</button>
                                        </div>
                                        <div className={`text-right mr-2`}>
                                            <p>Opponent</p>
                                            <p>{oppPts}</p>
                                            <p>adding pts</p>
                                        </div>
                                    </div>
                                </div>
                            ) : gameState.current === 3 ? (
                                <div>
                                    <p className={transitionStyle}>Waiting for the other player to join</p>
                                </div>
                            ) : gameState.current === 4 ? (
                                <div className={transitionStyle}>
                                    <p>Opponent has disconnected!</p>
                                    <p>You have won by default!</p>
                                </div>
                            ) : gameState.current === 5 ? (
                                <div className={transitionStyle}>
                                    {winner === 0 ? (
                                        <p>You win!</p>
                                    ) : winner === 1 ? (
                                        <p>Opponent wins!</p>
                                    ) : winner === 2 ? (
                                        <p>Draw!</p>
                                    ) : (
                                        <p>Error with Game display</p>
                                    )}
                                </div>
                            ) : (
                                <p>Error with Game display</p>
                            )}
                        </div>
                    ) : page === 2 ? (
                        <div className="block h-full">
                            <button className={backButton} onClick={() => setPage(0)}>Back</button>
                            <p>Some info about how to play the game...</p>
                        </div>
                    ) : page === 3 ? (
                        <div className={transitionStyle}>
                            Joining...
                        </div>
                    ) : (
                        <div className="block h-full">
                            <p className={gameHeader}>1v1 Scramble</p>
                            <button className={mainButtonStyle} onClick={() => setPage(3)}>Join</button>
                            <button className={mainButtonStyle} onClick={() => setPage(2)}>How to play?</button>
                        </div>
                    )}
                </div>
            </main>

            <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center md:mt-16 md:mb-4 ${darkMode ? 'text-yellow-100' : 'text-black'}`}>&copy; {(new Date).getFullYear()} Jadid Alam. All rights reserved.</h6>
            </footer>
        </div>
    );
}


export default Scramble;