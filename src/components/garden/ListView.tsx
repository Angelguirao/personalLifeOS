
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MentalModel } from '@/lib/garden/types/mental-model-types';
import NoteCard from './NoteCard';
import { Input } from '../ui/input';
import { Search, Filter } from 'lucide-react';

interface ListViewProps {
  notes: MentalModel[];
}

const ListView = ({ notes }: ListViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredNotes = useMemo(() => {
    // First filter by development stage based on active tab
    const stageFiltered = notes.filter(note => {
      if (activeTab === 'all') return true;
      const stage = note.developmentStage || note.stage || 'seedling';
      return stage === activeTab;
    });
    
    // Then filter by search query if present
    if (!searchQuery.trim()) return stageFiltered;
    
    const query = searchQuery.toLowerCase();
    return stageFiltered.filter(note => {
      return (
        note.title.toLowerCase().includes(query) ||
        (note.subtitle && note.subtitle.toLowerCase().includes(query)) ||
        note.tags.some(tag => tag.toLowerCase().includes(query)) ||
        note.summary.toLowerCase().includes(query)
      );
    });
  }, [notes, activeTab, searchQuery]);
  
  const counts = useMemo(() => {
    const seedlings = notes.filter(n => (n.developmentStage || n.stage) === 'seedling').length;
    const growing = notes.filter(n => (n.developmentStage || n.stage) === 'growing').length;
    const evergreen = notes.filter(n => 
      (n.developmentStage || n.stage) === 'evergreen' || 
      (n.developmentStage || n.stage) === 'mature'
    ).length;
    
    return { seedlings, growing, evergreen };
  }, [notes]);
  
  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search mental models..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Stage tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between pb-3">
          <TabsList>
            <TabsTrigger value="all">
              All ({notes.length})
            </TabsTrigger>
            <TabsTrigger value="seedling">
              Seedlings ({counts.seedlings})
            </TabsTrigger>
            <TabsTrigger value="growing">
              Growing ({counts.growing})
            </TabsTrigger>
            <TabsTrigger value="evergreen">
              Evergreen ({counts.evergreen})
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter size={14} />
            <span>{filteredNotes.length} models</span>
          </div>
        </div>
        
        <TabsContent value="all" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <NoteCard key={note.id} note={note} index={index} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="seedling" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <NoteCard key={note.id} note={note} index={index} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="growing" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <NoteCard key={note.id} note={note} index={index} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="evergreen" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <NoteCard key={note.id} note={note} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No mental models found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ListView;
