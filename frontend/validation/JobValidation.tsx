import {z}  from 'zod'

const jobSchema = z.object({
  id: z.number().int().positive().optional(),
  title: z
    .string({ required_error: "Title is required" })
    .min(5, { message: "Title should be at least 5 characters long" })
    .max(50, { message: "Title should be at most 50 characters long" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(30, { message: "Description should be at least 30 characters long" }),
    companyImg: z.preprocess(
      (val) => (val instanceof File ? URL.createObjectURL(val) : val),
      z.string().url({ message: "Invalid company image URL" }).optional()
    ),
    
    stipend: z.preprocess((val) => Number(val), z.number().positive()),
    location: z
    .string({ required_error: "Location is required" })
    .min(5, { message: "Location should be at least 5 characters long" })
    .max(50, { message: "Location should be at most 50 characters long" }),
  jobType: z
    .string({ required_error: "Job type is required" })
    .min(5, { message: "Job type should be at least 5 characters long" })
    .max(20, { message: "Job type should be at most 20 characters long" }),
  contact: z
    .string({ required_error: "Contact information is required" })
    .min(5, { message: "Contact should be at least 5 characters long" })
    .max(30, { message: "Contact should be at most 30 characters long" }),
  companyName: z
    .string({ required_error: "Company name is required" })
    .min(10, { message: "Company name should be at least 10 characters long" })
    .max(50, { message: "Company name should be at most 50 characters long" }),
  url: z.string().url({ message: "Invalid company URL" }).optional(),
  createdAt: z.string().optional(),  
  updatedAt: z.string().optional(), 
});

export default jobSchema;
