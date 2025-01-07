import { Tooltip } from "@mui/material";
import * as d3 from "d3";
import React, { useLayoutEffect, useState } from "react";

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
    chordTooltipFunction?: (item1: ItemT, item2: ItemT) => string;
    chordOnClick?: (item1: ItemT, item2: ItemT) => void;
    margin?: number;
    node_thickness?: number;
    node_connection_padding?: number;
    containerRef: React.RefObject<HTMLDivElement>;
};

export const ChordDiagram = <ItemT,>(props: ChordDiagramProps<ItemT>): React.ReactElement => {
    const { matrix, items, labelFunction, colorFunction, selectedFunction, groupOnClick, chordOnClick, chordTooltipFunction, containerRef } = props;

    const [dimensions, setDimensions] = useState<chordDiagramDimensions>({
        width: 300, height: 300, innerRadius: 100, outerRadius: 150
    });

    const chordDiagramStyle = {
        fontSize: "1rem",
        fontWeight: "600",
        fontFamily: "Monaco, monospace",
        letterSpacing: "-1px",
        lineHeight: "1rem",
        color: "black",
    };

    useLayoutEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.offsetHeight;
            const width = containerRef.current.offsetWidth;
            const sideArea = Math.min(height, width) - 50;

            setDimensions({
                height: sideArea,
                width: sideArea,
                innerRadius: sideArea / 4,
                outerRadius: sideArea / 4 + 20
            });
        }
    }, [containerRef.current, containerRef.current]);

    const chordGenerator = d3
        .chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending);
    const chord = chordGenerator(matrix);

    const margin: number = props.margin ?? DEFAULT_MARGIN;
    const node_thickness: number = props.node_thickness ?? DEFAULT_NODE_THICKNESS;
    const node_connection_padding: number = props.node_connection_padding ?? DEFAULT_NODE_CONNECTION_PADDING;

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

        const textContent = group.value > (dimensions.innerRadius/(label.length * 2)) ? <text x={15} dy={10} fill="white">
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
        const d = ribbonGenerator(connection as any);
        const source = items[connection.source.index];
        const target = items[connection.target.index];
        const opacity = selectedFunction(source) && selectedFunction(target) ? "0.6" : "0.3";
        return <Tooltip title={chordTooltipFunction && chordTooltipFunction(source, target)} onClick={() => chordOnClick && chordOnClick(source, target)}>
            <path key={i} d={d as any} fill={"#69b3a2"} opacity={opacity} />
        </Tooltip>
    });

    return <div style={chordDiagramStyle}>
        <svg width={dimensions.width} height={dimensions.height}>
            <g transform={`translate(${dimensions.width / 2}, ${dimensions.height / 2})`}>
                {allNodes}
                {allConnections}
            </g>
        </svg>
    </div>;
};
