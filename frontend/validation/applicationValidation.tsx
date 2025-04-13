import z from 'zod'

const applicationSchema = z.object({
  id: z.number().int().positive().optional(),

  name: z.string().min(4, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.number().min(10, { message: "Phone number is required" }),

  message: z.string().min(10, { message: "Message is required" }),
  experience: z.number().min(0, { message: "Experience is required" }),
  resume: z.string().min(4, { message: "Resume is required" }),

  coverLetter: z.string().min(4, { message: "Cover letter is required" }).optional(),

  previousStipend: z.number().min(0, { message: "Previous stipend is required" }),
  previousCompany: z.string().min(4, { message: "Previous company is required" }),

  skill: z.array(z.string()).min(1, { message: "At least one skill is required" }),

  workHistory: z.array(z.object({
    company: z.string().min(4, { message: "Company name is required" }),
    designation: z.string().min(4, { message: "Designation is required" }),
    startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
      message: "Invalid start date",
    }),
    endDate: z.string().refine(val => !isNaN(Date.parse(val)), {
      message: "Invalid end date",
    }),
    description: z.string().min(10, { message: "Description is required" })
  })).optional(),

  status: z.enum(["applied", "interview", "offered", "rejected"]).optional(),

  jobId: z.number().int().positive(),
  userId: z.number().int().positive().optional(),
}).strict();

export default applicationSchema;
