import type { Edge, EdgeTypes } from "reactflow";
import graph from '../graph_300.json'

export const initialEdges = graph.relationships.map(([source, label, target], index)=>{
  return {id: 'e'+source+target, source, target, animated: true, label}
}) satisfies Edge[];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
