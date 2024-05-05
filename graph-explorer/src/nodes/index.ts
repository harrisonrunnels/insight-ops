import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import DataNode from "./DataNode";
import graph from '../graph_300.json'
import positions from '../graph_300_positions.json'
import groups from '../graph_300_nodes.json'
import chroma from "chroma-js";

function getRandomColorWithContrastOnBlack() {
  let color;
  do {
      color = chroma.random(); // Generate a random color
  } while (chroma.contrast(color, 'black') < 4.5); // Ensure contrast ratio with black is at least 4.5:1 (recommended for accessibility)

  return color;
}

const createColorMap = ()=>{
  const map = {}
  for(const group of Object.values(groups)){
    const componentId = group["Component ID"]
    map[componentId] = getRandomColorWithContrastOnBlack().hex()
  }
  return map
}

export const colorMap = createColorMap()


export const initialNodes = graph.subjects.map(([id, label, category, x, y], index)=>{
  // new Set(['person', 'concept', 'actor', 'technology', 'weapon', 'city','location', 'media outlet'])
  return {id,style: {backgroundColor: colorMap[groups[id]["Component ID"]]},data: {label, category}, position: {x: positions[id].x * 10, y: positions[id].y * 10}}
}) satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "data-node": DataNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
