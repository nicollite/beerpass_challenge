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
}

/** Environment object */
export let env: Env = Object.assign({}, config()) as any;
env.app.firebase_config =
  typeof env.app.firebase_config === "string"
    ? JSON.parse(env.app.firebase_config)
    : env.app.firebase_config;
