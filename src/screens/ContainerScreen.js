import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

export const ContainerScreen = () => {
  return (
    <SafeAreaView
      style={styles.container}>
      {/*<StatusBar barStyle={'dark-content'} translucent backgroundColor={'transparent'} />*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
  },
});
