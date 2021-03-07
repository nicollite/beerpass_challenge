import { ProviderType } from "../commons";

/** Interface to represent the user data in firestore */
export interface User {
  email: string;
  username: string;
  /** Authenticator uid */
  uid: string;
  /** Authenticator provider */
  provider: ProviderType;
}
