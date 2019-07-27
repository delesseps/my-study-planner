import * as firebase from "firebase/app";
import "firebase/messaging";
import { notification } from "antd";
import { notifierService } from "services";

export function initializePush() {
  const messaging = firebase.messaging();

  messaging.usePublicVapidKey(
    "BNqCTGf6M54sSdm6eZajmV3HkwWq_c8zxnnokjqqaXD4CfWnAEwAPkfEQ6D9jXtOjXzhCG4lXwMaPGF_7rmb9bA"
  );

  messaging
    .requestPermission()
    .then(() => {
      console.log("Have Permission");
      return messaging.getToken();
    })
    .then(token => {
      notifierService(token as string);
    })
    .catch(error => {
      if (error.code === "messaging/permission-blocked") {
        console.log("Please unblock notification request manually");
      } else {
        console.log("Error occurred", error);
      }
    });

  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(refreshedToken => {
        notifierService(refreshedToken as string);
      })
      .catch(err => {
        console.log("Unable to retrieve refreshed token ", err);
      });
  });

  messaging.onMessage(payload => {
    notification.info({
      message: "Notification",
      description: payload.data.content
    });
  });
}
