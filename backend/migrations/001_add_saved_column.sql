-- Migration: Add saved column to curriculum table
-- This migration adds a saved BOOLEAN column to track which curriculums are saved by users

-- Add the saved column with default FALSE
ALTER TABLE curriculum 
ADD COLUMN IF NOT EXISTS saved BOOLEAN NOT NULL DEFAULT FALSE;

-- Create index on saved column for performance
CREATE INDEX IF NOT EXISTS idx_curriculum_saved 
ON curriculum(saved);
