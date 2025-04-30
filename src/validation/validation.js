import { ZodError } from "zod";
import ResponseError from "../utils/response.error.js";

const validate = (schema, request) => {
  try {
    return schema.parse(request);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors.map(e => e.message).join(", ");
      throw new ResponseError(400, message);
    }
    throw error;
  }
};

export { validate };