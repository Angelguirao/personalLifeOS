
-- This is the main file that runs all SQL scripts in order
-- It includes references to the individual files for clarity

-- 1. Drop existing tables and create schemas
\i 00_drop_tables.sql

-- 2. Create distinctions schema tables
\i 01_distinctions.sql

-- 3. Create systems schema tables
\i 02_systems.sql

-- 4. Create relationships schema tables
\i 03_relationships.sql

-- 5. Create perspectives schema tables
\i 04_perspectives.sql

-- 6. Create views
\i 05_views.sql

-- 7. Create triggers and functions
\i 06_triggers.sql

-- Note: When running this directly in PostgreSQL, use the full path to each file
-- or ensure your current directory contains these files
