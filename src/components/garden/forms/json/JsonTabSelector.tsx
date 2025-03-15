
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, HelpCircle, Clock } from 'lucide-react';

export type JsonTabType = "complete" | "model" | "connections" | "inspirations" | "questions" | "versioning";

interface JsonTabSelectorProps {
  activeTab: JsonTabType;
  setActiveTab: (tab: JsonTabType) => void;
}

export const JsonTabSelector = ({ activeTab, setActiveTab }: JsonTabSelectorProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Code size={20} />
        JSON Import/Export
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Import or export mental model data in JSON format for easier editing or backup
      </p>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as JsonTabType)} className="mb-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="complete">Complete Data</TabsTrigger>
          <TabsTrigger value="model">Model Only</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="inspirations">Inspirations</TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-1.5">
            <HelpCircle size={14} /> Questions
          </TabsTrigger>
          <TabsTrigger value="versioning" className="flex items-center gap-1.5">
            <Clock size={14} /> Versioning
          </TabsTrigger>
        </TabsList>
        
        <p className="text-sm text-muted-foreground mt-2">
          {activeTab === "complete" && "View and edit all data including the model, connections, and related entities"}
          {activeTab === "model" && "View and edit only the mental model data without related entities"}
          {activeTab === "connections" && "View and edit only the connections between this model and other models"}
          {activeTab === "inspirations" && "View and edit only inspirations like book references"}
          {activeTab === "questions" && "View and edit open questions and related questions"}
          {activeTab === "versioning" && "View and edit version control information"}
        </p>
      </Tabs>
    </>
  );
};
