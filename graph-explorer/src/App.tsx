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
import { initialNodes} from './nodes';
import { initialEdges } from './edges';
import 'reactflow/dist/style.css';
import { Button } from './components/ui/button';

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
        minZoom={.05}
        fitView
      >
        <Panel position="top-right">
          <div className='flex gap-1'>
            <Button
            variant={'outline'}
              onClick={() =>
                getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'DOWN' })
              }
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14998 14V1H0.849976V14H2.14998ZM6.14998 14V1H4.84998V14H6.14998ZM10.15 1V14H8.84998V1H10.15ZM14.15 14V1H12.85V14H14.15Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </Button>
            <Button
            variant={'outline'}
              onClick={() =>
                getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' })
              }
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 12.85L1 12.85L1 14.15L14 14.15L14 12.85ZM14 8.85002L1 8.85002L1 10.15L14 10.15L14 8.85002ZM1 4.85003L14 4.85003L14 6.15003L1 6.15002L1 4.85003ZM14 0.850025L1 0.850025L1 2.15002L14 2.15002L14 0.850025Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </Button>
          </div>
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
