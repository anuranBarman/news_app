import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import FeedScreen from "./src/screens/FeedScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SourceScreen from "./src/screens/SourceScreen";
import { Provider as SourceProvider } from "./src/context/SourceContext";
import { Provider as FeedProvider } from "./src/context/FeedContext";
import { Provider as SourceNewsProvider } from "./src/context/SourceNewsContext";
import { Entypo } from "@expo/vector-icons";
import SourceNewsScreen from "./src/screens/SourceNewsScreen";

const feedFlow = createStackNavigator({
  Feed: FeedScreen,
});
feedFlow.navigationOptions = {
  title: "Feed",
  tabBarIcon: <Entypo name="news" size={24} color="black" />,
};

const sourceFlow = createStackNavigator({
  Source: SourceScreen,
  SourceNews: SourceNewsScreen,
});
sourceFlow.navigationOptions = {
  title: "Sources",
  tabBarIcon: <Entypo name="list" size={24} color="black" />,
};

const tabNavigator = createBottomTabNavigator({
  feedFlow,
  sourceFlow,
});

const App = createAppContainer(tabNavigator);

export default () => {
  return (
    <FeedProvider>
      <SourceProvider>
        <SourceNewsProvider>
          <App />
        </SourceNewsProvider>
      </SourceProvider>
    </FeedProvider>
  );
};
