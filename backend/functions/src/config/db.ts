import { firestore } from "firebase-admin";

/** Firestore database */
export const db = firestore();
db.settings({ ignoreUndefinedProperties: true });
