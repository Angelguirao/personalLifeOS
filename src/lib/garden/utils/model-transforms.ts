
import { MentalModel } from '../types/mental-model-types';

// Helper function to transform mental model from Supabase to our interface
export const transformMentalModelFromSupabase = (data: any): MentalModel => {
  return {
    id: data.id,
    title: data.title || '',
    subtitle: data.subtitle || '',
    developmentStage: data.development_stage || 'seedling',
    confidenceLevel: data.confidence_level || 'working',
    summary: data.summary || '',
    fullContent: data.full_content || '',
    imageUrl: data.image_url,
    tags: data.tags || [],
    timestamps: data.timestamps || {
      created: new Date().toISOString(),
      modified: new Date().toISOString()
    },
    originMoment: data.origin_moment,
    applications: data.applications,
    consequences: data.consequences,
    openQuestions: data.open_questions || [],
    latchAttributes: data.latch_attributes || { hierarchyLevel: 3 },
    dsrpStructure: data.dsrp_structure,
    socraticAttributes: data.socratic_attributes,
    hierarchicalView: data.hierarchical_view,
    visibility: data.visibility || 'public',
    questionsLinked: data.questions_linked || [],
    // For backward compatibility
    stage: data.stage || data.development_stage,
    lastUpdated: data.last_updated || data.timestamps?.modified
  };
};

// Helper function to transform mental model to Supabase format
export const transformMentalModelToSupabase = (model: Partial<MentalModel> & { id?: string }) => {
  return {
    id: model.id, // Include the ID when provided
    title: model.title,
    subtitle: model.subtitle,
    development_stage: model.developmentStage,
    confidence_level: model.confidenceLevel,
    summary: model.summary,
    full_content: model.fullContent,
    image_url: model.imageUrl,
    tags: model.tags || [],
    timestamps: model.timestamps,
    origin_moment: model.originMoment,
    applications: model.applications,
    consequences: model.consequences,
    open_questions: model.openQuestions || [],
    latch_attributes: model.latchAttributes,
    dsrp_structure: model.dsrpStructure,
    socratic_attributes: model.socraticAttributes,
    hierarchical_view: model.hierarchicalView,
    visibility: model.visibility,
    questions_linked: model.questionsLinked || [],
    // For backward compatibility
    stage: model.stage,
    last_updated: model.lastUpdated
  };
};
