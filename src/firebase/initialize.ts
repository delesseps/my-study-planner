import "firebase/messaging";
import { notifierService } from "services";
import { firebaseConfig } from "./firebaseConfig";

//let onMessageDump: Function | null;

export async function initializePush() {
  const registration = await navigator.serviceWorker.ready;

  if (registration) {
    const m = await firebaseConfig();

    if (m) {
      const { messaging } = m;

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
    }
  }

  //onMessageEvent();
}

/*export function onMessageEvent() {
  if (!onMessageDump) {
    onMessageDump = messaging.onMessage(payload => {
      notification.info({
        message: "Notification",
        description: payload.data.content
      });
    });
  } else {
    onMessageDump();
    onMessageDump = null;
  }
}*/
