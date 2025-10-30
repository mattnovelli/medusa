export interface RepairRequest {
  id?: number
  name: string
  email: string
  phone: string
  contact_method: "email" | "phone"
  item: string
  issue: string
  created_at?: Date
  updated_at?: Date
}

export interface DatabaseConfig {
  host: string
  port: number
  database: string
  user: string
  password: string
}

export interface RepairFormActionResult {
  success: boolean
  error?: string
  message?: string
}

// Validation constants
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 254,
  PHONE_MAX_LENGTH: 20,
  ITEM_MIN_LENGTH: 3,
  ITEM_MAX_LENGTH: 500,
  ISSUE_MIN_LENGTH: 5,
  ISSUE_MAX_LENGTH: 2000,
} as const

// SQL schema for creating the repair_requests table
export const REPAIR_REQUESTS_TABLE_SCHEMA = `
CREATE TABLE IF NOT EXISTS repair_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  contact_method VARCHAR(10) NOT NULL CHECK (contact_method IN ('email', 'phone')),
  item VARCHAR(500) NOT NULL,
  issue TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_repair_requests_email ON repair_requests(email);

-- Create an index on created_at for chronological sorting
CREATE INDEX IF NOT EXISTS idx_repair_requests_created_at ON repair_requests(created_at);
`
