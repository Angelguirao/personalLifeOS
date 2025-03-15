
import React from 'react';
import { Link2 } from 'lucide-react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface TagsSectionProps {
  note: MentalModel;
}

const TagsSection = ({ note }: TagsSectionProps) => {
  if (!note.tags || note.tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
      <span className="text-xs text-muted-foreground mr-2">Tags:</span>
      {note.tags.map((tag) => (
        <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
          <Link2 size={10} className="mr-1" />
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagsSection;
