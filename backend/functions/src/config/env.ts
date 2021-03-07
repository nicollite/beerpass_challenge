import { config } from "firebase-functions";

/** Object representing config on process.env */
export interface Env {
  app: {
    node_env: "dev" | "prod";
    log_name: string;
    firebase_config: string;
    secret: string;
  };
  test: {
    token: string;
  };
  firebase_config: { databaseURL: string; storageBucket: string; projectId: string };
}

/** Environment object */
export let env: Env = Object.assign({}, config()) as any;
env = { ...env, firebase_config: JSON.parse(process.env.FIREBASE_CONFIG) };
