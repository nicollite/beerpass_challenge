import { config } from "firebase-functions";

/** Object representing config on process.env */
export interface Env {
  app: {
    node_env: "dev" | "prod";
    log_name: string;
  };
  databaseURL: string;
  storageBucket: string;
  projectId: string;
}

/** Environment object */
export let env: Env = Object.assign({}, config()) as any;
env = { ...env, ...JSON.parse(process.env.FIREBASE_CONFIG) };
