
import React from 'react';
import { Connection } from '../../lib/garden/types';
import { getRelationshipColor } from './relationshipUtils';
import { Badge } from '@/components/ui/badge';

interface ConnectionsDebugToolProps {
  connections: Connection[];
}

const ConnectionsDebugTool: React.FC<ConnectionsDebugToolProps> = ({ connections }) => {
  if (!connections || connections.length === 0) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="font-semibold text-red-700">No Connections Detected</h3>
        <p className="text-sm text-red-600">
          The graph is not showing connections because no connection data was found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-left">
      <h3 className="font-semibold text-yellow-800 mb-2">Connections Debug</h3>
      <p className="text-sm text-yellow-700 mb-3">
        Found {connections.length} connection(s). They should appear in the graph.
      </p>
      
      <div className="max-h-40 overflow-y-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-yellow-300">
              <th className="py-1 text-left">ID</th>
              <th className="py-1 text-left">Source</th>
              <th className="py-1 text-left">Target</th>
              <th className="py-1 text-left">Relationship</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((conn) => (
              <tr key={conn.id} className="border-b border-yellow-100">
                <td className="py-1">{conn.id}</td>
                <td className="py-1">{typeof conn.sourceId === 'string' ? conn.sourceId.substring(0, 8) + '...' : conn.sourceId}</td>
                <td className="py-1">{typeof conn.targetId === 'string' ? conn.targetId.substring(0, 8) + '...' : conn.targetId}</td>
                <td className="py-1">
                  <Badge 
                    style={{ backgroundColor: getRelationshipColor(conn.relationship) }}
                    className="text-white text-xs"
                  >
                    {conn.relationship}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectionsDebugTool;
