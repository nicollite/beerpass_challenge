/** Representation of a object */
export interface ObjectLike {
  [key: string]: any;
}

/** Reference of an id */
export interface IdRef {
  /** Document id in firestore */
  id: string;
}

/** Url reference */
export interface UrlRef {
  /** Url reference */
  url: string;
}

/** Path reference */
export interface PathRef {
  /** Path reference */
  path: string;
}

/** Reference to a image */
export interface ImgRef extends UrlRef {
  /** Title of the image */
  title: string;
}

/** Selection for one provider to login */
export type ProviderType = "email/password" | "google" | "facebook" | "twitter";
