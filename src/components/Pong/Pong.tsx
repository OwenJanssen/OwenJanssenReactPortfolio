import React, { KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Countdown from '../Countdown';
import HomeButton from '../HomeButton';
import './Pong.css';

type Position = {
    x: number;
    y: number;
};

type Score = {
    player: number;
    enemy: number;
};

const Pong = ({containerRef}) : React.ReactElement => {
    const ENEMY_PADDLE_MOVEMENT = 5;
    const PLAYER_PADDLE_MOMENT = 30;
    var BALL_HORIZONTAL_VELOCITY = 15;
    const PADDLE_DISTANCE_FROM_EDGE = 50;

    const [playerPosition, setPlayerPosition] = useState<Position>({x: 0, y: 0});
    const [enemyPosition, setEnemyPosition] = useState<Position>({x: 0, y: 0});
    const [ballPosition, setBallPosition] = useState<Position>({x: 0, y: 0});
    const ballVelocity = useRef<Position>({x: -BALL_HORIZONTAL_VELOCITY, y: 0});
    const [gameRunning, setGameRunning] = useState<Boolean>(false);
    const [score, setScore] = useState<Score>({player: 0, enemy: 0});
    const scoreAdded = useRef<Boolean>(false);

    const [roundCount, setRoundCount] = useState(0);
    

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

    const ballHitPaddle = (paddlePosition: Position) => {
        return (ballPositionRef.current.y > paddlePosition.y) && (ballPositionRef.current.y < paddlePosition.y + 200);
    };

    const giveEnemyPoint = () => {
        resetGame();
        setScore(s => ({player: s.player, enemy: s.enemy + 1}));
        setGameRunning(false);
        scoreAdded.current = true;
    };

    const givePlayerPoint = () => {
        resetGame();
        setScore(s => ({player: s.player + 1, enemy: s.enemy}));
        setGameRunning(false);
        scoreAdded.current = true;
    };

    useEffect(() => {
        const paddleId = setInterval(moveEnemyPaddle, 10);
        const ballId = setInterval(moveBall, 10);
        return () => {
            clearInterval(paddleId);
            clearInterval(ballId);
        };
    });

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
        
        if (e.key === "ArrowDown" || e.key === "s") {
            setPlayerPosition(p => {return {x: p.x, y: Math.min(p.y + PLAYER_PADDLE_MOMENT, containerRef.current ? containerRef.current.offsetHeight - 200 : 880)}});
        }

        if (e.key === "ArrowUp" || e.key === "w") {
            setPlayerPosition(p => {return {x: p.x, y: Math.max(p.y - PLAYER_PADDLE_MOMENT, 0)}});
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

            {false && <div className="resume-buttons">
                {(!gameRunning && score.player === 0 && score.enemy === 0) && 
                    <button className="start" onClick={startGame}>Start Game</button>}

                {(!gameRunning && (score.player > 0 || score.enemy > 0) && score.player < 5 && score.enemy < 5) && 
                    <button className="resume" onClick={resetGame}>Resume</button>}

                {(!gameRunning && score.player === 5) && 
                    <button className="game-over" onClick={startGame}>You Won! Press To Start Again</button>}
                
                {(!gameRunning && score.enemy === 5) && 
                    <button className="game-over" onClick={startGame}>You Lost! Press To Start Again</button>}
            </div>}

            {<Countdown trigger={roundCount} countMax={3}/>}
        </div>
    );
}

export default Pong;