
import { createSystem, getSystems } from '../systems';
import { System } from '../types';

// Check if there's at least one system in the database
export const ensureSystemsExist = async (): Promise<boolean> => {
  try {
    const systems = await getSystems();
    
    if (systems.length === 0) {
      console.log('No systems found. Creating base systems...');
      await createBaseSystems();
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error in ensureSystemsExist:', error);
    return false;
  }
};

// Create the basic systems (Self, Career, Education, etc.)
export const createBaseSystems = async (): Promise<void> => {
  try {
    // Check if systems already exist
    const existingSystems = await getSystems();
    if (existingSystems.length > 0) {
      console.log('Systems already exist, skipping creation');
      return;
    }
    
    // Create Self system first
    const selfSystem = await createSelfSystem();
    console.log('Created Self system:', selfSystem);
    
    // Create other core systems
    await createCareerSystem();
    await createHealthSystem();
    await createEducationSystem();
    
    console.log('Successfully created base systems');
  } catch (error) {
    console.error('Error creating base systems:', error);
  }
};

// Create the Self system
export const createSelfSystem = async (): Promise<System> => {
  try {
    const selfSystemData = {
      name: 'Self',
      description: 'Your core identity, values, thoughts, and experiences that make you who you are.',
      category: 'personal',
      importanceLevel: 5,
      visibility: 'private' as const,
      distinctions: [
        'Experiences',
        'Thoughts',
        'Actions',
        'Desires',
        'Decisions',
        'Work',
        'Identity',
        'Values'
      ],
      color: '#4f46e5',
      icon: 'user'
    };
    
    return await createSystem(selfSystemData);
  } catch (error) {
    console.error('Error creating Self system:', error);
    throw error;
  }
};

// Create the Career system
export const createCareerSystem = async (): Promise<System> => {
  try {
    const careerSystemData = {
      name: 'Career',
      description: 'Professional growth, work experiences, skills development, and job satisfaction.',
      category: 'professional',
      importanceLevel: 4,
      visibility: 'private' as const,
      distinctions: [
        'Skills',
        'Experience',
        'Goals',
        'Networks',
        'Projects',
        'Learning'
      ],
      color: '#0891b2'
    };
    
    return await createSystem(careerSystemData);
  } catch (error) {
    console.error('Error creating Career system:', error);
    throw error;
  }
};

// Create the Health system
export const createHealthSystem = async (): Promise<System> => {
  try {
    const healthSystemData = {
      name: 'Health',
      description: 'Physical and mental wellbeing, including fitness, nutrition, and stress management.',
      category: 'health',
      importanceLevel: 4,
      visibility: 'private' as const,
      distinctions: [
        'Physical Fitness',
        'Nutrition',
        'Mental Health',
        'Sleep',
        'Habits',
        'Medical Care'
      ],
      color: '#16a34a'
    };
    
    return await createSystem(healthSystemData);
  } catch (error) {
    console.error('Error creating Health system:', error);
    throw error;
  }
};

// Create the Education system
export const createEducationSystem = async (): Promise<System> => {
  try {
    const educationSystemData = {
      name: 'Education',
      description: 'Knowledge acquisition, learning strategies, and intellectual development.',
      category: 'cognitive',
      importanceLevel: 4,
      visibility: 'private' as const,
      distinctions: [
        'Formal Education',
        'Self-learning',
        'Reading',
        'Courses',
        'Research',
        'Knowledge Management'
      ],
      color: '#ca8a04'
    };
    
    return await createSystem(educationSystemData);
  } catch (error) {
    console.error('Error creating Education system:', error);
    throw error;
  }
};
