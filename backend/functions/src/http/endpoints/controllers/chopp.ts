import { NextFunction, Request, Response, Router } from "express";
import { Chopp } from "shared";
import { addUpdateChoppInDb, deleteChoppInDb, getChoppsInDb } from "@services/choppService";
import { HttpError } from "@http-error";
import { logger } from "firebase-functions";

export const choppRouter = Router();

// Routes
choppRouter.post("", creteOrUpdateChopp);
choppRouter.put("", creteOrUpdateChopp);
choppRouter.get("", getChoppsInFirestore);
choppRouter.delete("", removeChopps);

// Functions

/**
 * Create chopps docs in firestore
 * @path /chopp
 * @method POST
 * @method PUT
 * @body Chopp | Chopp[]
 * @response void
 */
async function creteOrUpdateChopp(req: Request, res: Response, next: NextFunction) {
  const chopps: Chopp | Chopp[] = req.body;

  try {
    await addUpdateChoppInDb(chopps);
    logger.info("chopps added", { chopps });
    return res.end(chopps);
  } catch (err) {
    next(err);
  }
}

/**
 * Get one or more chopps
 * @path /chopp
 * @qs The query string:
 *  - id: The chopp id
 * @method GET
 * @response Chopp or Chopp[]
 */
async function getChoppsInFirestore(req: Request, res: Response, next: NextFunction) {
  const { id } = req.query;

  try {
    const chopps = await getChoppsInDb(id as string);
    return res.send(chopps);
  } catch (err) {
    next(err);
  }
}

/**
 * Delete the chopps
 * @path /chopp
 * @qs The query string:
 *  - id: The chopp id
 * @method DELETE
 * @response void
 */
async function removeChopps(req: Request, res: Response, next: NextFunction) {
  const { id } = req.query;

  if (!id) next(new HttpError(400, "No chopp id in query string"));

  try {
    const chopps = await deleteChoppInDb(id as string);
    return res.send(chopps);
  } catch (err) {
    next(err);
  }
}
