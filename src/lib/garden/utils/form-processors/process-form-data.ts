
import { MentalModelFormValues } from "@/components/garden/forms/types";
import { MentalModel } from "../../types";

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
  
  // Process tags and related metadata
  const processedTagsData = processTagsData(formData);
  const allTags = processedTagsData.allTags;
  
  // Prepare structured data
  const latchAttributes = prepareLatchAttributes(formData);
  const dsrpStructure = prepareDsrpStructure(formData);
  const socraticAttributes = prepareSocraticAttributes(formData);
  const originMoment = prepareOriginMoment(formData);
  const consequences = prepareConsequences(formData);
  const bookInfo = prepareBookInfo(formData);
  
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

// Helper functions for processing form data

/**
 * Process tags from form data
 */
const processTagsData = (formData: MentalModelFormValues) => {
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
  
  return { 
    tagsArray,
    domainTags,
    frameworkTags,
    applicationTags,
    allTags
  };
};

/**
 * Prepare LATCH attributes from form data
 */
const prepareLatchAttributes = (formData: MentalModelFormValues) => {
  return {
    location: formData.latchLocation,
    alphabeticalIndex: formData.latchAlphabetical,
    time: formData.latchTime,
    category: formData.latchCategory,
    hierarchyLevel: parseInt(formData.latchHierarchyLevel || '3')
  };
};

/**
 * Prepare DSRP structure from form data
 */
const prepareDsrpStructure = (formData: MentalModelFormValues) => {
  const processStringsToArray = (str?: string) => 
    str ? str.split(',').map(item => item.trim()).filter(item => item !== '') : [];
    
  return {
    distinctions: formData.dsrpDistinctions,
    systemStructure: formData.dsrpSystems,
    relationships: formData.dsrpRelationships ? JSON.parse(formData.dsrpRelationships) : undefined,
    perspectives: processStringsToArray(formData.dsrpPerspectives)
  };
};

/**
 * Prepare Socratic attributes from form data
 */
const prepareSocraticAttributes = (formData: MentalModelFormValues) => {
  const processStringsToArray = (str?: string) => 
    str ? str.split(',').map(item => item.trim()).filter(item => item !== '') : [];
    
  return {
    clarification: formData.socraticClarification,
    assumptions: processStringsToArray(formData.socraticAssumptions),
    evidence: formData.socraticEvidence,
    alternativePerspectives: processStringsToArray(formData.socraticPerspectives),
    implications: formData.socraticImplications
  };
};

/**
 * Prepare origin moment from form data
 */
const prepareOriginMoment = (formData: MentalModelFormValues) => {
  const processStringsToArray = (str?: string) => 
    str ? str.split(',').map(item => item.trim()).filter(item => item !== '') : [];
    
  return formData.originDatetime ? {
    datetime: formData.originDatetime,
    location: formData.originLocation,
    emotions: processStringsToArray(formData.originEmotions),
    perceptions: formData.originPerceptions
  } : undefined;
};

/**
 * Prepare consequences from form data
 */
const prepareConsequences = (formData: MentalModelFormValues) => {
  return {
    personal: formData.consequencesPersonal,
    interpersonal: formData.consequencesInterpersonal,
    societal: formData.consequencesSocietal
  };
};

/**
 * Prepare book info from form data
 */
const prepareBookInfo = (formData: MentalModelFormValues) => {
  return formData.bookTitle ? {
    title: formData.bookTitle,
    author: formData.bookAuthor || 'Unknown',
    link: formData.bookLink || ''
  } : undefined;
};
