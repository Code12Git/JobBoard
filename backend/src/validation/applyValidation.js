const z = require("zod");

const applySchema = z.object({
  id: z.number().int().positive().optional(),

  name: z.string().min(4, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.coerce.number().optional(),


  message: z.string().min(10, { message: "Message is required" }),
  experience: z.coerce.number().optional(),
coverLetter:z
.any()
.optional()
.refine(
  (files) => !files || files.length === 0 || files.length >= 1,
  "Cover Letter is required"
)
.refine(
  (files) =>
    !files || files.length === 0 || files[0]?.size <= 5_000_000,
  "File size should be less than 5MB"
)
.refine(
  (files) =>
    !files ||
    files.length === 0 ||
    ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
      files[0]?.type
    ),
  "Only .pdf, .doc, and .docx formats are supported"
),


previousStipend: z.coerce.number().optional(),

  previousCompany: z.string().min(4, { message: "Previous company is required" }),

  skills: z.string().min(4, { message: "Skills are required" }),
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

  jobId: z.coerce.number(),

  userId: z.number().int().positive().optional(),
}).strict();

module.exports = applySchema;
