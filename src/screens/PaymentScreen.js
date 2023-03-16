import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { CardField, GooglePayButton, StripeProvider, useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { Button } from "react-native-elements";

const MAIN_URL_IOS = "http://localhost"; // TODO: move to config
const MAIN_URL_ANDROID = "http://10.0.2.2";

export const PaymentScreen = ({route, navigation}) => {

  const {totalAmount} = route.params
  const stripe = useStripe()
  console.log("EEEEstripestripe", stripe);

  const STRIPE_PK = 'pk_test_51LqvmqD5XnzvldR6RsAYpuDt5vy80A1rQgbJ761mfiDNeeBy63ozqjS0GG5nOm5UAv9UKRQ6L83ZAs6H7Mm4gPyO00QfSszQoh'

  const [publishableKey, setPublishableKey] = useState(STRIPE_PK);
  const [card, setCard] = useState({});
  const [clientSecret, setСlientSecret] = useState(null);

  const fetchPaymentIntentClientSecret = async () => {
    axios.post(`${MAIN_URL_ANDROID}/pay`, {
      amount: totalAmount,
      currency: 'usd',
      payment_method: ['card']
    })
      .then(res => {
        const data = res.data;
        console.log("WWWdataWWWdata", data);
        setСlientSecret(data.clientSecret)
      }).catch(err => {
        Alert.alert(err)
    })
  }
  const makePayment = () => {
    fetchPaymentIntentClientSecret()
  }
  const goBack = () => {
    console.log('SSnavigation', navigation)
    navigation.goBack()
  }


  return (
    <StripeProvider
      publishableKey={publishableKey}
      // merchantIdentifier="merchant.identifier" // required for Apple Pay
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <View style={{
        marginTop: 100,
        backgroundColor: "#2b304c",
        height: 250,
        justifyContent: "center",
        borderRadius: 12,
      }}>
        <CardField
          postalCodeEnabled={false}
          onCardChange={(cardDetails) => {
            console.log("card details", cardDetails);
            setCard(cardDetails);
          }}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{ height: 50, borderColor: "red", borderWidth: 2 }}
        />
      </View>
      <Button
        onPress={makePayment}
        title={`Оплатить ${totalAmount} USD`}
        buttonStyle={styles.payButton}
        titleStyle={styles.titlePay}
      />
      <Button
        onPress={goBack}
        title={'Back'}
        buttonStyle={styles.payButton}
        // titleStyle={styles.titlePay}
      />
    </StripeProvider>
  );
};
const styles = StyleSheet.create({
  payButton: {
    borderRadius: 20,
    backgroundColor: '#23253d',
    // backgroundColor: '#c45555',
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignSelf: 'center'
  },
  titlePay: {

  },

});

