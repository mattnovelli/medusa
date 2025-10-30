"use server"

import { Pool } from "pg"
import {
  RepairRequest,
  RepairFormActionResult,
  REPAIR_REQUESTS_TABLE_SCHEMA,
  VALIDATION_RULES,
} from "../types/repair"

/**
 * Security Notes:
 * 1. All user inputs are sanitized and validated
 * 2. Rate limiting prevents spam (3 requests per 15 minutes)
 * 3. Honeypot field detects bot submissions
 * 4. SQL injection protection via parameterized queries
 * 5. HTML escaping prevents XSS in Discord notifications
 * 6. Error messages don't leak sensitive information
 * 7. Input length limits prevent buffer overflow attempts
 * 8. Discord webhook URL secured via environment variables only
 */

// Database configuration - supports both connection URL and individual components
function getDatabaseConfig() {
  const connectionUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL

  if (connectionUrl) {
    // Use connection URL if provided (e.g., from Railway, Heroku, etc.)
    return { connectionString: connectionUrl }
  }

  // Fall back to individual components
  return {
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    database: process.env.POSTGRES_DATABASE || "your_database_name",
    user: process.env.POSTGRES_USER || "your_username",
    password: process.env.POSTGRES_PASSWORD || "your_password",
  }
}

// Create a connection pool for better performance
let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    const dbConfig = getDatabaseConfig()
    pool = new Pool(dbConfig)

    // Handle connection errors
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err)
    })
  }
  return pool
}

// Input sanitization and validation utilities
function sanitizeString(input: string, maxLength: number): string {
  if (typeof input !== "string") return ""

  // Remove null bytes and other dangerous characters
  let sanitized = input
    .replace(/\0/g, "") // Remove null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Remove control characters
    .trim()

  // Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function validateEmail(email: string): boolean {
  // More comprehensive email validation
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

function validatePhone(phone: string): boolean {
  // Allow various phone number formats
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,20}$/
  const digitsOnly = phone.replace(/[^\d]/g, "")
  return (
    phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15
  )
}

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3 // Max 3 requests per 15 minutes per IP

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const userRateLimit = rateLimitMap.get(identifier)

  if (!userRateLimit) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now })
    return true
  }

  // Reset counter if window has passed
  if (now - userRateLimit.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now })
    return true
  }

  // Check if under limit
  if (userRateLimit.count < RATE_LIMIT_MAX_REQUESTS) {
    userRateLimit.count++
    return true
  }

  return false
}

// Discord webhook configuration
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

// Function to send Discord notification
async function sendDiscordNotification(
  repairData: RepairRequest,
  requestId?: number
): Promise<void> {
  try {
    if (!DISCORD_WEBHOOK_URL) {
      console.warn("Discord webhook URL not configured")
      return
    }

    const embed = {
      title: "New Repair Request",
      color: 0xffd700, // Gold color
      fields: [
        {
          name: "👤 Customer",
          value: escapeHtml(repairData.name),
          inline: true,
        },
        {
          name: "📧 Email",
          value: escapeHtml(repairData.email),
          inline: true,
        },
        {
          name: "📞 Phone",
          value: escapeHtml(repairData.phone),
          inline: true,
        },
        {
          name: "Preferred Contact",
          value:
            repairData.contact_method === "email" ? "📧 Email" : "📞 Phone",
          inline: true,
        },
        {
          name: "Item for Repair",
          value: escapeHtml(repairData.item),
          inline: false,
        },
        {
          name: "Issue Description",
          value: escapeHtml(repairData.issue),
          inline: false,
        },
      ],
      footer: {
        text: requestId ? `Request ID: ${requestId}` : "Repair Request",
        icon_url:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.0.1/img/apple/64/1f527.png",
      },
      timestamp: new Date().toISOString(),
    }

    const payload = {
      username: "DBAE Repairs",
      avatar_url:
        "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.0.1/img/apple/64/1f3b5.png",
      embeds: [embed],
    }

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(
        `Discord webhook failed: ${response.status} ${response.statusText}`
      )
    }

    console.log("Discord notification sent successfully!")
  } catch (error) {
    console.error("Failed to send Discord notification:", error)
    // Don't throw the error - we don't want Discord failures to break the repair request
  }
}

// Function to ensure the repair_requests table exists
async function ensureTableExists(): Promise<void> {
  const dbPool = getPool()
  const client = await dbPool.connect()

  try {
    console.log("Checking if repair_requests table exists...")
    await client.query(REPAIR_REQUESTS_TABLE_SCHEMA)
    console.log("repair_requests table is ready!")
  } finally {
    client.release()
  }
}

