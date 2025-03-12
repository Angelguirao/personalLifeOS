
import React from 'react';
import { Panel } from 'reactflow';

const LegendPanel = () => {
  return (
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
  );
};

export default LegendPanel;
