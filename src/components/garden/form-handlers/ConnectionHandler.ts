
import { RelationshipType } from '@/lib/garden/types';
import { 
  getNoteConnections,
  updateConnection,
  createConnection,
  deleteConnection
} from '@/lib/garden/api';

export const handleConnections = async (
  modelId: string, 
  connections: Array<{
    targetId: string;
    relationship: string;
    strength: number;
  }> = []
) => {
  if (!modelId || !connections || connections.length === 0) return;
  
  try {
    // First, get existing connections to compare
    const existingConnections = await getNoteConnections(modelId);
    console.log('Processing connections for model:', modelId);
    console.log('Connections to handle:', connections);
    console.log('Existing connections:', existingConnections);
    
    // Process each connection
    for (const conn of connections) {
      // Check if this connection already exists
      const existingConn = existingConnections.find(ec => 
        (ec.sourceId === modelId && ec.targetId === conn.targetId) ||
        (ec.targetId === modelId && ec.sourceId === conn.targetId)
      );
      
      if (existingConn) {
        // Update existing connection if needed
        if (existingConn.strength !== conn.strength || existingConn.relationship !== conn.relationship) {
          console.log('Updating connection:', existingConn.id, conn);
          await updateConnection(existingConn.id.toString(), {
            strength: conn.strength,
            relationship: conn.relationship as RelationshipType
          });
        }
      } else {
        // Create new connection
        console.log('Creating new connection:', modelId, conn.targetId);
        await createConnection({
          sourceId: modelId,
          targetId: conn.targetId,
          strength: conn.strength,
          relationship: conn.relationship as RelationshipType
        });
      }
    }
    
    // Delete connections that were removed
    for (const existingConn of existingConnections) {
      const stillExists = connections.some(conn => 
        conn.targetId === (existingConn.sourceId === modelId ? existingConn.targetId : existingConn.sourceId)
      );
      
      if (!stillExists) {
        console.log('Deleting connection:', existingConn.id);
        await deleteConnection(existingConn.id.toString());
      }
    }
  } catch (error) {
    console.error('Error handling connections:', error);
    throw error;
  }
};
