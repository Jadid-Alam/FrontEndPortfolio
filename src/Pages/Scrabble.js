import '../index.css';
import {useState, useEffect, useRef} from 'react';
import loading from '../images/loading.gif';
import {motion , useAnimation} from 'framer-motion';

const Scramble = ({darkMode}) => {
    const [rerender,SetRerender] = useState(true);
    useEffect(() => {
        //console.log("rerendering");
    },[rerender])

    const [page, setPage] = useState(0);
    const gameState = useRef(0);
    const guessInputAnim = useAnimation();
    const pointAddAnim = useAnimation();
    const pointAddAnim1 = useAnimation();
    const timerEndAnim = useAnimation();

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
    const reconnecting = useRef(0)
    const [maxMyPts, setMaxMyPts] = useState(0);
    const [maxOppPts, setMaxOppPts] = useState(0);

    const connectToMatch = () => {
        const ws = new WebSocket("wss://jadid-alam.com/ws");
        //const ws = new WebSocket("ws://127.0.0.1:8080");
        ws.onopen = () => {
            socketRef.current = ws;
            setPage(1)
            console.log("joined");
        };

        ws.onmessage = (event) => {
            //console.log(event.data)
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
                    const t = (100*parseInt(s[1],10));
                    if (t === 0) {
                        wrongGuess();
                    }
                    setMaxMyPts(t);
                }
                else if (s[0] === 'o') {
                    const t = (100*parseInt(s[1],10));
                    setMaxOppPts(t);
                }
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
            console.log("WebSocket Closed");
            if (socketRef.current !== null) {
                const interval = setInterval(() => {
                    resetGame();
                }, 5000);
                return () => {
                    clearInterval(interval);
                };
            } else if (reconnecting.current < 6) {
                reconnecting.current += 1;
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
        socketRef.current.send(d.toLocaleLowerCase());
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage("g:"+inputRef.current.value);
        inputRef.current.value = "";
    };

    useEffect(() => {
        if (myPts < maxMyPts) {
            const diff = maxMyPts - myPts;
            const interval = setInterval(() => {
                setMyPts((prev) => prev+1);
                addPointsAnimation();
            }, (500/diff));
            return () => clearInterval(interval);
        }
    },[maxMyPts, myPts]);
    useEffect(() => {
        if (oppPts < maxOppPts) {
            const diff = 500/(maxOppPts - oppPts);
            const interval = setInterval(() => {
                setOppPts((prev) => prev+1);
                addPointsAnimation1();
            }, (diff));
            return () => clearInterval(interval);
        }
    },[maxOppPts, oppPts]);

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (seconds > 0) {
            const interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
                if (seconds <= 5) {
                    startRedTimerAnimation();
                }
            }, 1000);
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [seconds]);

    const WaitingRoom = (c) => {
        SetRerender(!rerender);
        sendMessage(c)
        gameState.current = 3;
    }

    const StartGame = () => {
        SetRerender(!rerender);
        gameState.current = 1;
        setSeconds(5)
        setTimeout(() => OngoingGame(), 5500)
    }

    const OngoingGame = () => {
        SetRerender(!rerender);
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
        if (socketRef.current !== null) {
            socketRef.current.close()
        }
        socketRef.current = null;
        setPage(0);
        setAnagram("Anagram");
        setMyPts(0);
        setOppPts(0);
        setWinner(0);
        reconnecting.current = 0;
        window.location.reload();
    }

    // styles
    const mainButtonStyle = `border rounded-[5px] font-bold block w-[60%] lg:w-[40%] my-10 mx-auto p-4`;
    const gameHeader = `text-5xl lg:text-gh font-bold my-20 mx-auto p-10 text-center`;
    const roomStyle = `resp-text lg:text-heading m-gt border flex w-full `
    const roomName = `p-2 text-left w-full`;
    const roomFill = `p-2 w-full text-right`;
    const roomList = `my-2 border`;
    const transitionStyle = `text-center py-[20%] text-heading`;
    const backButton = `block border rounded-[5px] mx-[1%] my-[1%] pb-1 px-2 text-centre`
    const gameBgStyle = `text-blue-950 rounded-[10px] mt-10 lg:mt-20 content z-10 text-m lg:text-normal w-full h-[90vh] lg:h-[80.0vh] bg-[#e0e0e0] font-bold`;
    const rulesStyle = `p-[1%]`;

    const buttonAnim = {
        initial: {
            backgroundColor: "#60a5fa",
            borderColor: "#60a5fa",
            scale: 0,
        },
        hover: {
            scale: 1.2, // Enlarges on hover
            backgroundColor: "#3d93fc",
            transition: { duration: 0.5 },
        },
        animate: {
            borderColor: ["#60a5fa", "#3d93fc"],
            scale: [0,1.2,1],
            transition: {
                borderColor: {
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2,
                    ease: "easeInOut",
                },
            },
        },
    };

    const backButtonAnim = {
        initial: {
            backgroundColor: "#60a5fa",
            borderColor: "#3d93fc",
            scale: 0,
        },
        hover: {
            scale: 1.1,
            backgroundColor: "#3d93fc",
            transition: { duration: 0.5 },
        },
        animate: {
            scale: [0,1.1,1],
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
    };

    const guessButtonAnim = {
        initial: {
            backgroundColor: "#60a5fa",
            borderColor: "#3d93fc",
            scale: 1,
        },
        hover: {
            scale: 1.05,
            backgroundColor: "#3d93fc",
            transition: { duration: 0.3 },
        },
    };

    const listAnimL = {
        initial: {
            backgroundColor: "#60a5fa",
            borderColor: "#3d93fc",
            scale: 1,
        },
        hover: {
            scale: 1.1,
            backgroundColor: "#3d93fc",
            transition: { duration: 0.5 },
        },
        animate: {
            x: [0,-3,0,0,0,0],
            rotate: [0,-0.3,0,0,0,0],
            transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1,
                ease: "easeInOut",
            },
        },
    }

    const listAnimR = {
        initial: {
            backgroundColor: "#60a5fa",
            borderColor: "#3d93fc",
            scale: 1,
        },
        hover: {
            scale: 1.1,
            backgroundColor: "#3d93fc",
            transition: { duration: 0.5, ease: "easeInOut", },
        },
        animate: {
            x: [0,3,0,0,0,0],
            rotate: [0,0.3,0,0,0,0],
            transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1,
                ease: "easeInOut",
            },
        },
    }

    const wrongGuess = () => {
        guessInputAnim.start({
            x: [0,-5,5,-2,2,0],
            rotate: [0,-1,1,-1,1,0],
            scale: [1,1.05,1],
            borderColor: ['#3d93fc','#FF0000','#3d93fc'],
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            }
        })
    }

    const addPointsAnimation = () => {
        pointAddAnim.start({
            x: [0,-3,0,3,0,-2,0,2,0],
            rotate: [0,-1,0,1,0,-1,0,1,0],
            scale: [1,1.05,1],
            color: ['#172554','#018c01','#172554'],
            transition: {
                duration: 0.1,
                ease: "easeInOut",
            }
        })
    }
    const addPointsAnimation1 = () => {
        pointAddAnim1.start({
            x: [0,-3,0,3,0,-2,0,2,0],
            rotate: [0,-1,0,1,0,-1,0,1,0],
            scale: [1,1.05,1],
            color: ['#172554','#800101','#172554'],
            transition: {
                duration: 0.1,
                ease: "easeInOut",
            }
        })
    }

    const startRedTimerAnimation = () => {
        timerEndAnim.start({
            scale: [1,1.1,1],
            color: ['#172554','#FF0000','#172554'],
            transition: {
                duration: 1,
                ease: "easeInOut",
            }
        })
    }

    return (
        <div className={`min-h-screen h-full fade-in duration-1000 ease-in-out ${darkMode ? 'dark' : 'light'}`}>
            <main>
                <div className={gameBgStyle}>
                    {page === 1 ? (
                        <div className="block h-full mt-4 lg:mt-0">
                            <motion.button variants={backButtonAnim}
                                           initial="initial"
                                           whileHover="hover"
                                           animate="animate"
                                           className={backButton} onClick={resetGame}>Exit</motion.button>
                            {gameState.current === 0 ? (
                                <ul className={`px-[5%] pb-[5%] pt-[2%] m-[5%] justify-center`}>
                                    <p className={`text-3xl lg:text-6xl mb-6`}>Please choose a room to join:</p>
                                    {matchNames.map((serverName, index) => {
                                        if (available.charAt(index) === '2') {
                                            return (
                                                <motion.li variants={index % 2 === 0 ? listAnimL : listAnimR}
                                                           initial="initial"
                                                           whileHover="hover"
                                                           animate="animate"
                                                           className={`${roomStyle} ${roomList}`} key={index} value={available.charAt(index)}>
                                                    <p className={roomName}>{serverName}:</p> <p className={roomFill}>{available.charAt(index)}/2</p>
                                                </motion.li>
                                            )
                                        }
                                        else return (
                                            <motion.li variants={index % 2 === 0 ? listAnimL : listAnimR}
                                                       initial="initial"
                                                       whileHover="hover"
                                                       animate="animate"
                                                       className={roomList} key={index} value={available.charAt(index)}>
                                                <button className={roomStyle} onClick={() => WaitingRoom(matchLetters[index])}>
                                                    <p className={roomName}>{serverName}:</p> <p className={roomFill}>{available.charAt(index)}/2</p>
                                                </button>
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            ) : gameState.current === 1 ? (
                                <div>
                                    <p className={transitionStyle}>Starting in: {seconds}</p>
                                </div>
                            ) : gameState.current === 2 ? (
                                <div className={`h-[95%] px-[1%]`}>
                                    <motion.p animate={timerEndAnim} className={`text-center text-mnormal lg:text-3xl lg:pb-[2%]`}>Time Remaining: {seconds}</motion.p>
                                    <div className={`grid grid-cols-[15%_70%_15%] h-[95%]`}>
                                        <div className={`text-left text-mnormal lg:text-4xl`}>
                                            <p>You</p>
                                            <motion.p animate={pointAddAnim}>{myPts}</motion.p>
                                        </div>
                                        <div className={``}>
                                            <form onSubmit={handleSubmit}>
                                                <p className={`text-center lg:mb-[7%] text-4xl lg:text-gh font-bold`}>{anagram}</p>
                                                <motion.input
                                                    animate={guessInputAnim}
                                                    className={`block mx-auto w-[100%] lg:w-[90%] p-[2%] text-1xl lg:text-gt text-center font-bold border border-[#3d93fc] rounded-[5px] m-6`}
                                                    ref={inputRef}
                                                    onKeyDown={handleKeyDown}
                                                    type="text"
                                                    maxLength={anagram.length}
                                                    minLength={3}
                                                    placeholder="Please input a Guess"
                                                />
                                                <motion.button variants={guessButtonAnim}
                                                               initial="initial"
                                                               whileHover="hover"
                                                               animate="animate"
                                                               type={'submit'}
                                                               className={`block mx-auto border rounded-[5px] m-6 text-2xl lg:text-gt font-bold w-[80%] lg:w-[50%] p-[1%]`}>Guess!</motion.button>
                                            </form>
                                        </div>
                                        <div className={`text-right text-mnormal lg:text-4xl`}>
                                            <p>Foe</p>
                                            <motion.p animate={pointAddAnim1}>{oppPts}</motion.p>
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
                                        <div className={`celebration h-[90%]`}>
                                            <p>You win!</p>
                                            <div className={`flex justify-center mx-auto`}>
                                                <div>
                                                    <p>You:</p>
                                                    <p>{myPts}</p>
                                                </div>
                                                <p className={`mx-[10%]`}>-</p>
                                                <div>
                                                    <p>Foe:</p>
                                                    <p>{oppPts}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : winner === 1 ? (
                                        <>
                                            <p>Opponent's win!</p>
                                            <div className={`flex justify-center mx-auto`}>
                                                <div>
                                                    <p>You:</p>
                                                    <p>{myPts}</p>
                                                </div>
                                                <p className={`mx-[10%]`}>-</p>
                                                <div>
                                                    <p>Foe:</p>
                                                    <p>{oppPts}</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : winner === 2 ? (
                                        <>
                                            <p>You Drew!</p>
                                            <div className={`flex justify-center mx-auto`}>
                                                <div>
                                                    <p>You:</p>
                                                    <p>{myPts}</p>
                                                </div>
                                                <p className={`mx-[10%]`}>-</p>
                                                <div>
                                                    <p>Foe:</p>
                                                    <p>{oppPts}</p>
                                                </div>
                                            </div>
                                        </>
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
                            <motion.button variants={backButtonAnim}
                                           initial="initial"
                                           whileHover="hover"
                                           animate="animate"
                                           className={backButton} onClick={() => setPage(0)}>Back</motion.button>
                            <p className={rulesStyle}>Rules:</p>
                            <p className={rulesStyle}>1) You will be given a word with 8 letters.</p>
                            <p className={rulesStyle}>2) Your aim is to guess as many words as possible by using each letter only once.</p>
                            <p className={rulesStyle}>3) Guessed words can not be shorter than 3 letters.</p>
                            <p className={rulesStyle}>4) Whoever has the most points at the end wins!</p>
                        </div>
                    ) : page === 3 ? (
                        <div className={transitionStyle}>
                            Joining
                            <img className={`mx-auto w-[150px]`} src={loading}/>
                        </div>
                    ) : (
                        <div className="block h-full">
                            <motion.p
                                initial={{
                                  scale: 0,
                                }}
                                animate={{
                                    scale: [0,1.2,1],
                                    transition: {
                                        duration: 1,
                                    }
                                }}
                                className={gameHeader}>
                                1v1 Scramble
                            </motion.p>
                            <motion.button
                                variants={buttonAnim}
                                initial="initial"
                                whileHover="hover"
                                animate="animate"
                                className={mainButtonStyle} onClick={() => setPage(3)}
                            >
                                Join
                            </motion.button>
                            <motion.button
                                variants={buttonAnim}
                                initial="initial"
                                whileHover="hover"
                                animate="animate"
                                className={mainButtonStyle} onClick={() => setPage(2)}>
                                How to play?
                            </motion.button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}


export default Scramble;