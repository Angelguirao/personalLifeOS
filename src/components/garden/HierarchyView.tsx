
import React, { useState, useMemo } from 'react';
import { Layers, ChevronRight, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MentalModel, Question } from '@/lib/garden/types';

interface HierarchyViewProps {
  models: MentalModel[];
  questions: Question[];
  onSelectModel?: (model: MentalModel) => void;
}

export const HierarchyView = ({ models, questions, onSelectModel }: HierarchyViewProps) => {
  const [expandedLevels, setExpandedLevels] = useState<Record<number, boolean>>({
    1: true, 2: true, 3: true, 4: false, 5: false
  });

  // Toggle expansion state for a level
  const toggleLevel = (level: number) => {
    setExpandedLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  // Group models by their hierarchy level
  const hierarchyGroups = useMemo(() => {
    const groups: Record<number, MentalModel[]> = {
      1: [], 2: [], 3: [], 4: [], 5: []
    };
    
    models.forEach(model => {
      const level = model.latchAttributes?.hierarchyLevel || 3;
      if (groups[level]) {
        groups[level].push(model);
      } else {
        groups[3].push(model); // Default to level 3 if not specified
      }
    });
    
    return groups;
  }, [models]);

  // For each level, get a descriptive name
  const getLevelName = (level: number): string => {
    switch(level) {
      case 1: return "Fundamental Principles";
      case 2: return "Conceptual Models";
      case 3: return "Systems";
      case 4: return "Frameworks";
      case 5: return "Applications";
      default: return "Other";
    }
  };

  // Format for displaying questions separately
  const hasQuestions = questions.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-medium">Knowledge Hierarchy</h2>
        <Badge variant="outline" className="ml-2">
          {models.length}
        </Badge>
      </div>

      {/* Questions Section */}
      {hasQuestions && (
        <Card className="mb-6">
          <CardHeader className="py-3">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleLevel(0)}
            >
              <CardTitle className="text-md flex items-center">
                {expandedLevels[0] ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                Foundational Questions
              </CardTitle>
              <Badge variant="secondary">
                {questions.length}
              </Badge>
            </div>
          </CardHeader>
          
          {expandedLevels[0] && (
            <CardContent className="py-2">
              <ul className="space-y-2">
                {questions.map(question => (
                  <li key={question.id} className="border-l-2 pl-3 py-1 border-l-muted-foreground hover:border-l-primary">
                    <div className="text-sm">{question.questionText}</div>
                    <div className="flex mt-1 gap-1">
                      <Badge variant="outline" className="text-xs">
                        {question.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Importance: {question.importanceRank}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      )}

      {/* Hierarchical Levels */}
      {[1, 2, 3, 4, 5].map(level => (
        <Card key={level} className={hierarchyGroups[level].length === 0 ? "opacity-50" : ""}>
          <CardHeader className="py-3">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleLevel(level)}
            >
              <CardTitle className="text-md flex items-center">
                {expandedLevels[level] ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                {getLevelName(level)}
              </CardTitle>
              <Badge variant="secondary">
                {hierarchyGroups[level].length}
              </Badge>
            </div>
          </CardHeader>
          
          {expandedLevels[level] && hierarchyGroups[level].length > 0 && (
            <CardContent className="py-2">
              <ul className="space-y-2">
                {hierarchyGroups[level].map(model => (
                  <li 
                    key={model.id} 
                    className="border-l-2 pl-3 py-1 border-l-muted-foreground hover:border-l-primary cursor-pointer"
                    onClick={() => onSelectModel && onSelectModel(model)}
                  >
                    <div className="font-medium">{model.title}</div>
                    {model.subtitle && <div className="text-sm text-muted-foreground">{model.subtitle}</div>}
                    <div className="flex mt-1 gap-1">
                      {model.tags && model.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <Badge variant="secondary" className="text-xs">
                        {model.developmentStage}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
          
          {expandedLevels[level] && hierarchyGroups[level].length === 0 && (
            <CardContent className="py-4 text-center text-muted-foreground">
              <p>No models at this level yet</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default HierarchyView;
