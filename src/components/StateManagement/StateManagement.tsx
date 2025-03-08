import React, { useEffect, useRef, useState } from 'react';
import { UseStateExample } from './UseStateExample';
import './StateManagement.css';

export function StateManagement() {
    return <div className={"state-management page-container"}>
        <UseStateExample/>
        <UseStateExample/>
        <UseStateExample/>
        <UseStateExample/>
    </div>;
}

export function Balloon(props: BalloonProps): React.ReactElement {
    const { length, setLength, size, setSize, color, setColor, onPop } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerDimensions, setContainerDimensions] = useState<{ width: number, height: number } | null>(null);

    const rx = 20 + 10 * size;
    const ry = 30 + 10 * size;
    const TAIL_HEIGHT = 10;
    const balloonAndTailHeight = 2 * ry + TAIL_HEIGHT;
    const STRING_SEGMENT_LENGTH = 100;

    const svgStyle = {
        width: Math.max(rx, 50) * 2 + 2,
        height: length * STRING_SEGMENT_LENGTH + balloonAndTailHeight + 2, // accommodate strokeWidth of 2
    };

    const balloonBodyStyle = {
        cx: svgStyle.width/2,
        cy: ry+2, // accommodate strokeWidth of 2
        rx: rx,
        ry: ry,
        fill: color,
        stroke: "black",
        strokeWidth: "2",
    };

    const tailStyle = {
        d: `M ${svgStyle.width/2 - 5} ${2*ry+2} L ${svgStyle.width/2 - 10} ${2*ry+2+TAIL_HEIGHT} L ${svgStyle.width/2 + 10} ${2*ry+2+TAIL_HEIGHT} L ${svgStyle.width/2 + 5} ${2*ry+2}`,
        fill: color,
        stroke: "black",
        strokeWidth: 2
    };

    function getStringStyle(): { d: string, stroke: string, strokeWidth: number, fill: string } {
        const x = svgStyle.width / 2;
        const y = svgStyle.height;
        const points = [`M ${x} ${y}`];
        for (let i = length; i > 0; i--) {
            const even = i % 2 === 0;
            const y1 = STRING_SEGMENT_LENGTH * (i) + balloonAndTailHeight;
            const y2 = STRING_SEGMENT_LENGTH * (i - 0.5) + balloonAndTailHeight;
            const y3 = STRING_SEGMENT_LENGTH * (i - 1) + balloonAndTailHeight + 2;
            const middleOffset = 50 * (even ? 1 : -1);
            points.push(`C ${x} ${y1}, ${x + middleOffset} ${y2}, ${x} ${y3}`);
        }

        return {
            d: points.join(" "),
            stroke: "black",
            strokeWidth: 2,
            fill: "transparent"
        };
    }

    useEffect(() => {
        if (containerRef.current)
        {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setContainerDimensions({ width, height });
        }
    }, [])

    useEffect(() => {
        if (containerDimensions == null) {
            return;
        }

        const newRx = 20 + 10 * size;
        const newRy = 30 + 10 * size;
        const newWidth = newRx * 2 + 2;
        const newHeight = length * STRING_SEGMENT_LENGTH + (2 * newRy + TAIL_HEIGHT) + 2;
        if (newWidth > containerDimensions.width || newHeight > containerDimensions.height)
        {
            onPop();
        }
    }, [length, size]);

    return <div className={"balloon-container"}>
        <div className={"balloon"} style={{ color: color }} ref={containerRef}>
            <svg {...svgStyle} viewBox={`0 0 ${svgStyle.width} ${svgStyle.height}`}>
                {/* Balloon Body */}
                <ellipse {...balloonBodyStyle} />

                {/* Balloon Tail */}
                <path {...tailStyle} />

                {/* String */}
                <path {...getStringStyle()} />
            </svg>
        </div>
        <form className={"inputs"}>
            <label htmlFor={"length"}>Length:</label>
            <input id={"length"} type="number" min="1" max="100" value={props.length} onChange={(e) => setLength(parseInt(e.target.value))} />
            <label htmlFor={"size"}>Size:</label>
            <input id={"size"} type="number" min="1" max="100" value={props.size} onChange={(e) => setSize(parseInt(e.target.value))} />
            <label htmlFor={"color"}>Color:</label>
            <input id={"color"} type="color" value={props.color} onChange={(e) => setColor(e.target.value)} />
        </form>
    </div>
}

export interface BalloonProps {
    length: number;
    setLength: (length: number) => void;
    size: number;
    setSize: (length: number) => void;
    color: string;
    setColor: (color: string) => void;
    onPop: () => void;
}