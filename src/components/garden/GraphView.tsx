
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
  
  // Create a nodeMap for quick lookups - now accommodate both numerical IDs and UUID string IDs
  const nodeMap = React.useMemo(() => {
    const map = new Map();
    
    // First, add all nodes with their original IDs
    nodes.forEach(node => {
      map.set(node.id.toString(), node);
      
      // If ID looks like a number, also store it as a number
      if (!isNaN(Number(node.id))) {
        map.set(Number(node.id), node);
      }
    });
    
    // If models are provided, map them by their UUID IDs as well
    if (models && models.length > 0) {
      models.forEach(model => {
        // Create a mapping between model IDs and node IDs
        const matchingNode = nodes.find(node => 
          node.title === model.title || 
          (model.id && node.id.toString() === model.id.toString())
        );
        
        if (matchingNode) {
          // Add model ID to node mapping
          map.set(model.id, matchingNode);
        }
      });
    }
    
    console.log('Node map created with keys:', Array.from(map.keys()));
    return map;
  }, [nodes, models]);
  
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
  
  // Create initial edges - updated to handle UUID strings
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
        
        // Look for nodes with these IDs - try both UUID and matching by title
        let sourceNode = nodeMap.get(sourceId);
        let targetNode = nodeMap.get(targetId);
        
        // If we can't find the nodes directly, try to find a matching model and get its corresponding node
        if (!sourceNode && models) {
          const matchingModel = models.find(model => model.id === sourceId);
          if (matchingModel) {
            const matchingNode = nodes.find(node => node.title === matchingModel.title);
            if (matchingNode) {
              sourceNode = matchingNode;
            }
          }
        }
        
        if (!targetNode && models) {
          const matchingModel = models.find(model => model.id === targetId);
          if (matchingModel) {
            const matchingNode = nodes.find(node => node.title === matchingModel.title);
            if (matchingNode) {
              targetNode = matchingNode;
            }
          }
        }
        
        // If we still can't find the nodes, skip this edge
        if (!sourceNode) {
          console.warn(`Edge source node ${sourceId} not found in nodeMap`);
          return null;
        }
        
        if (!targetNode) {
          console.warn(`Edge target node ${targetId} not found in nodeMap`);
          return null;
        }
        
        // Get strength as a number (default to 0.5 if invalid)
        const strengthValue = typeof connection.strength === 'number' 
          ? connection.strength 
          : isNaN(Number(connection.strength)) ? 0.5 : Number(connection.strength);
        
        // Get color based on relationship type
        const edgeColor = getRelationshipColor(connection.relationship as RelationshipType);
        
        console.log(`Creating edge from ${sourceNode.id} to ${targetNode.id} with relationship ${connection.relationship}`);
        
        return {
          id: `edge-${connection.id}`, // Ensure unique edge IDs
          source: sourceNode.id.toString(),
          target: targetNode.id.toString(),
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
  }, [connections, nodes, models, setNodes, setEdges]);
  
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
