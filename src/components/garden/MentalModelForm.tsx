import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { MentalModel } from '@/lib/garden/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Book, BookOpen, Calendar, ArrowUp, ArrowDown, Check } from 'lucide-react';

// Form schema for validation
const mentalModelSchema = z.object({
  // Basic information
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  developmentStage: z.enum(['seedling', 'growing', 'evergreen', 'mature', 'refined']),
  confidenceLevel: z.enum(['hypothesis', 'working', 'established', 'fundamental']),
  summary: z.string().min(1, 'Summary is required'),
  fullContent: z.string().min(1, 'Content is required'),
  
  // Tags and categories
  tags: z.string().optional(),
  domains: z.string().optional(),
  frameworks: z.string().optional(),
  applications: z.string().optional(),
  
  // LATCH Framework
  latchLocation: z.string().optional(),
  latchAlphabetical: z.string().optional(),
  latchTime: z.string().optional(),
  latchCategory: z.string().optional(),
  latchHierarchyLevel: z.string().optional(),
  
  // DSRP Structure
  dsrpDistinctions: z.string().optional(),
  dsrpSystems: z.string().optional(),
  dsrpRelationships: z.string().optional(),
  dsrpPerspectives: z.string().optional(),
  
  // Socratic Attributes
  socraticClarification: z.string().optional(),
  socraticAssumptions: z.string().optional(),
  socraticEvidence: z.string().optional(),
  socraticPerspectives: z.string().optional(),
  socraticImplications: z.string().optional(),
  
  // Consequences
  consequencesPersonal: z.string().optional(),
  consequencesInterpersonal: z.string().optional(),
  consequencesSocietal: z.string().optional(),
  
  // Open Questions
  openQuestions: z.string().optional(),
  
  // Inspiration
  bookTitle: z.string().optional(),
  bookAuthor: z.string().optional(),
  bookLink: z.string().optional(),
  
  // Visibility and Metadata
  visibility: z.enum(['public', 'private', 'unlisted']).default('public'),
  imageUrl: z.string().optional(),
});

export type MentalModelFormValues = z.infer<typeof mentalModelSchema>;

