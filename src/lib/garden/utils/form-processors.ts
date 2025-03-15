
import { MentalModelFormValues } from "@/components/garden/MentalModelForm";
import { MentalModel } from "../types";

/**
 * Process form data from the mental model form into the format needed for API submission
 */
export const processFormDataForSubmission = (formData: MentalModelFormValues): Omit<MentalModel, 'id'> => {
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
  };
};
