const { z } = require('zod');

// Validation schema for user registration and login
// This schema validates the data structure and types for user information

const userSchema = z.object({
  id: z.number().int().positive().optional(),
  clerkId: z.string().min(1, { message: 'Clerk ID is required' }).trim(),
  email: z.string().email({ message: 'Invalid email format' }),
  name: z.string().min(2, { message: 'Name should be at least 2 characters long' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(255).optional(),
  profilePic: z.string().url({ message: 'Invalid profile picture URL' }).optional(),
  provider: z.enum(['manual', 'google', 'github'], { message: 'Invalid provider type' }).default('manual'),
  role: z.enum(['jobseeker', 'employer', 'admin'], { message: 'Invalid user role' }).default('jobseeker'),
  token: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  Job: z.array(z.any()).optional(),
});

module.exports = userSchema;
