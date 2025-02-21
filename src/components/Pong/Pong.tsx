import React, { KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import HomeButton from '../HomeButton';
import './Pong.css';
import { getAnalytics, logEvent } from 'firebase/analytics';

type Position = {
    x: number;
    y: number;
};

type Score = {
    player: number;
    enemy: number;
};

const Pong = (props: { containerRef: React.RefObject<HTMLDivElement> }): React.ReactElement => {
    useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, `entering_pong`);

        return () => {
            logEvent(analytics, `exiting_pong`);
        };
    }, []);

    const ENEMY_PADDLE_MOVEMENT = 5;
    const PLAYER_PADDLE_MOMENT = 30;
    var BALL_HORIZONTAL_VELOCITY = 15;
    const PADDLE_DISTANCE_FROM_EDGE = 50;
    const MAX_SCORE = 5;

    const containerRef = props.containerRef;

    const [playerPosition, setPlayerPosition] = useState<Position>({x: 0, y: 0});
    const [enemyPosition, setEnemyPosition] = useState<Position>({x: 0, y: 0});
    const [ballPosition, setBallPosition] = useState<Position>({x: 0, y: 0});
    const ballVelocity = useRef<Position>({x: -BALL_HORIZONTAL_VELOCITY, y: 0});
    const [gameRunning, setGameRunning] = useState<Boolean>(false);
    const [score, setScore] = useState<Score>({player: 0, enemy: 0});
    const scoreAdded = useRef<Boolean>(false);

    const [showCountdown, setShowCountdown] = useState(false);
    const [countdownNumber, setCountdownNumber] = useState(0);

    const resetGame = () => {
        const height = containerRef.current ? containerRef.current.offsetHeight : 0;
        const width = containerRef.current ? containerRef.current.offsetWidth : 0;

        setPlayerPosition({x: PADDLE_DISTANCE_FROM_EDGE, y: (height/2 - 100)})
        setEnemyPosition({x: PADDLE_DISTANCE_FROM_EDGE, y: (height/2 - 100)})
        setBallPosition({x: width/2, y: height/2})
        
        ballVelocity.current = {x: -BALL_HORIZONTAL_VELOCITY, y: 0};

        scoreAdded.current = false;
        setGameRunning(true);
    }

    const startGame = () => {
        resetGame();
        setScore({player: 0, enemy: 0});
    }

    // moveEnemyPaddle and moveBall are called inside a set interval
    // so they can't access updated states so instead we need to pass
    // state through as refs instead
    const ballPositionRef = useRef<Position>(ballPosition);
    ballPositionRef.current = ballPosition;
    
    const enemyPositionRef = useRef<Position>(enemyPosition);
    enemyPositionRef.current = enemyPosition;
    const playerPositionRef = useRef<Position>(playerPosition);
    playerPositionRef.current = playerPosition;

    const gameStartedRef = useRef<Boolean>(gameRunning);
    gameStartedRef.current = gameRunning;

    const moveEnemyPaddle = () => {
        if (!gameStartedRef.current || containerRef.current === null) return;

        if (!(enemyPositionRef.current.y < 10) &&
            (ballPositionRef.current.y < enemyPositionRef.current.y + 75)) {
            setEnemyPosition(p => {return {x: p.x, y: p.y - ENEMY_PADDLE_MOVEMENT}});
        }

        if (!(enemyPositionRef.current.y + 210 > (containerRef.current ? containerRef.current.offsetHeight : 0)) &&
            (ballPositionRef.current.y > enemyPositionRef.current.y + 125)) {
            setEnemyPosition(p => {return {x: p.x, y: p.y + ENEMY_PADDLE_MOVEMENT}});
        }
    };

    const moveBall = () => {
        if (!gameStartedRef.current || containerRef.current === null) return;

        const randomYVelocityChange = (Math.random() - 0.5)*20;

        // PADDLE_DISTANCE_FROM_EDGE + 20 is the horizontal value of the inward side of the paddle
        if (ballPositionRef.current.x < PADDLE_DISTANCE_FROM_EDGE + 20) {
            if (ballHitPaddle(playerPositionRef.current)) {
                ballVelocity.current = {x: BALL_HORIZONTAL_VELOCITY, y: ballVelocity.current.y + randomYVelocityChange};
            }
            else {
                if (!scoreAdded.current) giveEnemyPoint();
            }
        }

        else if (ballPositionRef.current.x > containerRef.current.offsetWidth - (PADDLE_DISTANCE_FROM_EDGE + 20)) {
            if (ballHitPaddle(enemyPositionRef.current)) {
                ballVelocity.current = {x: -BALL_HORIZONTAL_VELOCITY, y: ballVelocity.current.y + randomYVelocityChange};             
            }
            else {
                if (!scoreAdded.current) givePlayerPoint();
            }
        }

        if (ballPositionRef.current.y < 0 || ballPositionRef.current.y > containerRef.current.offsetHeight - 45) { 
            ballVelocity.current = {x: ballVelocity.current.x, y: -ballVelocity.current.y};
        }

        setBallPosition(p => {return {x: p.x + ballVelocity.current.x, y: p.y + ballVelocity.current.y}})
    };

    const movePlayer = (key: string) => {
        if (!gameStartedRef.current || containerRef.current === null) return;

        if (key === "ArrowDown" || key === "s") {
            setPlayerPosition(p => {return {x: p.x, y: Math.min(p.y + PLAYER_PADDLE_MOMENT, containerRef.current ? containerRef.current.offsetHeight - 200 : 880)}});
        }

        if (key === "ArrowUp" || key === "w") {
            setPlayerPosition(p => {return {x: p.x, y: Math.max(p.y - PLAYER_PADDLE_MOMENT, 0)}});
        }
    }

    const ballHitPaddle = (paddlePosition: Position) => {
        return (ballPositionRef.current.y > paddlePosition.y) && (ballPositionRef.current.y < paddlePosition.y + 200);
    };

    const giveEnemyPoint = () => {
        setScore(s => ({player: s.player, enemy: s.enemy + 1}));
        setGameRunning(false);

        if (score.enemy >= 4) {return;}
        setShowCountdown(true);
        setCountdownNumber(3);
        scoreAdded.current = true;
    };

    const givePlayerPoint = () => {
        setScore(s => ({player: s.player + 1, enemy: s.enemy}));
        setGameRunning(false);

        if (score.player >= 4) {return;}
        setShowCountdown(true);
        setCountdownNumber(3);
        scoreAdded.current = true;
    };

    // Ball/Enemy movement
    useEffect(() => {
        const paddleId = setInterval(moveEnemyPaddle, 10);
        const ballId = setInterval(moveBall, 10);
        return () => {
            clearInterval(paddleId);
            clearInterval(ballId);
        };
    });

    // Countdown timer
    useEffect(() => {
        if (!showCountdown) { return; }

        const intervalId = setInterval(() => {
            setCountdownNumber(cn => {
                if (cn == 1) {
                    clearInterval(intervalId);
                    setShowCountdown(false);
                    resetGame();
                }
                return cn-1;
            })
        }, 1000);

        return () => {clearInterval(intervalId)};
    });

    // Update game when the frame changes size
    useLayoutEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.offsetHeight;
            const width = containerRef.current.offsetWidth;

            setPlayerPosition({x: PADDLE_DISTANCE_FROM_EDGE, y: (height/2 - 100)});
            setEnemyPosition({x: PADDLE_DISTANCE_FROM_EDGE, y: (height/2 - 100)});
            setBallPosition({x: width/2-15, y: height/2-15});
            BALL_HORIZONTAL_VELOCITY = 0.1 * (height/1920);
        }
    }, [containerRef.current?.offsetHeight, containerRef.current?.offsetWidth]);

    const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        if (e.key === "ArrowDown" || e.key === "s" || e.key === "ArrowUp" || e.key === "w") {
            movePlayer(e.key);
        }
    }

    return (
        <div className="pong-container" onKeyDown={keyDownHandler} 
                                        tabIndex={-1}>
            <div className="center-line"/>

            <div className="game-header">Pong</div>
            {(!gameRunning && score.player === 0 && score.enemy === 0) && 
                <div className="game-instructions">Use Arrow Keys To Move Paddle</div>}
            
            <div className="scoreboard">
                <div className="player-score">{score.player}</div>
                <div className="enemy-score">{score.enemy}</div>
            </div>

            <div className="home-button"><HomeButton/></div>

            <div className="game-objects">
                <div className="paddle" style={{
                    left: playerPosition.x,
                    top: playerPosition.y,
                }}/>
                <div className="paddle" style={{
                    right: enemyPosition.x,
                    top: enemyPosition.y,
                }}/>
                <div className="ball" style={{
                    left: ballPosition.x,
                    top: ballPosition.y,
                }}/>
            </div>

            <div className="resume-buttons">
                {(!gameRunning && score.player === 0 && score.enemy === 0) && 
                    <button className="start" onClick={startGame}>Start Game</button>}

                {(!gameRunning && score.player >= MAX_SCORE) && 
                    <button className="win" onClick={startGame}>You Won! Play Again?</button>}
                
                {(!gameRunning && score.enemy >= MAX_SCORE) && 
                    <button className="loss" onClick={startGame}>You Lost! Play Again?</button>}
            </div>

            {showCountdown && <div className="countdown-number" style={{color: ["greenyellow", "blue", "red"][countdownNumber-1]}}>{ countdownNumber }</div>}
        </div>
    );
}

export default Pong;