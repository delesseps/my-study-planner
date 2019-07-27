importScripts("https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.0/firebase-messaging.js");

let config = {
  messagingSenderId: "809991180528",
  appId: "1:809991180528:web:b83e8db5acb3edde"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      let notificationTitle = "My Study Planner";
      let notificationOptions = {
        body: payload.data.content,
        icon: "/favicon.ico"
      };

      return self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
  return promiseChain;
});

self.addEventListener("notificationclick", function(event) {
  // do what you want
  // ...
});
