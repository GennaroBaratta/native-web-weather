import { StyleSheet, Text, View } from "react-native";

export default function Alternate() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Step One</Text>
      <Text>Edit App.js to change this screen and turn it into your app.</Text>
      <Text style={styles.text}>See Your Changes</Text>
      <Text>Press Cmd + R inside the simulator to reload your app’s code.</Text>
      <Text style={styles.text}>Debug</Text>
      <Text>
        Press Cmd + M or Shake your device to open the React Native Debug Menu.
      </Text>
      <Text style={styles.text}>Learn</Text>
      <Text>Read the docs to discover what to do next:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  text: {
    alignItems: "center",
    fontSize: 24,
    marginBottom: 24,
  },
  link: {
    color: "blue",
  },
});
