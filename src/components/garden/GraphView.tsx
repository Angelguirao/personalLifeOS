
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
import { GardenNote } from '../../lib/garden/types/legacy-types';
import { Connection, RelationshipType } from '../../lib/garden/types/connection-types';

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
    console.log('Nodes in GraphView:', nodes);
  }, [connections, nodes]);
  
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
    
    // Convert to string IDs if they aren't already
    const sourceId = connection.sourceId.toString();
    const targetId = connection.targetId.toString();
    
    console.log(`Creating edge from ${sourceId} to ${targetId} with relationship ${connection.relationship}`);
    
    return {
      id: `e${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
      type: 'smoothstep', // changed from 'default' to 'smoothstep' for better visualization
      animated: true,
      style: { 
        stroke: edgeColor, 
        strokeWidth: Math.max(1, strengthValue * 2) // Ensure minimum stroke width
      },
      label: connection.relationship,
      labelStyle: { fill: '#64748b', fontFamily: 'sans-serif', fontSize: 12 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
    };
  });
  
  const [nodes_, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Update edges when connections change
  useEffect(() => {
    const newEdges = connections.map((connection) => {
      const strengthValue = typeof connection.strength === 'number' 
        ? connection.strength 
        : Number(connection.strength);
      
      const edgeColor = getRelationshipColor(connection.relationship as RelationshipType);
      const sourceId = connection.sourceId.toString();
      const targetId = connection.targetId.toString();
      
      return {
        id: `e${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: edgeColor, 
          strokeWidth: Math.max(1, strengthValue * 2)
        },
        label: connection.relationship,
        labelStyle: { fill: '#64748b', fontFamily: 'sans-serif', fontSize: 12 },
        labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
      };
    });
    
    setEdges(newEdges);
  }, [connections, setEdges]);
  
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
          type: 'smoothstep',
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
