
import React, { useState } from 'react';
import { 
  Plus, 
  HelpCircle, 
  Edit, 
  X, 
  MessageCircleQuestion,
  Filter
} from 'lucide-react';
import { Question, QuestionCategory } from '@/lib/garden/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateQuestionDialog } from './CreateQuestionDialog';
import { Input } from '@/components/ui/input';

interface QuestionsViewProps {
  questions: Question[];
  models: { id: string, title: string }[];
  onCreateQuestion: (question: Omit<Question, 'id'>) => Promise<void>;
}

export const QuestionsView = ({ 
  questions, 
  models,
  onCreateQuestion 
}: QuestionsViewProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<QuestionCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter questions based on selected category and search query
  const filteredQuestions = questions
    .filter(q => categoryFilter === 'all' || q.category === categoryFilter)
    .filter(q => 
      searchQuery === '' || 
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.importanceRank - a.importanceRank);

  const getCategoryColor = (category: QuestionCategory) => {
    switch(category) {
      case 'philosophical': return 'bg-purple-100 text-purple-800';
      case 'ethical': return 'bg-green-100 text-green-800';
      case 'practical': return 'bg-blue-100 text-blue-800'; 
      case 'scientific': return 'bg-amber-100 text-amber-800';
      case 'social': return 'bg-rose-100 text-rose-800';
      case 'personal': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircleQuestion className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">Questions</h2>
          <Badge variant="outline" className="ml-2">
            {questions.length}
          </Badge>
        </div>
        <Button 
          size="sm" 
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          New Question
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1 relative">
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <HelpCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <Select 
            value={categoryFilter} 
            onValueChange={(value) => setCategoryFilter(value as QuestionCategory | 'all')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="philosophical">Philosophical</SelectItem>
              <SelectItem value="ethical">Ethical</SelectItem>
              <SelectItem value="practical">Practical</SelectItem>
              <SelectItem value="scientific">Scientific</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/30">
          <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No questions found</h3>
          <p className="text-muted-foreground mt-2">
            {questions.length > 0 
              ? "Try adjusting your search or filters" 
              : "Start by adding some questions to your garden"}
          </p>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)} 
            className="mt-4"
          >
            Create Your First Question
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestions.map((question) => (
            <Card key={question.id} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge 
                    variant="secondary" 
                    className={getCategoryColor(question.category)}
                  >
                    {question.category}
                  </Badge>
                  <Badge variant="outline">
                    Importance: {question.importanceRank}/10
                  </Badge>
                </div>
                <CardTitle className="text-base mt-2">{question.questionText}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                {question.relatedModels.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Related Models:</p>
                    <div className="flex flex-wrap gap-2">
                      {question.relatedModels.map(modelId => {
                        const model = models.find(m => m.id === modelId);
                        return (
                          <Badge key={modelId} variant="outline" className="text-xs">
                            {model?.title || 'Unknown Model'}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Badge 
                  variant={question.clarificationNeeded ? "destructive" : "outline"}
                  className="text-xs"
                >
                  {question.clarificationNeeded ? 'Needs Clarification' : 'Clear'}
                </Badge>
                <div className="flex space-x-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8" disabled>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <CreateQuestionDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateQuestion={onCreateQuestion}
        models={models}
      />
    </div>
  );
};
