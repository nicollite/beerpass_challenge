import { ProviderType } from "../commons";

/** Interface to represent the user data in firestore */
export interface User {
  /** User email */
  email: string;
  /** Authenticator uid */
  uid: string;
  provider: ProviderType;
}
