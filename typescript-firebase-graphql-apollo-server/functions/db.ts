import admin from "firebase-admin";

const serviceAccount = require("./ressources/serviceAccount.json");

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<Database-name>.firebasedatabase.app/",
});
