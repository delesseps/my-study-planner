import * as firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  messagingSenderId: "809991180528",
  appId: "1:809991180528:web:b83e8db5acb3edde"
};

const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
  "BNqCTGf6M54sSdm6eZajmV3HkwWq_c8zxnnokjqqaXD4CfWnAEwAPkfEQ6D9jXtOjXzhCG4lXwMaPGF_7rmb9bA"
);

export { messaging };
