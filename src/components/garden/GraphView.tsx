
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
  useEdgesState,
  Panel,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { GardenNote, Connection } from '../../lib/garden/types';
import { Sprout } from 'lucide-react';

interface GraphViewProps {
  nodes: GardenNote[];
  connections: Connection[];
}

// Custom node for garden notes
const NoteNode = ({ data }: { data: any }) => {
  const getStageColor = (stage: string) => {
    switch(stage) {
      case "seedling": return "bg-green-400";
      case "growing": return "bg-green-500";
      case "evergreen": return "bg-green-600";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className={`p-3 rounded-md bg-background border border-muted shadow-md w-48 hover:shadow-lg transition-shadow`}>
      <div className="flex items-center mb-2">
        <div className={`w-2 h-2 rounded-full ${getStageColor(data.stage)} mr-2`}></div>
        <span className="text-xs text-muted-foreground">{data.stage}</span>
      </div>
      <div className="font-serif font-medium text-sm truncate" title={data.title}>
        {data.title}
      </div>
      
      {/* Adding handles for connections */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

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
      
    console.log('Creating edge:', connection);
    return {
      id: `e${connection.sourceId}-${connection.targetId}`,
      source: connection.sourceId.toString(),
      target: connection.targetId.toString(),
      type: 'default', // Changed from 'smoothstep' to ensure basic compatibility
      animated: true,
      style: { 
        stroke: '#94a3b8', 
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
        <Panel position="top-right" className="bg-background p-2 rounded-md shadow-md text-xs">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
              <span>Seedling</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Growing</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
              <span>Evergreen</span>
            </div>
          </div>
        </Panel>
      </ReactFlow>
      
      {selectedNode && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl font-semibold">{selectedNode.title}</DialogTitle>
              <DialogDescription>
                A note in your digital garden
              </DialogDescription>
            </DialogHeader>
            <div className="mb-3 flex items-center text-xs text-muted-foreground">
              <div className="flex items-center">
                <Sprout size={16} className={selectedNode.stage === 'seedling' ? 'text-green-400' : selectedNode.stage === 'growing' ? 'text-green-500' : 'text-green-600'} />
                <span className="ml-1 capitalize">{selectedNode.stage}</span>
              </div>
              <span className="mx-2">•</span>
              <time dateTime={selectedNode.lastUpdated}>
                Updated: {new Date(selectedNode.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            
            <div className="mt-4 space-y-4">
              <p className="text-muted-foreground">
                {selectedNode.bookInfo ? (
                  <>
                    {selectedNode.fullContent.split(selectedNode.bookInfo.title)[0]}
                    <a 
                      href={selectedNode.bookInfo.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {selectedNode.bookInfo.title}
                    </a>
                    {selectedNode.fullContent.split(selectedNode.bookInfo.title)[1]}
                  </>
                ) : (
                  selectedNode.fullContent
                )}
              </p>
              
              {selectedNode.connections && selectedNode.connections.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="text-xs text-muted-foreground mr-2">Connected ideas:</span>
                  {selectedNode.connections.map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GraphView;
