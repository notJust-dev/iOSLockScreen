import { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  useWindowDimensions,
  Image,
} from "react-native";
import wallpaper from "../../assets/images/wallpaper.webp";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import NotificationsList from "../components/NotificationsList";
import SwipeUpToOpen from "../components/SwipeUpToOpen";
import home2 from "../../assets/images/home2.jpg";

import { PanGestureHandler } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

import Animated, {
  SlideInDown,
  SlideInUp,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
  useAnimatedProps,
} from "react-native-reanimated";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function App() {
  const [date, setDate] = useState(dayjs());
  const { height } = useWindowDimensions();
  const y = useSharedValue(height);

  const footerVisibility = useSharedValue(1);
  const footerHeight = useDerivedValue(() =>
    interpolate(footerVisibility.value, [0, 1], [0, 85])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const animatedFooterStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(footerVisibility.value, [0, 1], [-85, 0]),
    opacity: footerVisibility.value,
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(y.value - height, {
          duration: 100,
          easing: Easing.linear,
        }),
      },
    ],
  }));

  const unlockGestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      y.value = event.absoluteY;
    },
    onEnd: (event) => {
      if (event.velocityY < -500) {
        // unlock
        y.value = withTiming(0, { easing: Easing.linear });
      } else if (event.velocityY > 500) {
        // reset
        y.value = withTiming(height, { easing: Easing.linear });
      } else if (y.value < height / 2 || event.velocityY < -500) {
        // unlock
        y.value = withTiming(0, { easing: Easing.linear });
      } else {
        // reset
        y.value = withTiming(height, { easing: Easing.linear });
      }
    },
  });

  const homeScreenBlur = useAnimatedProps(() => ({
    intensity: interpolate(y.value, [0, height], [0, 100]),
  }));

  const lockScreenBlur = useAnimatedProps(() => ({
    intensity: interpolate(y.value, [0, height], [100, 0]),
  }));

  const Header = useMemo(
    () => (
      <Animated.View entering={SlideInUp} style={styles.header}>
        <Ionicons name="ios-lock-closed" size={20} color="white" />
        <Text style={styles.date}>{date.format("dddd, DD MMMM")}</Text>
        <Text style={styles.time}>{date.format("hh:mm")}</Text>
      </Animated.View>
    ),
    [date]
  );

  return (
    <>
      {/* Home Screen */}
      <ImageBackground
        source={home2}
        style={{ width: "100%", height: "100%", ...StyleSheet.absoluteFill }}
      ></ImageBackground>
      {/* Lock Screen */}
      <AnimatedBlurView
        animatedProps={homeScreenBlur}
        style={{ width: "100%", height: "100%", ...StyleSheet.absoluteFill }}
      />
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <ImageBackground source={wallpaper} style={styles.container}>
          <AnimatedBlurView
            animatedProps={lockScreenBlur}
            style={{
              width: "100%",
              height: "100%",
              ...StyleSheet.absoluteFill,
            }}
          />
          {/* Notification List */}
          <NotificationsList
            footerVisibility={footerVisibility}
            footerHeight={footerHeight}
            ListHeaderComponent={Header}
          />

          <Animated.View
            entering={SlideInDown}
            style={[styles.footer, animatedFooterStyle]}
          >
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="flashlight"
                size={24}
                color="white"
              />
            </View>

            <SwipeUpToOpen />

            <View style={styles.icon}>
              <Ionicons name="ios-camera" size={24} color="white" />
            </View>
          </Animated.View>

          <PanGestureHandler onGestureEvent={unlockGestureHandler}>
            <Animated.View style={styles.panGestureContainerUnlock} />
          </PanGestureHandler>
        </ImageBackground>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
  },
  date: {
    color: "#C3FFFE",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 20,
  },
  time: {
    fontSize: 82,
    fontWeight: "bold",
    color: "#C3FFFE",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 75,
  },
  icon: {
    backgroundColor: "#00000050",
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  panGestureContainerUnlock: {
    position: "absolute",
    width: "100%",
    height: 200,
    bottom: 0,
    left: 0,
    transform: [
      {
        translateY: 100,
      },
    ],
  },
});
