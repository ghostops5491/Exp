import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from 'react-native-push-notification'
// import Actions from 'App/Redux/Actions'
// import store from 'App/Redux';

export default class PushService {
  constructor(registerCallback, notificationCallback) {
    this.registerCallback = registerCallback
    this.notificationCallback = notificationCallback
  }

  configure() {
    console.log('Configuring pushService');
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: (device) => {
          this.registerCallback && this.registerCallback(device)
        },
        // (required) Called when a remote or local notification is opened or received
        onNotification: (notification) => {
            // console.log( 'NOTIFICATION:', notification );
            this.notificationCallback && this.notificationCallback(notification)
            // TODO
            // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "YOUR GCM SENDER ID",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });
  }
}
