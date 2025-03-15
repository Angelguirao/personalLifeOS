
-- This is the main file that runs all SQL scripts in order
-- It creates the database schema for the Garden application

BEGIN;

-- 1. Drop existing tables and create schemas
\i src/lib/garden/sql/00_drop_tables.sql

-- 2. Create distinctions schema tables
\i src/lib/garden/sql/01_distinctions.sql

-- 3. Create systems schema tables
\i src/lib/garden/sql/02_systems.sql

-- 4. Create relationships schema tables
\i src/lib/garden/sql/03_relationships.sql

-- 5. Create perspectives schema tables
\i src/lib/garden/sql/04_perspectives.sql

-- 6. Create views
\i src/lib/garden/sql/05_views.sql

-- 7. Create triggers and functions
\i src/lib/garden/sql/06_triggers.sql

COMMIT;

-- Note: When running this directly in PostgreSQL, use the full path to each file
-- or ensure your current directory contains these files
