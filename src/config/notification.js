import messaging from "@react-native-firebase/messaging";
import {get_notific_token, save_notific_token} from "./storage";

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization_status:', authStatus);
    getTokenNotification()
  }
}

const getTokenNotification = async () => {
  const token_notification = await get_notific_token()
  console.log("QQQtoken_notification", token_notification);

  if (!token_notification) {
    const token = await messaging().getToken();
    save_notific_token(token)
  }
};

const getPushData = (message) => {
  console.log("QQQmessage", message);
};


export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(remoteMessage => {
    console.log('QQQremoteMessage', remoteMessage)
  });
  // messaging().onMessage(getPushData);

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
}
