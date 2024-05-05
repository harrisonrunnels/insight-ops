'use client';
import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
  Controls,
  MiniMap,
} from 'reactflow';

import { initialNodes, initialEdges } from '../src/nodes-edges';
import 'reactflow/dist/style.css';

const elk = new ELK();

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': 100,
    'elk.spacing.nodeNode': 80,
  };

  const getLayoutedElements = useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: 'root',
      layoutOptions: layoutOptions,
      children: getNodes(),
      edges: getEdges(),
    };

    elk.layout(graph).then(({ children }) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      children.forEach((node) => {
        node.position = { x: node.x, y: node.y };
      });

      setNodes(children);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  }, []);

  return { getLayoutedElements };
};

const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { getLayoutedElements } = useLayoutedElements();

  const onNodeClick = (event, node) => {
    console.log('Node clicked:', node);
  };
  const onNodeMouseEnter = (event, node) => {
    console.log('Node hovered:', node);
  };
  const onNodeMouseLeave = (event, node) => {
    console.log('Node left:', node);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeClick={onNodeClick}
        fitView
      >
        <Panel position="top-right">
          <button
            onClick={() =>
              getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'DOWN' })
            }
          >
            vertical layout
          </button>
          <button
            onClick={() =>
              getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' })
            }
          >
            horizontal layout
          </button>
          <button
            onClick={() =>
              getLayoutedElements({
                'elk.algorithm': 'org.eclipse.elk.force',
              })
            }
          >
            force layout
          </button>
        </Panel>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
    
  );
};

export default function () {
  return (
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
  );
}
