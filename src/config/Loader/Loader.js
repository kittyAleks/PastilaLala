import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

export const Loader = ({loader}) => {
  return (
    <AnimatedLoader
      visible={loader}
      overlayColor={"rgba(255,255,255,0.75)"}
      animationStyle={styles.size}
      speed={1}
      source={require("./json/animation.json")}
    />
  );
};
const styles = StyleSheet.create({
  size: {
    width: 400,
    height: 400,
  },
});
