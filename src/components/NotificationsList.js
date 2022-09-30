import { FlatList, useWindowDimensions } from "react-native";

import notifications from "../../assets/data/notifications";

import NotificationItem from "./NotificationItem";

const NotificationsList = ({ ...flatListProps }) => {
  const { height } = useWindowDimensions();

  return (
    <FlatList
      data={notifications}
      renderItem={({ item, index }) => (
        <NotificationItem data={item} index={index} />
      )}
      {...flatListProps}
    />
  );
};

export default NotificationsList;
