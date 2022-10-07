import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import bg from "./assets/images/bg.jpeg";
import SensorAnimatedImage from "./src/components/SensorAnimatedImage";

const App = () => {
  return (
    <View style={styles.container}>
      <SensorAnimatedImage image={bg} />

      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
