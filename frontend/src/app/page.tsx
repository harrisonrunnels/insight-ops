'use client';

import { Edge, Node, Position, ReactFlowProvider } from 'reactflow';

import graph from '../graph_50_deduped.json'
import positions from '../graph_50_positions.json'

import styles from './page.module.css';
import Flow from '../components/Flow';

const nodeSize = {
  width: 100,
  height: 40,
};


const initialNodes: Node[] = graph.subjects.map(([id, label, category, x, y], index)=>{
  // new Set(['person', 'concept', 'actor', 'technology', 'weapon', 'city','location', 'media outlet'])
  return {id, data: {label, category}, position: {x: positions[id].x * 10, y: positions[id].y * 10}}
})

const initialEdges: Edge[] = graph.relationships.map(([source, label, target], index)=>{
  return {id: 'e'+source+target, source, target, animated: true, label}
})

export default async function App() {
  return (
    <main className={styles.main}>
      <ReactFlowProvider initialNodes={initialNodes} initialEdges={initialEdges}>
        <Flow nodes={initialNodes} edges={initialEdges} />
      </ReactFlowProvider>
    </main>
  );
}
