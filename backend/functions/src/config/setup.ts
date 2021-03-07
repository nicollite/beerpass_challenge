import admin from "firebase-admin";
import firebase from "firebase";
import { install } from "source-map-support";
import { env } from "@env";

// Use source map support
install();

// Initialize app in firebase-admin and firebase
admin.initializeApp();
firebase.initializeApp(env.firebase_config);
