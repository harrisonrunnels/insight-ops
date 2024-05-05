'use client';

import { Edge, Node, Position, ReactFlowProvider } from 'reactflow';

import graph from '../graph.json'

import styles from './page.module.css';
import Flow from '../components/Flow';

const nodeSize = {
  width: 100,
  height: 40,
};


const initialNodes: Node[] = graph.subjects.map(([id, label, category, x, y], index)=>{
  return {id, data: {label, category}, position: {x: 0, y: index * 100}}
})

const initialEdges: Edge[] = graph.relationships.map(([source, label, target], index)=>{
  return {index, source, target, animated: true, label}
})

async function fetchData(): Promise<{ nodes: Node[]; edges: Edge[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ nodes: initialNodes, edges: initialEdges });
    }, 1000);
  });
}

export default async function App() {
  const { nodes, edges } = await fetchData();

  return (
    <main className={styles.main}>
      <ReactFlowProvider initialNodes={nodes} initialEdges={edges}>
        <Flow nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </main>
  );
}
