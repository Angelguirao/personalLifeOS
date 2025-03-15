
import React from 'react';
import { Frown } from 'lucide-react';

const NoProjects = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Frown className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">No Projects Found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        There are no projects to display at the moment. Please check back later.
      </p>
    </div>
  );
};

export default NoProjects;
