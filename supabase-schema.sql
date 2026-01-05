-- Supabase Database Schema for Wix Component Studio

-- Components Table
CREATE TABLE components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Component Metadata
  name TEXT NOT NULL,
  category TEXT,
  component_type TEXT,
  description TEXT,
  
  -- Component Code
  code TEXT NOT NULL,
  manifest JSONB,
  
  -- Generation Info
  user_prompt TEXT,
  design_brief TEXT,
  generated_by TEXT DEFAULT 'claude',
  
  -- Metadata
  tags TEXT[],
  is_favorite BOOLEAN DEFAULT FALSE,
  usage_count INTEGER DEFAULT 0,
  
  -- User (optional, for multi-user support)
  user_id TEXT
);

-- Create index on category and type for faster queries
CREATE INDEX idx_components_category ON components(category);
CREATE INDEX idx_components_type ON components(component_type);
CREATE INDEX idx_components_created_at ON components(created_at DESC);
CREATE INDEX idx_components_user_id ON components(user_id);
CREATE INDEX idx_components_tags ON components USING GIN(tags);

-- Bulk Generation Sessions Table
CREATE TABLE bulk_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Session Info
  total_requested INTEGER NOT NULL,
  total_generated INTEGER DEFAULT 0,
  total_failed INTEGER DEFAULT 0,
  status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed', 'failed'
  
  -- Metadata
  user_id TEXT,
  csv_filename TEXT
);

-- Link components to bulk sessions
ALTER TABLE components
ADD COLUMN bulk_session_id UUID REFERENCES bulk_sessions(id);

-- Enable Row Level Security (RLS)
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_sessions ENABLE ROW LEVEL SECURITY;

-- Public access policy (adjust based on your needs)
-- For now, allow anyone to read/write (you can make this stricter)
CREATE POLICY "Allow public read access on components"
  ON components FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on components"
  ON components FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on components"
  ON components FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete on components"
  ON components FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access on bulk_sessions"
  ON bulk_sessions FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on bulk_sessions"
  ON bulk_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on bulk_sessions"
  ON bulk_sessions FOR UPDATE
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER components_updated_at
BEFORE UPDATE ON components
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Sample query examples:

-- Get all components ordered by most recent
-- SELECT * FROM components ORDER BY created_at DESC;

-- Get components by category
-- SELECT * FROM components WHERE category = 'Navigation' ORDER BY created_at DESC;

-- Get favorites
-- SELECT * FROM components WHERE is_favorite = TRUE ORDER BY created_at DESC;

-- Search by tags
-- SELECT * FROM components WHERE 'carousel' = ANY(tags);

-- Get bulk session with components
-- SELECT bs.*, COUNT(c.id) as component_count
-- FROM bulk_sessions bs
-- LEFT JOIN components c ON c.bulk_session_id = bs.id
-- GROUP BY bs.id
-- ORDER BY bs.created_at DESC;



