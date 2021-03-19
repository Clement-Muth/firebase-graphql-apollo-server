import { firebase } from "../../db";

export const getCats = async (name: string) => {
  console.log(name);
  const snap = await firebase
    .database()
    .ref('cats')
    .once('value');
  const val = snap.val();
  console.log("In the query");
  return Object.keys(val).map((key) => val[key]);
}