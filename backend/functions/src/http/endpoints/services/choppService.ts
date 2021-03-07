import { db } from "@firestore";
import { HttpError } from "@http-error";
import { autoId } from "@nicollite/utils";
import { Chopp } from "shared";

export const choppCollection = db.collection("choops");

/**
 * Add a the chop doc, if don't exists create a new doc
 * @param chopps A Chopp object or array
 */
export async function addUpdateChoppInDb(chopps: Chopp | Chopp[]): Promise<void> {
  const addChopp = async (chopp: Chopp) => {
    chopp.id = chopp.id ? chopp.id : autoId();
    await choppCollection.doc(chopp.id).set(chopp, { merge: true });
  };

  if (Array.isArray(chopps)) {
    const choppsPromises = chopps.map(addChopp);
    await Promise.all(choppsPromises);
  } else {
    await addChopp(chopps);
  }
}

/**
 * Get a chopp with the passed id
 * @param id The chopp id
 */
export async function getChoppsInDb(id: string): Promise<Chopp>;
/** Get all chopps */
export async function getChoppsInDb(): Promise<Chopp[]>;
export async function getChoppsInDb(id?: string) {
  if (id)
    return choppCollection
      .doc(id)
      .get()
      .then(docSnap => {
        if (!docSnap.exists) throw new HttpError(404, `chopp with id ${id} not found`);
        return docSnap.data();
      });

  return choppCollection.get().then(querySnap => querySnap.docs.map(docSnap => docSnap.data()));
}

/**
 * Removes the chopp with the given id
 * @param id The chopp id
 */
export async function deleteChoppInDb(id: string): Promise<void> {
  return choppCollection.doc(id).delete().then();
}
