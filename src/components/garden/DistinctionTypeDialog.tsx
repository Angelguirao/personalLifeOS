
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircleQuestion, Sparkle } from 'lucide-react';
import { DistinctionType } from '@/components/garden/ViewModeSelector';

interface DistinctionTypeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onTypeSelect: (type: DistinctionType) => void;
}

const DistinctionTypeDialog = ({ isOpen, onOpenChange, onTypeSelect }: DistinctionTypeDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Distinction</DialogTitle>
          <DialogDescription>
            Choose what kind of distinction you want to create.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-auto p-4 space-y-2 hover:bg-muted transition-colors"
            onClick={() => onTypeSelect('mentalModel')}
          >
            <Brain className="h-10 w-10 text-primary mb-2" />
            <span className="font-medium text-sm">Mental Model</span>
            <span className="text-xs text-muted-foreground text-center line-clamp-2">
              Frameworks for understanding
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-auto p-4 space-y-2 hover:bg-muted transition-colors"
            onClick={() => onTypeSelect('question')}
          >
            <MessageCircleQuestion className="h-10 w-10 text-indigo-600 mb-2" />
            <span className="font-medium text-sm">Question</span>
            <span className="text-xs text-muted-foreground text-center line-clamp-2">
              Inquiries to explore
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-auto p-4 space-y-2 hover:bg-muted transition-colors"
            onClick={() => onTypeSelect('experience')}
          >
            <Sparkle className="h-10 w-10 text-amber-500 mb-2" />
            <span className="font-medium text-sm">Experience</span>
            <span className="text-xs text-muted-foreground text-center line-clamp-2">
              Personal insights
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DistinctionTypeDialog;
