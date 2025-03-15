
import { MentalModel } from '../types';

// Transform a row from the Supabase database to our MentalModel type
export const transformMentalModelFromSupabase = (data: any): MentalModel => {
  return {
    id: data.id,
    title: data.title || '',
    subtitle: data.subtitle || '',
    summary: data.summary || '',
    fullContent: data.content || '', // Map from content to fullContent
    developmentStage: data.development_stage || 'seedling',
    confidenceLevel: data.confidence_level || 'working',
    imageUrl: data.image_url || '',
    tags: data.tags || [],
    visibility: data.visibility || 'public',
    createdAt: data.created_at ? new Date(data.created_at) : new Date(),
    updatedAt: data.updated_at ? new Date(data.updated_at) : new Date(),
    
    // Optional complex fields
    timestamps: data.timestamps || null,
    originMoment: data.origin_moment || null,
    applications: data.applications || null,
    consequences: data.consequences || null,
    openQuestions: data.open_questions || [],
    latchAttributes: data.latch_attributes || null,
    dsrpStructure: data.dsrp_structure || null,
    socraticAttributes: data.socratic_attributes || null,
    hierarchicalView: data.hierarchical_view || null,
    
    // Legacy fields (for compatibility)
    stage: data.development_stage || 'seedling',
    lastUpdated: data.updated_at ? new Date(data.updated_at) : new Date(),
    questionsLinked: data.questions_linked || [],
  };
};

// Transform our MentalModel type to a format for Supabase database
export const transformMentalModelToSupabase = (model: MentalModel): any => {
  return {
    id: model.id,
    type: 'mental_model', // Explicitly set type for distinctions.distinctions table
    title: model.title,
    subtitle: model.subtitle,
    summary: model.summary,
    content: model.fullContent, // Map from fullContent to content
    development_stage: model.developmentStage,
    confidence_level: model.confidenceLevel,
    image_url: model.imageUrl,
    tags: model.tags,
    visibility: model.visibility,
    
    // Optional complex fields
    timestamps: model.timestamps,
    origin_moment: model.originMoment,
    applications: model.applications,
    consequences: model.consequences,
    open_questions: model.openQuestions,
    latch_attributes: model.latchAttributes,
    dsrp_structure: model.dsrpStructure,
    socratic_attributes: model.socraticAttributes,
    hierarchical_view: model.hierarchicalView,
    
    // We don't need to map created_at and updated_at as they're handled by the database
  };
};