interface MentalModelFormProps {
  model?: MentalModel;
  onSubmit: (data: MentalModelFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const MentalModelForm = ({ model, onSubmit, onCancel, isSubmitting }: MentalModelFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  
  // Convert arrays to comma-separated strings for form initialization
  const convertArrayToString = (arr?: string[]) => arr ? arr.join(', ') : '';
  
  const form = useForm<MentalModelFormValues>({
    resolver: zodResolver(mentalModelSchema),
    defaultValues: {
      // Basic information
      title: model?.title || '',
      subtitle: model?.subtitle || '',
      developmentStage: model?.developmentStage || 'seedling',
      confidenceLevel: model?.confidenceLevel || 'working',
      summary: model?.summary || '',
      fullContent: model?.fullContent || '',
      
      // Tags and categories
      tags: convertArrayToString(model?.tags?.filter(tag => !tag.startsWith('domain:') && !tag.startsWith('framework:') && !tag.startsWith('application:'))),
      domains: model?.tags?.filter(tag => tag.startsWith('domain:')).map(tag => tag.replace('domain:', '')).join(', ') || '',
      frameworks: model?.tags?.filter(tag => tag.startsWith('framework:')).map(tag => tag.replace('framework:', '')).join(', ') || '',
      applications: model?.tags?.filter(tag => tag.startsWith('application:')).map(tag => tag.replace('application:', '')).join(', ') || '',
      
      // LATCH Framework
      latchLocation: model?.latchAttributes?.location || '',
      latchAlphabetical: model?.latchAttributes?.alphabeticalIndex || '',
      latchTime: model?.latchAttributes?.time || '',
      latchCategory: model?.latchAttributes?.category || '',
      latchHierarchyLevel: model?.latchAttributes?.hierarchyLevel?.toString() || '3',
      
      // DSRP Structure
      dsrpDistinctions: model?.dsrpStructure?.distinctions || '',
      dsrpSystems: model?.dsrpStructure?.systemStructure || '',
      dsrpRelationships: model?.dsrpStructure?.relationships ? JSON.stringify(model.dsrpStructure.relationships) : '',
      dsrpPerspectives: model?.dsrpStructure?.perspectives ? model.dsrpStructure.perspectives.join(', ') : '',
      
      // Socratic Attributes
      socraticClarification: model?.socraticAttributes?.clarification || '',
      socraticAssumptions: model?.socraticAttributes?.assumptions ? model.socraticAttributes.assumptions.join(', ') : '',
      socraticEvidence: model?.socraticAttributes?.evidence || '',
      socraticPerspectives: model?.socraticAttributes?.alternativePerspectives ? model.socraticAttributes.alternativePerspectives.join(', ') : '',
      socraticImplications: model?.socraticAttributes?.implications || '',
      
      // Consequences
      consequencesPersonal: model?.consequences?.personal || '',
      consequencesInterpersonal: model?.consequences?.interpersonal || '',
      consequencesSocietal: model?.consequences?.societal || '',
      
      // Open Questions
      openQuestions: model?.openQuestions ? model.openQuestions.join('\n') : '',
      
      // Book Info
      bookTitle: model?.bookInfo?.title || '',
      bookAuthor: model?.bookInfo?.author || '',
      bookLink: model?.bookInfo?.link || '',
      
      // Visibility and Metadata
      visibility: (model?.visibility === 'restricted' ? 'private' : model?.visibility) || 'public',
      imageUrl: model?.imageUrl || '',
    },
  });

  const handleSubmit = async (data: MentalModelFormValues) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>
          
          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Mental model title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="developmentStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Development Stage</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="seedling">Seedling</option>
                        <option value="growing">Growing</option>
                        <option value="evergreen">Evergreen</option>
                        <option value="mature">Mature</option>
                        <option value="refined">Refined</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confidenceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confidence Level</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="hypothesis">Hypothesis</option>
                        <option value="working">Working</option>
                        <option value="established">Established</option>
                        <option value="fundamental">Fundamental</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief summary of this mental model" rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed explanation of this mental model" rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...field}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="unlisted">Unlisted</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          {/* Metadata Tab */}
          <TabsContent value="metadata" className="space-y-4">
            <h3 className="text-lg font-semibold">Metadata & Organization</h3>
            
            <div className="space-y-4">
              <h4 className="text-md font-medium">Tags & Categories</h4>
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>General Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tags separated by commas" {...field} />
                    </FormControl>
                    <FormDescription>General tags for categorization</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="domains"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domains</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Philosophy, Ecology, Technology" {...field} />
                    </FormControl>
                    <FormDescription>Knowledge domains this model belongs to</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="frameworks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frameworks</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Systems Thinking, Deep Ecology" {...field} />
                    </FormControl>
                    <FormDescription>Conceptual frameworks used</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="applications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applications</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Biophilic Cities, Circular Economy" {...field} />
                    </FormControl>
                    <FormDescription>Practical applications of this model</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <h4 className="text-md font-medium flex items-center gap-2">
                <Calendar size={16} />
                LATCH Framework
              </h4>
              
              <FormField
                control={form.control}
                name="latchLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Geographic or conceptual location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="latchAlphabetical"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alphabetical Index</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., A for Anthropocene" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="latchTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Period</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Present & Future" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="latchCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Ecological Thought, Ethics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="latchHierarchyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hierarchy Level (1-5)</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="1">1 - Fundamental</option>
                        <option value="2">2 - Applied Model</option>
                        <option value="3">3 - System</option>
                        <option value="4">4 - Framework</option>
                        <option value="5">5 - Specific Instance</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <h3 className="text-lg font-semibold">Analysis & Critical Thinking</h3>
            
            <div className="space-y-4">
              <h4 className="text-md font-medium flex items-center gap-2">
                <BookOpen size={16} />
                DSRP Structure
              </h4>
              
              <FormField
                control={form.control}
                name="dsrpDistinctions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distinctions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Key distinctions made by this model" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dsrpSystems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Systems</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Systems structure related to this model" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dsrpRelationships"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationships</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Key relationships in this model" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dsrpPerspectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perspectives</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Different perspectives on this model (comma separated)" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <h4 className="text-md font-medium flex items-center gap-2">
                <Check size={16} />
                Socratic Method
              </h4>
              
              <FormField
                control={form.control}
                name="socraticClarification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clarification</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What does this model clarify or define?" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socraticAssumptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assumptions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Key assumptions made (comma separated)" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socraticEvidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Evidence</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Evidence supporting or refuting this model" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socraticPerspectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternative Perspectives</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Alternative ways of viewing this topic (comma separated)" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socraticImplications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Implications</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Implications if this model is true" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          {/* Additional Tab */}
          <TabsContent value="additional" className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            
            <div className="space-y-4">
              <h4 className="text-md font-medium flex items-center gap-2">
                <ArrowDown size={16} />
                Consequences
              </h4>
              
              <FormField
                control={form.control}
                name="consequencesPersonal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Level</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Consequences for individuals" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="consequencesInterpersonal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interpersonal Level</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Consequences for relationships" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="consequencesSocietal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Societal Level</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Broader societal consequences" rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <h4 className="text-md font-medium flex items-center gap-2">
                <ArrowUp size={16} />
                Open Questions
              </h4>
              
              <FormField
                control={form.control}
                name="openQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open Questions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter each question on a new line" rows={4} {...field} />
                    </FormControl>
                    <FormDescription>Questions this model raises or leaves unanswered</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <h4 className="text-md font-medium flex items-center gap-2">
                <Book size={16} />
                Book Reference
              </h4>
              
              <FormField
                control={form.control}
                name="bookTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Book title if this model references a book" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bookAuthor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Book author" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bookLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input placeholder="URL to book or reference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="URL to an image representing this model" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : model ? 'Update Model' : 'Create Model'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MentalModelForm;
