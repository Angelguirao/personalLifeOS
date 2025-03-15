
import React, { useState, useEffect } from 'react';
import { System } from '@/lib/garden/types';
import { getSystems, getSystemModelRelations } from '@/lib/garden/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { CircleOff, Circle, Brain, User, Database } from 'lucide-react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface SystemsViewProps {
  onSelectSystem?: (system: System) => void;
}

const getSystemIcon = (system: System) => {
  // Use the custom icon if provided, otherwise use a default based on category
  if (system.isSelf) {
    return <User className="h-5 w-5 text-indigo-500" />;
  }
  
  switch (system.category) {
    case 'cognitive':
      return <Brain className="h-5 w-5 text-blue-500" />;
    case 'data':
      return <Database className="h-5 w-5 text-green-500" />;
    default:
      return <Circle className="h-5 w-5 text-gray-500" />;
  }
};

export const SystemsView = ({ onSelectSystem }: SystemsViewProps) => {
  const [systems, setSystems] = useState<System[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [modelRelationCounts, setModelRelationCounts] = useState<Record<string, number>>({});

  // Fetch systems
  useEffect(() => {
    const fetchSystems = async () => {
      setIsLoading(true);
      try {
        const systemsData = await getSystems();
        setSystems(systemsData);
        
        // Fetch model relation counts for each system
        const counts: Record<string, number> = {};
        for (const system of systemsData) {
          const relations = await getSystemModelRelations(system.id);
          counts[system.id] = relations.length;
        }
        setModelRelationCounts(counts);
      } catch (error) {
        console.error('Error fetching systems:', error);
        toast.error('Failed to load systems');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSystems();
  }, []);

  const handleSystemClick = (system: System) => {
    setSelectedSystemId(system.id === selectedSystemId ? null : system.id);
    if (onSelectSystem) {
      onSelectSystem(system);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (systems.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/40 rounded-lg border border-dashed">
        <CircleOff className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-medium mb-1">No Systems Found</h3>
        <p className="text-muted-foreground">
          Systems help organize your mental models into cohesive frameworks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Systems</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Models</TableHead>
            <TableHead>Importance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {systems.map((system) => (
            <TableRow 
              key={system.id} 
              className={`cursor-pointer ${system.id === selectedSystemId ? 'bg-muted' : ''}`}
              onClick={() => handleSystemClick(system)}
            >
              <TableCell>
                <div 
                  className="p-2 rounded-full" 
                  style={{ backgroundColor: system.color ? `${system.color}20` : undefined }}
                >
                  {getSystemIcon(system)}
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {system.name}
                {system.isSelf && <Badge className="ml-2 bg-indigo-500">Self</Badge>}
              </TableCell>
              <TableCell>{system.category || 'Uncategorized'}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {modelRelationCounts[system.id] || 0}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full mx-0.5 ${
                        i < system.importanceLevel ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SystemsView;
