import { env } from "@env";
import { HttpError } from "@http-error";
import { Request, Response, NextFunction } from "express";
import { auth } from "firebase-admin";
import { logger } from "firebase-functions";
import { verify } from "jsonwebtoken";

/**
 * Middleware used in restrict routes, checks if the uid from resquest is admin
 * @param req Request object
 * @param res Response object
 * @param next NextFunction caller
 */
export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.headers["authorization"]) next(new HttpError(403, "Forbidden Request"));
  const [scheme, token] = req.headers["authorization"].split(" ");

  if (token === env.test.token) return next();

  if (scheme === "JWT") {
    try {
      verify(token, env.app.secret) as any;
      return next();
    } catch (err) {
      logger.info("JWT invalid token", { err });
      next(new HttpError(403, "Forbiden Request"));
    }
  } else if (scheme === "AuthFire") {
    try {
      await auth().verifyIdToken(token);
      return next();
    } catch (err) {
      logger.info("AuthFire invalid token", { err });
      next(new HttpError(403, "Forbiden Request"));
    }
  }

  next(new HttpError(401, "Invalid authenticatil schema"));
}
