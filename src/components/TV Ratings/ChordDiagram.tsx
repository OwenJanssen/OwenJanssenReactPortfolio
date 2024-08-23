import * as d3 from "d3";
import React from "react";

const DEFAULT_MARGIN = 30;
const DEFAULT_NODE_THICKNESS = 15;
const DEFAULT_NODE_CONNECTION_PADDING = 5;

export type chordDiagramDimensions = {
    width: number,
    height: number,
    innerRadius: number,
    outerRadius: number
};

export type ChordDiagramProps = {
    matrix: number[][];
    groupLabels: string[];
    groupColors: string[];
    dimensions: chordDiagramDimensions;
    style?: React.CSSProperties;
    margin?: number;
    node_thickness?: number;
    node_connectin_padding?: number;
    groupOnClick?: (index: number) => void;
};

export const ChordDiagram = (props: ChordDiagramProps): React.ReactElement => {
    const chordGenerator = d3
        .chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending);
    const chord = chordGenerator(props.matrix);

    const margin: number = props.margin ?? DEFAULT_MARGIN;
    const node_thickness: number = props.node_thickness ?? DEFAULT_NODE_THICKNESS;
    const node_connection_padding: number = props.node_connectin_padding ?? DEFAULT_NODE_CONNECTION_PADDING;

    const radius = Math.min(props.dimensions.width, props.dimensions.height) / 2 - margin;
    const arcPathGenerator = d3.arc();

    const allNodes = chord.groups.map((group, i) => {
        const d = arcPathGenerator({
            innerRadius: radius - node_thickness,
            outerRadius: radius,
            startAngle: group.startAngle,
            endAngle: group.endAngle,
        });
        if (d)
        {
            return <path
                key={i}
                d={d}
                fill={props.groupColors[i]}
                onClick={() => props.groupOnClick && props.groupOnClick(i)}
            />
        }
    });

    const ribbonGenerator = d3
        .ribbon()
        .radius(radius - node_thickness - node_connection_padding);

    const allConnections = chord.map((connection, i) => {
        const d = ribbonGenerator(connection);
        return <path key={i} d={d} fill="#69b3a2" opacity=".3" />;
    });

    return <div style={props.style}>
        <svg width={props.dimensions.width} height={props.dimensions.height}>
            <g transform={`translate(${props.dimensions.width / 2}, ${props.dimensions.height / 2})`}>
                {allNodes}
                {allConnections}
            </g>
        </svg>
    </div>;
};
