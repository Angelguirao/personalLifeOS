
import { MentalModelFormValues } from "@/components/garden/forms/types";
import { MentalModel } from "../../types";

/**
 * Process a mental model from the API into a format suitable for the form
 */
export const processModelForForm = (model: MentalModel): MentalModelFormValues => {
  // Extract tags
  const tagComponents = extractTagComponents(model.tags || []);
  
  // Format open questions as newline-separated string
  const openQuestionsStr = model.openQuestions ? model.openQuestions.join('\n') : '';
  
  return {
    // Basic information
    title: model.title || '',
    subtitle: model.subtitle || '',
    developmentStage: model.developmentStage || 'seedling',
    confidenceLevel: model.confidenceLevel || 'working',
    summary: model.summary || '',
    fullContent: model.fullContent || '',
    imageUrl: model.imageUrl || '',
    
    // Tags and categories
    tags: tagComponents.baseTags.join(', '),
    domains: tagComponents.domainTags.join(', '),
    frameworks: tagComponents.frameworkTags.join(', '),
    applications: tagComponents.applicationTags.join(', '),
    
    // LATCH Framework
    latchLocation: model.latchAttributes?.location || '',
    latchAlphabetical: model.latchAttributes?.alphabeticalIndex || '',
    latchTime: model.latchAttributes?.time || '',
    latchCategory: model.latchAttributes?.category || '',
    latchHierarchyLevel: model.latchAttributes?.hierarchyLevel?.toString() || '3',
    
    // DSRP Structure
    dsrpDistinctions: model.dsrpStructure?.distinctions || '',
    dsrpSystems: model.dsrpStructure?.systemStructure || '',
    dsrpRelationships: model.dsrpStructure?.relationships ? JSON.stringify(model.dsrpStructure.relationships) : '',
    dsrpPerspectives: model.dsrpStructure?.perspectives ? model.dsrpStructure.perspectives.join(', ') : '',
    
    // Socratic Attributes
    socraticClarification: model.socraticAttributes?.clarification || '',
    socraticAssumptions: model.socraticAttributes?.assumptions ? model.socraticAttributes.assumptions.join(', ') : '',
    socraticEvidence: model.socraticAttributes?.evidence || '',
    socraticPerspectives: model.socraticAttributes?.alternativePerspectives ? model.socraticAttributes.alternativePerspectives.join(', ') : '',
    socraticImplications: model.socraticAttributes?.implications || '',
    
    // Origin Moment
    originDatetime: model.originMoment?.datetime || '',
    originLocation: model.originMoment?.location || '',
    originEmotions: model.originMoment?.emotions ? model.originMoment.emotions.join(', ') : '',
    originPerceptions: model.originMoment?.perceptions || '',
    
    // Consequences
    consequencesPersonal: model.consequences?.personal || '',
    consequencesInterpersonal: model.consequences?.interpersonal || '',
    consequencesSocietal: model.consequences?.societal || '',
    
    // Open Questions - convert from array to newline-separated string
    openQuestions: openQuestionsStr,
    
    // Book Info
    bookTitle: model.bookInfo?.title || '',
    bookAuthor: model.bookInfo?.author || '',
    bookLink: model.bookInfo?.link || '',
    
    // Visibility
    visibility: model.visibility || 'public',
    
    // These fields start empty and are filled by the user when editing
    versionNote: '',
    createNewVersion: true,
    
    // JSON data field (initially empty)
    jsonData: '',
    
    // Connections and questions will be loaded separately
    connections: [],
    relatedQuestions: []
  };
};

/**
 * Extract different types of tags from a tag array
 */
const extractTagComponents = (tags: string[]) => {
  // Extract tags without prefixes
  const baseTags = tags.filter(tag => 
    !tag.startsWith('domain:') && 
    !tag.startsWith('framework:') && 
    !tag.startsWith('application:')
  ) || [];
  
  // Extract domain tags
  const domainTags = tags.filter(tag => 
    tag.startsWith('domain:')
  ).map(tag => tag.replace('domain:', '')) || [];
  
  // Extract framework tags
  const frameworkTags = tags.filter(tag => 
    tag.startsWith('framework:')
  ).map(tag => tag.replace('framework:', '')) || [];
  
  // Extract application tags
  const applicationTags = tags.filter(tag => 
    tag.startsWith('application:')
  ).map(tag => tag.replace('application:', '')) || [];
  
  return {
    baseTags,
    domainTags,
    frameworkTags,
    applicationTags
  };
};
