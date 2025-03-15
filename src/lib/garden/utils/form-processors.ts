
import { MentalModelFormValues } from "@/components/garden/forms/types";
import { MentalModel } from "../types";

/**
 * Process form data from the mental model form into the format needed for API submission
 */
export const processFormDataForSubmission = (formData: MentalModelFormValues): Omit<MentalModel, 'id'> & {
  connections?: Array<{
    targetId: string;
    relationship: string;
    strength: number;
  }>;
  relatedQuestions?: Array<{
    id?: string;
    questionText: string;
    isNew?: boolean;
  }>;
  versionInfo?: {
    createNewVersion: boolean;
    versionNote: string;
  };
} => {
  // Generate a timestamp
  const now = new Date().toISOString();
  
  // Process tags from comma-separated string to array
  const processStringsToArray = (str?: string) => 
    str ? str.split(',').map(item => item.trim()).filter(item => item !== '') : [];
  
  const tagsArray = processStringsToArray(formData.tags);
  
  // Add domain, framework, and application tags with prefixes
  const domainTags = processStringsToArray(formData.domains).map(d => `domain:${d}`);
  const frameworkTags = processStringsToArray(formData.frameworks).map(f => `framework:${f}`);
  const applicationTags = processStringsToArray(formData.applications).map(a => `application:${a}`);
  
  // Combine all tags
  const allTags = [...tagsArray, ...domainTags, ...frameworkTags, ...applicationTags];
  
  // Prepare LATCH attributes
  const latchAttributes = {
    location: formData.latchLocation,
    alphabeticalIndex: formData.latchAlphabetical,
    time: formData.latchTime,
    category: formData.latchCategory,
    hierarchyLevel: parseInt(formData.latchHierarchyLevel || '3')
  };
  
  // Prepare DSRP structure
  const dsrpStructure = {
    distinctions: formData.dsrpDistinctions,
    systemStructure: formData.dsrpSystems,
    relationships: formData.dsrpRelationships ? JSON.parse(formData.dsrpRelationships) : undefined,
    perspectives: processStringsToArray(formData.dsrpPerspectives)
  };
  
  // Prepare Socratic attributes
  const socraticAttributes = {
    clarification: formData.socraticClarification,
    assumptions: processStringsToArray(formData.socraticAssumptions),
    evidence: formData.socraticEvidence,
    alternativePerspectives: processStringsToArray(formData.socraticPerspectives),
    implications: formData.socraticImplications
  };
  
  // Prepare origin moment
  const originMoment = formData.originDatetime ? {
    datetime: formData.originDatetime,
    location: formData.originLocation,
    emotions: processStringsToArray(formData.originEmotions),
    perceptions: formData.originPerceptions
  } : undefined;
  
  // Prepare consequences
  const consequences = {
    personal: formData.consequencesPersonal,
    interpersonal: formData.consequencesInterpersonal,
    societal: formData.consequencesSocietal
  };
  
  // Prepare book info if provided
  const bookInfo = formData.bookTitle ? {
    title: formData.bookTitle,
    author: formData.bookAuthor || 'Unknown',
    link: formData.bookLink || ''
  } : undefined;
  
  // Process open questions - split by newlines
  const openQuestions = formData.openQuestions
    ? formData.openQuestions.split('\n').map(q => q.trim()).filter(q => q !== '')
    : [];
  
  // Versioning information
  const versionInfo = {
    createNewVersion: formData.createNewVersion || false,
    versionNote: formData.versionNote || `Update to ${formData.title}`
  };

  // Prepare connections - ensure all required fields are present
  const connections = formData.connections?.map(conn => ({
    targetId: String(conn.targetId),
    relationship: String(conn.relationship),
    strength: conn.strength
  })) || [];

  // Prepare questions - ensure all required fields are present
  const relatedQuestions = formData.relatedQuestions?.map(q => ({
    id: q.id,
    questionText: q.questionText || '', // Default to empty string if missing
    isNew: q.isNew || false
  })) || [];
  
  return {
    title: formData.title,
    subtitle: formData.subtitle || '',
    developmentStage: formData.developmentStage,
    confidenceLevel: formData.confidenceLevel,
    summary: formData.summary,
    fullContent: formData.fullContent,
    tags: allTags,
    timestamps: {
      created: now,
      modified: now,
    },
    latchAttributes,
    dsrpStructure,
    socraticAttributes,
    originMoment,
    consequences,
    openQuestions,
    bookInfo,
    imageUrl: formData.imageUrl,
    visibility: formData.visibility,
    // Additional fields for related entities
    connections, 
    relatedQuestions,
    versionInfo
  };
};

/**
 * Process a mental model from the API into a format suitable for the form
 */
export const processModelForForm = (model: MentalModel): MentalModelFormValues => {
  // Extract tags without prefixes
  const baseTags = model.tags?.filter(tag => 
    !tag.startsWith('domain:') && 
    !tag.startsWith('framework:') && 
    !tag.startsWith('application:')
  ) || [];
  
  // Extract domain tags
  const domainTags = model.tags?.filter(tag => 
    tag.startsWith('domain:')
  ).map(tag => tag.replace('domain:', '')) || [];
  
  // Extract framework tags
  const frameworkTags = model.tags?.filter(tag => 
    tag.startsWith('framework:')
  ).map(tag => tag.replace('framework:', '')) || [];
  
  // Extract application tags
  const applicationTags = model.tags?.filter(tag => 
    tag.startsWith('application:')
  ).map(tag => tag.replace('application:', '')) || [];
  
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
    tags: baseTags.join(', '),
    domains: domainTags.join(', '),
    frameworks: frameworkTags.join(', '),
    applications: applicationTags.join(', '),
    
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
    
    // Open Questions
    openQuestions: model.openQuestions ? model.openQuestions.join('\n') : '',
    
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
