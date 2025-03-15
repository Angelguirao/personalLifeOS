
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyGardenProps {
  onCreateModel: () => void;
  isAuthenticated: boolean;
}

const EmptyGarden = ({ onCreateModel, isAuthenticated }: EmptyGardenProps) => {
  return (
    <div className="h-64 flex flex-col items-center justify-center border rounded-lg p-8 bg-muted/30">
      <h3 className="text-lg font-medium mb-2">No Distinctions Found</h3>
      <p className="text-muted-foreground text-center mb-6">
        {isAuthenticated
          ? "Your digital garden is empty. Start by creating your first distinction."
          : "The digital garden is empty. Sign in as an admin to add distinctions."}
      </p>
      {isAuthenticated && (
        <Button onClick={onCreateModel}>
          Create Your First Distinction
        </Button>
      )}
    </div>
  );
};

export default EmptyGarden;
