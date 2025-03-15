
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface GardenSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const GardenSearch = ({ searchQuery, setSearchQuery }: GardenSearchProps) => {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search mental models..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default GardenSearch;
