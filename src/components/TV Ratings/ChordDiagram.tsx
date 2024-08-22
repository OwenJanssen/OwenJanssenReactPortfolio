import * as d3 from "d3";
import React from "react";

const MARGIN = 30;
const NODE_THICKNESS = 15;
const NODE_CONNECTION_PADDING = 5;

export type ChordDiagramProps = {
    matrix: number[][];
    groupLabels: string[];
    groupColors: string[];
    height: number;
    width: number;
    outerRadius: number;
    innerRadius: number;
    style?: React.CSSProperties;
    groupOnClick?: (index: number) => void;
};

export const ChordDiagram = ({
    matrix,
    groupLabels,
    groupColors,
    height,
    width,
    outerRadius,
    innerRadius,
    style,
    groupOnClick,
}: ChordDiagramProps): React.ReactElement => {
    const chordGenerator = d3
        .chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending);
    const chord = chordGenerator(matrix);

    const radius = Math.min(width, height) / 2 - MARGIN;
    const arcPathGenerator = d3.arc();

    const allNodes = chord.groups.map((group, i) => {
        const d = arcPathGenerator({
            innerRadius: radius - NODE_THICKNESS,
            outerRadius: radius,
            startAngle: group.startAngle,
            endAngle: group.endAngle,
        });
        if (d) {
            return (
                <path
                    key={i}
                    d={d}
                    fill={groupColors[i]}
                    onClick={() => groupOnClick && groupOnClick(i)}
                />
            );
        }
    });

    const ribbonGenerator = d3
        .ribbon()
        .radius(radius - NODE_THICKNESS - NODE_CONNECTION_PADDING);

    const allConnections = chord.map((connection, i) => {
        const d = ribbonGenerator(connection);
        return <path key={i} d={d} fill="#69b3a2" opacity=".3" />;
    });

    return <div style={style}>
        <svg width={width} height={height}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {allNodes}
                {allConnections}
            </g>
        </svg>
    </div>;
};
