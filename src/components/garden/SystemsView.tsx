
import React, { useState, useEffect } from 'react';
import { System } from '@/lib/garden/types';
import { getSystems, getSystemModelRelations, deleteSystem } from '@/lib/garden/api';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, CircleOff, Circle, Brain, Database, Plus, Edit, Trash2 } from 'lucide-react';
import SystemFormDialog from './SystemFormDialog';
import DeleteConfirmDialog from './note-dialog/DeleteConfirmDialog';

interface SystemsViewProps {
  onSelectSystem?: (system: System) => void;
  isAuthenticated?: boolean;
  onRefresh?: () => void;
}

const getSystemIcon = (system: System) => {
  // Use icon based on category
  switch (system.category) {
    case 'cognitive':
      return <Brain className="h-5 w-5 text-blue-500" />;
    case 'data':
      return <Database className="h-5 w-5 text-green-500" />;
    case 'personal':
      return <Circle className="h-5 w-5 text-green-500" />;
    default:
      return <Circle className="h-5 w-5 text-gray-500" />;
  }
};

const SystemsView = ({ onSelectSystem, isAuthenticated = false, onRefresh }: SystemsViewProps) => {
  const [systems, setSystems] = useState<System[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [modelRelationCounts, setModelRelationCounts] = useState<Record<string, number>>({});

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [systemToEdit, setSystemToEdit] = useState<System | undefined>(undefined);
  const [systemToDelete, setSystemToDelete] = useState<System | undefined>(undefined);

  // Fetch systems
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
  
  useEffect(() => {
    fetchSystems();
  }, []);

  const handleSystemClick = (system: System) => {
    setSelectedSystemId(system.id === selectedSystemId ? null : system.id);
    if (onSelectSystem) {
      onSelectSystem(system);
    }
  };

  // Open the edit dialog for a system
  const handleEditSystem = (e: React.MouseEvent, system: System) => {
    e.stopPropagation(); // Prevent row click handler
    setSystemToEdit(system);
    setIsEditDialogOpen(true);
  };

  // Open the delete confirmation for a system
  const handleDeleteClick = (e: React.MouseEvent, system: System) => {
    e.stopPropagation(); // Prevent row click handler
    setSystemToDelete(system);
    setIsDeleteDialogOpen(true);
  };

  // Execute system deletion
  const handleDeleteSystem = async () => {
    if (!systemToDelete) return;
    
    try {
      await deleteSystem(systemToDelete.id);
      toast.success('System deleted successfully');
      fetchSystems();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting system:', error);
      toast.error('Failed to delete system');
    }
  };

  // Handle refresh after system operations
  const handleSystemSuccess = () => {
    fetchSystems();
    if (onRefresh) onRefresh();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Systems</h2>
        
        {isAuthenticated && (
          <Button 
            onClick={() => setIsCreateDialogOpen(true)} 
            size="sm"
            className="gap-1"
          >
            <Plus size={16} />
            New System
          </Button>
        )}
      </div>
      
      {systems.length === 0 ? (
        <div className="text-center p-8 bg-muted/40 rounded-lg border border-dashed">
          <CircleOff className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-medium mb-1">No Systems Found</h3>
          <p className="text-muted-foreground">
            Systems help organize your mental models into cohesive frameworks.
          </p>
          {isAuthenticated && (
            <Button onClick={() => setIsCreateDialogOpen(true)} className="mt-4 gap-1">
              <Plus size={16} />
              Create Your First System
            </Button>
          )}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Models</TableHead>
              <TableHead>Importance</TableHead>
              {isAuthenticated && <TableHead className="text-right">Actions</TableHead>}
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
                {isAuthenticated && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => handleEditSystem(e, system)}
                        title="Edit System"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => handleDeleteClick(e, system)}
                        title="Delete System"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* System Creation Dialog */}
      <SystemFormDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleSystemSuccess}
      />

      {/* System Edit Dialog */}
      {systemToEdit && (
        <SystemFormDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          initialData={systemToEdit}
          onSuccess={handleSystemSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {systemToDelete && (
        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteSystem}
          title={systemToDelete.name}
        />
      )}
    </div>
  );
};

export default SystemsView;
