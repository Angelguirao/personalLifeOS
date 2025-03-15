
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyGardenProps {
  onCreateModel: () => void;
}

const EmptyGarden = ({ onCreateModel }: EmptyGardenProps) => {
  return (
    <div className="h-64 flex flex-col items-center justify-center border rounded-lg p-8 bg-muted/30">
      <h3 className="text-lg font-medium mb-2">No Mental Models Found</h3>
      <p className="text-muted-foreground text-center mb-6">
        Your digital garden is empty. Start by creating your first mental model.
      </p>
      <Button onClick={onCreateModel}>
        Create Your First Mental Model
      </Button>
    </div>
  );
};

export default EmptyGarden;
