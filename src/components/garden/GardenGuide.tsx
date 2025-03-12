
import React from 'react';
import { Sprout } from 'lucide-react';

const GardenGuide = () => {
  return (
    <div className="glass p-4 border-l-4 border-green-500 w-full sm:w-auto">
      <h3 className="font-serif text-sm font-semibold mb-1">How to navigate this garden:</h3>
      <ul className="text-xs text-muted-foreground space-y-1">
        <li className="flex items-center">
          <Sprout size={12} className="text-green-400 mr-2 flex-shrink-0" /> 
          <span><strong>Seedlings</strong>: Early-stage ideas, still taking shape</span>
        </li>
        <li className="flex items-center">
          <Sprout size={12} className="text-green-500 mr-2 flex-shrink-0" /> 
          <span><strong>Growing</strong>: Developing thoughts with some substance</span>
        </li>
        <li className="flex items-center">
          <Sprout size={12} className="text-green-600 mr-2 flex-shrink-0" /> 
          <span><strong>Evergreen</strong>: Well-developed, mature ideas</span>
        </li>
      </ul>
    </div>
  );
};

export default GardenGuide;
