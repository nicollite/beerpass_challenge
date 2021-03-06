/**
 * Interfaces for common errors
 */

/** Object representing firebase auth erros */
export interface AuthFirebaseError extends Error {
  /** The code of the error that aways start with `auth/` */
  code: string;
  /** Message describing the error */
  message: string;
}

/** Errors throwed by firestore */
export interface FirestoreError extends Error {
  /** grpc error code */
  code: number;
  details: string;
  metadata: any;
  note: string;
}

/** Interface to show errors */
export interface HttpApiError<T = any> {
  /** Status for the error */
  status: number;
  /** Status for the error */
  message: string;
  /** The sub code for this error */
  subcode?: number;
  /** Aditional data for the error to be used for error handling */
  info?: T;
}

/** Object with a error code */
export interface CodeError {
  /** A error code */
  code: string;
}
