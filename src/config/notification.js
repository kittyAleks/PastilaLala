import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import {get_notific_token, save_notific_token} from "./storage";
import { getBackgroundColor } from "react-native/Libraries/LogBox/UI/LogBoxStyle";

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

// get device token and save asyncstorage
const getTokenNotification = async () => {
  const token_notification = await get_notific_token()
  console.log("QQQtoken_notification", token_notification);

  if (!token_notification) {
    const token = await messaging().getToken()
      // .then()
    save_notific_token(token)
  }
};

export const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: "channel_id_test", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    },
  );
}

const getPushData = (message) => {
  console.log('getPushData_message', message)
  PushNotification.localNotification({
    channelId: message.messageId,
    message: message.notification.body,
    title: message.notification.title,
    largeIcon: "ic_notification_round",
    smallIcon: "ic_notification"

  })
};
const getBackgroundPushData = (background_message) => {
  PushNotification.localNotification({
    channelId: background_message.messageId,
    message: background_message.notification.body,
    title: background_message.notification.title,
    largeIcon: "ic_notification_round",
    smallIcon: "ic_notification"
  })
}


export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging().setBackgroundMessageHandler(getBackgroundPushData);
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
