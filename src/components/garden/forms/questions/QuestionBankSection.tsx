
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, Search } from 'lucide-react';

interface QuestionBankSectionProps {
  showQuestionSearch: boolean;
  setShowQuestionSearch: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const QuestionBankSection = ({
  showQuestionSearch,
  setShowQuestionSearch,
  searchQuery,
  setSearchQuery
}: QuestionBankSectionProps) => {
  return (
    <div className="mt-6 p-4 bg-muted rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium mb-1">Link to existing questions</h4>
          <p className="text-xs text-muted-foreground">
            In the future, you'll be able to link this model to questions in your question bank.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          disabled 
          className="h-8"
          onClick={() => setShowQuestionSearch(!showQuestionSearch)}
        >
          <Link size={14} className="mr-1.5" /> Link Questions
        </Button>
      </div>
      
      {showQuestionSearch && (
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search question bank..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled
            />
          </div>
          <div className="text-center p-6">
            <p className="text-sm text-muted-foreground">
              This feature will be available soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
