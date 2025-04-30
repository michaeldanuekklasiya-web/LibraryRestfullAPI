import { z } from "zod";

const bookValidation = z.object({
  title: z.string().max(255),
  author: z.string().max(255),
  date: z.coerce.date(), // jika date input dari string
  category: z.string().max(100),
  image: z.string().max(255).optional(),
  description: z.string().optional(),
  publisher: z.string().max(255).optional(),
  year_published: z.number().int().min(1000).max(new Date().getFullYear()),
  page_count: z.number().int().min(1),
  format: z.string().max(100),
  doi: z.string().max(100).optional(),
});

const updateBookValidation = bookValidation.partial().refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided to update",
});

export { bookValidation, updateBookValidation };