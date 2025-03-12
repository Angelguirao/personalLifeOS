
import React, { useEffect, useState } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls,
  MiniMap, 
  Node, 
  Edge, 
  ConnectionLineType, 
  useNodesState, 
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GardenNote, Connection, RelationshipType } from '../../lib/garden/types';

// Import refactored components
import NoteNode from './NoteNode';
import NoteDetailDialog from './NoteDetailDialog';
import LegendPanel from './LegendPanel';
import { getRelationshipColor } from './relationshipUtils';

interface GraphViewProps {
  nodes: GardenNote[];
  connections: Connection[];
}

const nodeTypes = {
  note: NoteNode,
};

const GraphView = ({ nodes, connections }: GraphViewProps) => {
  const [selectedNode, setSelectedNode] = useState<GardenNote | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Console log the connections for debugging
  useEffect(() => {
    console.log('Connections in GraphView:', connections);
  }, [connections]);
  
  // Transform garden notes into React Flow nodes
  const initialNodes: Node[] = nodes.map((note) => ({
    id: note.id.toString(),
    type: 'note',
    data: note,
    position: { 
      x: 100 + Math.random() * 500, 
      y: 100 + Math.random() * 500 
    },
  }));
  
  // Transform connections into React Flow edges
  const initialEdges: Edge[] = connections.map((connection) => {
    // Ensure strength is a number and calculate the appropriate stroke width
    const strengthValue = typeof connection.strength === 'number' 
      ? connection.strength 
      : Number(connection.strength);
    
    // Get edge color based on relationship type  
    const edgeColor = getRelationshipColor(connection.relationship as RelationshipType);
    
    console.log('Creating edge:', connection);
    return {
      id: `e${connection.sourceId}-${connection.targetId}`,
      source: connection.sourceId.toString(),
      target: connection.targetId.toString(),
      type: 'default', // Changed from 'smoothstep' to ensure basic compatibility
      animated: true,
      style: { 
        stroke: edgeColor, 
        strokeWidth: strengthValue * 2 || 1.5 
      },
      label: connection.relationship,
      labelStyle: { fill: '#64748b', fontFamily: 'sans-serif', fontSize: 12 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
    };
  });
  
  const [nodes_, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    const note = nodes.find(n => n.id.toString() === node.id);
    if (note) {
      setSelectedNode(note);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes_}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={4}
        attributionPosition="bottom-right"
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          type: 'default',
          animated: true
        }}
      >
        <Background color="#94a3b8" gap={16} />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            const stage = (node.data as GardenNote).stage;
            switch(stage) {
              case "seedling": return '#4ade80';
              case "growing": return '#22c55e';
              case "evergreen": return '#16a34a';
              default: return '#94a3b8';
            }
          }}
          maskColor="#0f172a20"
        />
        <LegendPanel />
      </ReactFlow>
      
      <NoteDetailDialog 
        note={selectedNode} 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </div>
  );
};

export default GraphView;
