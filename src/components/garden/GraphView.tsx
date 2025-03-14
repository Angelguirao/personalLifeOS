
import React, { useEffect, useState, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls,
  MiniMap, 
  Node, 
  Edge, 
  ConnectionLineType, 
  useNodesState, 
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GardenNote } from '../../lib/garden/types/legacy-types';
import { Connection, RelationshipType } from '../../lib/garden/types/connection-types';
import { MentalModel } from '../../lib/garden/types';

// Import refactored components
import NoteNode from './NoteNode';
import NoteDetailDialog from './NoteDetailDialog';
import LegendPanel from './LegendPanel';
import { getRelationshipColor } from './relationshipUtils';
import { toast } from 'sonner';

interface GraphViewProps {
  nodes: GardenNote[];
  connections: Connection[];
  models?: MentalModel[]; // Optional prop to support backward compatibility
}

const nodeTypes = {
  note: NoteNode,
};

const GraphView = ({ nodes, connections, models }: GraphViewProps) => {
  const [selectedNode, setSelectedNode] = useState<GardenNote | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Console log the connections for debugging
  useEffect(() => {
    console.log('Connections in GraphView:', connections);
    console.log('Nodes in GraphView:', nodes);
    if (models) {
      console.log('Mental Models in GraphView:', models);
    }
  }, [connections, nodes, models]);
  
  // Create initial nodes with fixed positions for better debugging
  const createInitialNodes = (): Node[] => {
    return nodes.map((note, index) => {
      // Create a grid layout
      const row = Math.floor(index / 5);
      const col = index % 5;
      
      return {
        id: note.id.toString(),
        type: 'note',
        data: note,
        position: { 
          x: 100 + col * 250, 
          y: 100 + row * 250 
        },
      };
    });
  };
  
  // Create initial edges
  const createInitialEdges = (): Edge[] => {
    if (!connections || connections.length === 0) {
      console.warn('No connections available to create edges');
      return [];
    }
    
    return connections.map((connection) => {
      // Ensure IDs are strings
      const sourceId = connection.sourceId.toString();
      const targetId = connection.targetId.toString();
      
      // Make sure the source and target nodes exist
      const sourceExists = nodes.some(node => node.id.toString() === sourceId);
      const targetExists = nodes.some(node => node.id.toString() === targetId);
      
      if (!sourceExists || !targetExists) {
        console.warn(`Edge from ${sourceId} to ${targetId} has missing nodes`);
        return null;
      }
      
      // Get strength as a number (default to 0.5 if invalid)
      const strengthValue = typeof connection.strength === 'number' 
        ? connection.strength 
        : isNaN(Number(connection.strength)) ? 0.5 : Number(connection.strength);
      
      // Get color based on relationship type
      const edgeColor = getRelationshipColor(connection.relationship as RelationshipType);
      
      console.log(`Creating edge from ${sourceId} to ${targetId} with relationship ${connection.relationship}`);
      
      return {
        id: `e-${connection.id}`,
        source: sourceId,
        target: targetId,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: edgeColor, 
          strokeWidth: Math.max(1, strengthValue * 3)
        },
        label: connection.relationship,
        labelStyle: { fill: '#64748b', fontFamily: 'sans-serif', fontSize: 12, fontWeight: 500 },
        labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)', rx: 4, padding: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColor,
        },
      };
    }).filter(Boolean) as Edge[];
  };
  
  // Use ReactFlow hooks with initial data
  const [rfNodes, setNodes, onNodesChange] = useNodesState(createInitialNodes());
  const [rfEdges, setEdges, onEdgesChange] = useEdgesState(createInitialEdges());
  
  // Update when connections or nodes change
  useEffect(() => {
    // Update nodes
    setNodes(createInitialNodes());
    
    // Update edges
    const newEdges = createInitialEdges();
    console.log('Setting new edges:', newEdges);
    setEdges(newEdges);
    
    if (newEdges.length === 0 && connections.length > 0) {
      toast.warning("Connections data exists but couldn't be displayed. Check for ID mismatches.");
    }
  }, [connections, nodes, setNodes, setEdges]);
  
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
        nodes={rfNodes}
        edges={rfEdges}
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