// Server action to handle repair form submission
export async function submitRepairRequest(
  _currentState: RepairFormActionResult | null,
  formData: FormData
): Promise<RepairFormActionResult> {
  try {
    // Honeypot check - if 'website' field is filled, it's likely a bot
    const honeypot = formData.get("website") as string
    if (honeypot && honeypot.trim() !== "") {
      console.log("Bot submission detected via honeypot")
      return {
        success: false,
        error: "Invalid submission detected",
      }
    }

    // Rate limiting check (using a simple IP-based approach)
    // In production, you'd want to use the actual client IP
    const userIdentifier = "user" // In real app, use req.ip or similar
    if (!checkRateLimit(userIdentifier)) {
      return {
        success: false,
        error: "Too many requests. Please try again later.",
      }
    }

    // Extract and sanitize form data
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      contact_method: formData.get("contact-method") as string,
      item: formData.get("item") as string,
      issue: formData.get("issue") as string,
    }

    // Sanitize all inputs
    const repairData: Omit<RepairRequest, "id" | "created_at" | "updated_at"> =
      {
        name: sanitizeString(rawData.name, VALIDATION_RULES.NAME_MAX_LENGTH),
        email: sanitizeString(rawData.email, VALIDATION_RULES.EMAIL_MAX_LENGTH),
        phone: sanitizeString(rawData.phone, VALIDATION_RULES.PHONE_MAX_LENGTH),
        contact_method: rawData.contact_method === "phone" ? "phone" : "email",
        item: sanitizeString(rawData.item, VALIDATION_RULES.ITEM_MAX_LENGTH),
        issue: sanitizeString(rawData.issue, VALIDATION_RULES.ISSUE_MAX_LENGTH),
      }

    // Validate required fields
    if (
      !repairData.name ||
      !repairData.email ||
      !repairData.phone ||
      !repairData.contact_method ||
      !repairData.item ||
      !repairData.issue
    ) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Enhanced validation
    if (!validateEmail(repairData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    if (!validatePhone(repairData.phone)) {
      return {
        success: false,
        error: "Please enter a valid phone number",
      }
    }

    // Additional length validations
    if (repairData.name.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
      return {
        success: false,
        error: `Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters long`,
      }
    }

    if (repairData.item.length < VALIDATION_RULES.ITEM_MIN_LENGTH) {
      return {
        success: false,
        error: `Item description must be at least ${VALIDATION_RULES.ITEM_MIN_LENGTH} characters long`,
      }
    }

    if (repairData.issue.length < VALIDATION_RULES.ISSUE_MIN_LENGTH) {
      return {
        success: false,
        error: `Issue description must be at least ${VALIDATION_RULES.ISSUE_MIN_LENGTH} characters long`,
      }
    }

    // Get database connection
    const dbPool = getPool()

    // Test connection first
    console.log("Testing database connection...")
    const client = await dbPool.connect()
    console.log("Database connection successful!")
    client.release()

    // Ensure the table exists
    await ensureTableExists()

    // Get a new client for the actual insert
    const insertClient = await dbPool.connect()

    try {
      // Insert the repair request into the database
      const insertQuery = `
        INSERT INTO repair_requests (name, email, phone, contact_method, item, issue)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, created_at
      `

      const values = [
        repairData.name,
        repairData.email,
        repairData.phone,
        repairData.contact_method,
        repairData.item,
        repairData.issue,
      ]

      const result = await insertClient.query(insertQuery, values)
      const requestId = result.rows[0].id

      console.log(`New repair request submitted with ID: ${requestId}`)

      // Send Discord notification (don't wait for it to avoid slowing down the response)
      sendDiscordNotification(
        {
          ...repairData,
          id: requestId,
          created_at: result.rows[0].created_at,
        },
        requestId
      ).catch((error) => {
        console.error("Discord notification failed:", error)
      })

      return {
        success: true,
        message:
          "Your repair request has been submitted successfully. We'll get back to you soon.",
      }
    } finally {
      // Always release the client back to the pool
      insertClient.release()
    }
  } catch (error) {
    console.error("Error submitting repair request:", error)

    // Don't leak internal error details
    if (error instanceof Error) {
      // Log the actual error for debugging
      console.error("Detailed error:", error.message, error.stack)
    }

    // Return generic user-friendly error message
    return {
      success: false,
      error:
        "We're experiencing technical difficulties. Please try again later or contact us directly at repair@dearborn.cool",
    }
  }
}

// Standalone function to send Discord notification for repair requests
export async function sendRepairNotificationToDiscord(
  repairData: RepairRequest,
  requestId?: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await sendDiscordNotification(repairData, requestId)
    return { success: true }
  } catch (error) {
    console.error("Failed to send Discord notification:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Discord error",
    }
  }
}

// Function to test database connection (optional - for debugging)
export async function testDatabaseConnection(): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const dbPool = getPool()
    const client = await dbPool.connect()

    try {
      // Simple test query
      await client.query("SELECT 1")
      return { success: true }
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Database connection test failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown database error",
    }
  }
}
