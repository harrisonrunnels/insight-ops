import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import graph from '../graph_50_deduped.json'
import positions from '../graph_50_positions.json'



export const initialNodes = graph.subjects.map(([id, label, category, x, y], index)=>{
  // new Set(['person', 'concept', 'actor', 'technology', 'weapon', 'city','location', 'media outlet'])
  return {id, data: {label, category}, position: {x: positions[id].x * 10, y: positions[id].y * 10}}
}) satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
