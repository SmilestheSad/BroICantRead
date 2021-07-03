import firebase from "firebase/app";
export const saveMessageToFirestore = async (user, { text, time }) => {
  const db = firebase.firestore();
  const data = {
    user: user.uid,
    message: text,
    time,
  };
  const messageCollection = db.collection("messages");
  console.log("stuck here");
  console.log(text);
  console.log(time);
  console.log(user.uid);
  try {
    await messageCollection.add(data);
  } catch (err) {
    console.log(err);
  }
  console.log("done");
};
