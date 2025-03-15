
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
  if (!modelId || connections.length === 0) return;
  
  // First, get existing connections to compare
  const existingConnections = await getNoteConnections(modelId);
  
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
        await updateConnection(existingConn.id.toString(), {
          strength: conn.strength,
          relationship: conn.relationship as RelationshipType
        });
      }
    } else {
      // Create new connection
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
      await deleteConnection(existingConn.id.toString());
    }
  }
};
