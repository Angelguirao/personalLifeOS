
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface GardenSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Component hidden per user request but kept for future reference
const GardenSearch = ({ searchQuery, setSearchQuery }: GardenSearchProps) => {
  return (
    <div className="hidden relative w-full sm:w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search distinctions..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default GardenSearch;
