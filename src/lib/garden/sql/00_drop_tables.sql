
-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS mental_model_versions CASCADE;
DROP TABLE IF EXISTS connections CASCADE;
DROP TABLE IF EXISTS inspirations CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS system_model_relations CASCADE;
DROP TABLE IF EXISTS mental_models CASCADE;
DROP TABLE IF EXISTS system_distinction_relations CASCADE;
DROP TABLE IF EXISTS systems CASCADE;
DROP TABLE IF EXISTS distinction_versions CASCADE;
DROP TABLE IF EXISTS distinctions CASCADE;
DROP TABLE IF EXISTS relationship_types CASCADE;
DROP TABLE IF EXISTS perspective_types CASCADE;

-- Create schemas for each DSRP element
CREATE SCHEMA IF NOT EXISTS distinctions;
CREATE SCHEMA IF NOT EXISTS systems;
CREATE SCHEMA IF NOT EXISTS relationships;
CREATE SCHEMA IF NOT EXISTS perspectives;
