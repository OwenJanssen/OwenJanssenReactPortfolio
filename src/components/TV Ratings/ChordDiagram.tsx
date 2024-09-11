import { Tooltip } from "@mui/material";
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

export type ChordDiagramProps<ItemT> = {
    matrix: number[][];
    items: ItemT[];
    labelFunction: (item: ItemT) => string;
    colorFunction: (item: ItemT) => string;
    selectedFunction: (item: ItemT) => boolean;
    groupOnClick?: (item: ItemT) => void;
    dimensions: chordDiagramDimensions;
    style?: React.CSSProperties;
    margin?: number;
    node_thickness?: number;
    node_connectin_padding?: number;
};

export const ChordDiagram = <ItemT,>(props: ChordDiagramProps<ItemT>): React.ReactElement => {
    const { matrix, items, labelFunction, colorFunction, selectedFunction, groupOnClick, dimensions, style } = props;

    const chordGenerator = d3
        .chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending);
    const chord = chordGenerator(matrix);

    const margin: number = props.margin ?? DEFAULT_MARGIN;
    const node_thickness: number = props.node_thickness ?? DEFAULT_NODE_THICKNESS;
    const node_connection_padding: number = props.node_connectin_padding ?? DEFAULT_NODE_CONNECTION_PADDING;

    const radius = Math.min(dimensions.width, dimensions.height) / 2 - margin;
    const arcPathGenerator = d3.arc();

    const allNodes = chord.groups.map((group, i) => {
        const d = arcPathGenerator({
            innerRadius: radius - node_thickness,
            outerRadius: radius,
            startAngle: group.startAngle,
            endAngle: group.endAngle,
        });

        if (d == null)
        {
            return null;
        }

        const label: string = labelFunction(items[i]);
        const color: string = colorFunction(items[i]);

        const x = label === "Crime" ? 10 : 15;
        const textContent = group.value > 5 ? <text x={x} dy={10} fill="white">
            <textPath xlinkHref={`#group${i}`} startOffset="50%">
                {label}
            </textPath>
        </text> : null;
    
        return <Tooltip title={label} onClick={() => groupOnClick && groupOnClick(items[i])}>
            <g key={i}>
                <path id={`group${i}`} d={d} fill={color}/>
                {textContent}
            </g>
        </Tooltip>;
    });

    const ribbonGenerator = d3
        .ribbon()
        .radius(radius - node_thickness - node_connection_padding);

    const allConnections = chord.map((connection, i) => {
        const d = ribbonGenerator(connection);
        const opacity = selectedFunction(items[connection.source.index]) || selectedFunction(items[connection.target.index]) ? "0.6" : "0.3";
        return <path key={i} d={d} fill={"#69b3a2"} opacity={opacity} />;
    });

    return <div style={style}>
        <svg width={dimensions.width} height={dimensions.height}>
            <g transform={`translate(${dimensions.width / 2}, ${dimensions.height / 2})`}>
                {allNodes}
                {allConnections}
            </g>
        </svg>
    </div>;
};
