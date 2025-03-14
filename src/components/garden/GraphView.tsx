
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
  
  // Log data for debugging
  useEffect(() => {
    console.log('Connections in GraphView:', connections);
    console.log('Nodes in GraphView:', nodes);
    if (models) {
      console.log('Mental Models in GraphView:', models);
    }
    
    // Print all node IDs for debugging
    const nodeIds = nodes.map(node => node.id.toString());
    console.log('Node IDs available:', nodeIds);
    
    // Print all connection source/target IDs for debugging
    connections.forEach(conn => {
      console.log(`Connection: ${conn.id}, Source: ${conn.sourceId}, Target: ${conn.targetId}`);
      console.log(`Source ID exists in nodes: ${nodeIds.includes(conn.sourceId.toString())}`);
      console.log(`Target ID exists in nodes: ${nodeIds.includes(conn.targetId.toString())}`);
    });
  }, [connections, nodes, models]);
  
  // Create a nodeMap for quick lookups
  const nodeMap = React.useMemo(() => {
    const map = new Map();
    nodes.forEach(node => {
      // Store the node under both string and number forms of its ID to be safe
      const id = node.id.toString();
      map.set(id, node);
      
      // If ID looks like a number, also store it as a number
      if (!isNaN(Number(id))) {
        map.set(Number(id), node);
      }
    });
    console.log('Node map created with keys:', Array.from(map.keys()));
    return map;
  }, [nodes]);
  
  // Create initial nodes with fixed positions for better debugging
  const createInitialNodes = (): Node[] => {
    return nodes.map((note, index) => {
      // Create a grid layout
      const row = Math.floor(index / 4);
      const col = index % 4;
      
      const id = note.id.toString();
      console.log(`Creating node with ID: ${id}`);
      
      return {
        id: id,
        type: 'note',
        data: note,
        position: { 
          x: 150 + col * 350, 
          y: 150 + row * 350 
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
    
    const validEdges = connections
      .map((connection) => {
        // Ensure IDs are strings
        const sourceId = connection.sourceId.toString();
        const targetId = connection.targetId.toString();
        
        // Log for debugging
        console.log(`Checking connection: ${sourceId} -> ${targetId}`);
        console.log(`Node map has sourceId ${sourceId}:`, nodeMap.has(sourceId));
        console.log(`Node map has targetId ${targetId}:`, nodeMap.has(targetId));
        
        // Make sure the source and target nodes exist in our nodeMap
        if (!nodeMap.has(sourceId)) {
          console.warn(`Edge source node ${sourceId} not found in nodeMap`);
          return null;
        }
        
        if (!nodeMap.has(targetId)) {
          console.warn(`Edge target node ${targetId} not found in nodeMap`);
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
          id: `edge-${connection.id}`, // Ensure unique edge IDs
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
      })
      .filter(Boolean) as Edge[];
      
    console.log('Valid edges created:', validEdges);
    return validEdges;
  };
  
  // Use ReactFlow hooks with initial data
  const [rfNodes, setNodes, onNodesChange] = useNodesState(createInitialNodes());
  const [rfEdges, setEdges, onEdgesChange] = useEdgesState(createInitialEdges());
  
  // Update when connections or nodes change
  useEffect(() => {
    if (nodes.length === 0) {
      console.warn('No nodes available to create graph');
      return;
    }
    
    // Update nodes with wider spacing
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
        fitViewOptions={{ padding: 0.3 }} 
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
