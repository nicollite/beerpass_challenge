import admin from "firebase-admin";
import firebase from "firebase";
import { install } from "source-map-support";
import { env } from "@env";

// Use source map support
if (env.app.node_env === "prod") install();

// Initialize app in firebase-admin and firebase
admin.initializeApp();
firebase.initializeApp(env.app.firebase_config);
