import { z } from "zod";

export const createCollectionValidation = z.object({
  user_id: z.string({ required_error: "user_id is required" }),
  book_id: z.string({ required_error: "book_id is required" }),
});
