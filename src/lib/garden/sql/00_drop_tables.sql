
-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS perspectives.inspirations CASCADE;
DROP TABLE IF EXISTS perspectives.perspective_types CASCADE;

DROP TABLE IF EXISTS relationships.system_distinction_relations CASCADE;
DROP TABLE IF EXISTS relationships.connections CASCADE;
DROP TABLE IF EXISTS relationships.relationship_types CASCADE;

DROP TABLE IF EXISTS systems.systems CASCADE;

DROP TABLE IF EXISTS distinctions.versions CASCADE;
DROP TABLE IF EXISTS distinctions.distinctions CASCADE;

-- Create schemas for each DSRP element
CREATE SCHEMA IF NOT EXISTS distinctions;
CREATE SCHEMA IF NOT EXISTS systems;
CREATE SCHEMA IF NOT EXISTS relationships;
CREATE SCHEMA IF NOT EXISTS perspectives;
