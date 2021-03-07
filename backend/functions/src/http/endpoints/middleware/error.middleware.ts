import { NextFunction, Request, Response } from "express";
import { HttpError } from "src/http/endpoints/exceptions/http-error";
import { logger } from "@logger";

/**
 * Middleware used to respond errors to requests
 * @param error
 * @param request
 * @param response
 * @param next
 */
export function errorMiddleware(
  error: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Log the error
  const errorMsg = error.stack || error.message;
  logger.error(errorMsg, { error });

  const httpError = error instanceof HttpError ? error : HttpError.fromError(error, 500);

  res.status(httpError.status).json(httpError.serializeJson());
}
