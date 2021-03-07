import { HttpError } from "@http-error";
import { NextFunction, Request, Response, Router } from "express";
import firebase from "firebase";
import { sign } from "jsonwebtoken";
import "firebase/auth";
import { env } from "@env";

export const authRoute = Router();

authRoute.post("", getJWT);

/**
 * Create chopps docs in firestore
 * @path /auth
 * @method POST
 * @body AuthRequest
 * @response { jwt: string }
 */
export async function getJWT(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) next(new HttpError(400, "Body is missing email or password"));

  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    const jwt = sign({ uid: user.user }, env.app.secret, {
      expiresIn: 3600, // expires in 1 hour
    });
    return res.send({ jwt });
  } catch (err) {
    if (err.code) next(new HttpError(401, "Invalid Login", { info: err }));
    next(err);
  }
}
