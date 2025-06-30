import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../serviceaccontkey.json";
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: process.env.DATABASE_URL,
});

export const db = admin.database();
