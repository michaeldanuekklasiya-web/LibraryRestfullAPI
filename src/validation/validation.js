import { ZodError } from "zod";
import ResponseError from "../utils/response.error.js";

export const validate = (schema, request) => {
  try {
    return schema.parse(request);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
      throw ResponseError.badRequest(message);
    }

    throw error;
  }
};