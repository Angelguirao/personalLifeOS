
import React from 'react';

interface PlaceholderViewProps {
  title: string;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title }) => {
  return (
    <div className="h-[400px] rounded-xl border shadow-sm overflow-hidden flex items-center justify-center">
      <div className="text-center p-6 max-w-md">
        <h3 className="text-lg font-medium mb-2">
          {title} Coming Soon
        </h3>
        <p className="text-muted-foreground">
          This perspective is still under development. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderView;
