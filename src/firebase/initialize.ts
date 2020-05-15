import 'firebase/messaging'
import {firebaseConfig} from './firebaseConfig'
import {AxiosRequestConfig} from 'axios'
import {agent} from 'utils'

//let onMessageDump: Function | null;

function addToken(registrationToken: string) {
  const options: AxiosRequestConfig = {
    url: '/notifier/add-token',
    method: 'post',
    data: {
      registrationToken,
    },
  }

  return agent.request(options)
}

export async function initializePush() {
  const registration = await navigator.serviceWorker?.ready

  if (registration) {
    const m = await firebaseConfig()

    if (m) {
      const {messaging} = m

      messaging
        .requestPermission()
        .then(() => {
          console.log('Have Permission')
          return messaging.getToken()
        })
        .then(token => {
          addToken(token as string)
        })
        .catch(error => {
          if (error.code === 'messaging/permission-blocked') {
            console.log('Please unblock notification request manually')
          } else {
            console.log('Error occurred', error)
          }
        })

      messaging.onTokenRefresh(() => {
        messaging
          .getToken()
          .then(refreshedToken => {
            addToken(refreshedToken as string)
          })
          .catch(err => {
            console.log('Unable to retrieve refreshed token ', err)
          })
      })
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
