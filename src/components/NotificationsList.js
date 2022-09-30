import { FlatList, useWindowDimensions } from "react-native";

import notifications from "../../assets/data/notifications";

import NotificationItem from "./NotificationItem";
import Animated, {
  useAnimatedScrollHandler,
  withTiming,
} from "react-native-reanimated";

const NotificationsList = ({ footerVisibility, ...flatListProps }) => {
  const { height } = useWindowDimensions();

  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      if (y < 10) {
        // here we should have the footer opened
        footerVisibility.value = withTiming(1);
      } else {
        // close the footer
        footerVisibility.value = withTiming(0);
      }
    },
  });

  return (
    <Animated.FlatList
      data={notifications}
      renderItem={({ item, index }) => (
        <NotificationItem data={item} index={index} />
      )}
      {...flatListProps}
      onScroll={handler}
      scrollEventThrottle={16}
    />
  );
};

export default NotificationsList;
