import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import bg from "./assets/images/bg.jpeg";
import SensorAnimatedImage from "./src/components/SensorAnimatedImage";
import Parallax from "./src/components/Parallax";
import LockScreen from "./src/screens/LockScreen";

import layer1 from "./assets/images/Parallax/2.png";
import layer2 from "./assets/images/Parallax/3.png";
import layer3 from "./assets/images/Parallax/4.png";
import layer4 from "./assets/images/Parallax/5.png";

const App = () => {
  return (
    <View style={styles.container}>
      {/* <Parallax layers={[layer1, layer2, layer3, layer4]} /> */}
      <LockScreen />

      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
