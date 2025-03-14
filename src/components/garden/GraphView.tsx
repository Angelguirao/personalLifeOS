
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
  const initialNodes: Node[] = nodes.map((note, index) => {
    // Create a grid layout
    const row = Math.floor(index / 3);
    const col = index % 3;
    
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
  
  // Create initial edges
  const initialEdges: Edge[] = connections.map((connection) => {
    // Ensure IDs are strings
    const sourceId = connection.sourceId.toString();
    const targetId = connection.targetId.toString();
    
    // Get strength as a number
    const strengthValue = typeof connection.strength === 'number' 
      ? connection.strength 
      : Number(connection.strength);
    
    // Get color based on relationship type
    const edgeColor = getRelationshipColor(connection.relationship as RelationshipType);
    
    console.log(`Creating edge from ${sourceId} to ${targetId} with relationship ${connection.relationship}`);
    
    return {
      id: `edge-${connection.id}`,
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
  });
  
  // Use ReactFlow hooks with initial data
  const [rfNodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [rfEdges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Update edges when connections change
  useEffect(() => {
    if (connections && connections.length > 0) {
      const newEdges = connections.map((connection) => {
        // Ensure IDs are strings
        const sourceId = connection.sourceId.toString();
        const targetId = connection.targetId.toString();
        
        // Get strength as a number
        const strengthValue = typeof connection.strength === 'number' 
          ? connection.strength 
          : Number(connection.strength);
        
        // Get color based on relationship type
        const edgeColor = getRelationshipColor(connection.relationship as RelationshipType);
        
        return {
          id: `edge-${connection.id}`,
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
      });
      
      console.log('Setting new edges:', newEdges);
      setEdges(newEdges);
    } else {
      console.log('No connections to render');
    }
  }, [connections, setEdges]);
  
  // Update nodes when the nodes prop changes
  useEffect(() => {
    if (nodes.length > 0) {
      // Use predictable positions for debugging
      const newNodes = nodes.map((note, index) => {
        // Create a grid layout for easier debugging
        const row = Math.floor(index / 3);
        const col = index % 3;
        
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
      
      console.log('Setting new nodes:', newNodes);
      setNodes(newNodes);
    }
  }, [nodes, setNodes]);
  
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
