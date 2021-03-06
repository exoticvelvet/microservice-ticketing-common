import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  readonly statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((e) => {
      return { message: e.msg, field: e.param };
    });
  }
}
