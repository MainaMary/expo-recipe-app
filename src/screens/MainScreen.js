import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import MainImage from "../../assets/images/welcome.jpg";
const styles = StyleSheet.create({
  main: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: { color: "white", fontWeight: "bold", fontSize: 20 },
  explore: { color: "white", fontSize: 16 },
  btnWrapper: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  start: {
    color: "white",
    textAlign: "center",
  },
});
export default function MainScreen() {
  const navigation = useNavigation();
  const animation = useRef(null);
  return (
    <ImageBackground source={MainImage} style={styles.main}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to BaoBox Meal app</Text>
        <Text style={styles.explore}>Explore delicious foods</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={styles.btnWrapper}
        >
          <Text style={styles.start}>Click to get started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
