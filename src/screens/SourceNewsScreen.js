import React, { useContext, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import FeedItem from "../components/FeedItem";
import { Context as SourceNewsContext } from "../context/SourceNewsContext";
import { Entypo } from "@expo/vector-icons";

const SourceNewsScreen = ({ navigation }) => {
  const { state, fetchFeed, loadMoreFeed } = useContext(SourceNewsContext);
  let totalLoaded = state.articles.length;
  let sourceName = navigation.getParam("id");
  let title = navigation.getParam("title");

  useEffect(() => {
    fetchFeed(sourceName);
  }, [sourceName]);

  const loadMore = () => {
    console.log(state.totalResults);
    console.log(totalLoaded);
    if (state.totalResults > totalLoaded) {
      loadMoreFeed(state.page, sourceName);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={state.articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => {
            return <FeedItem source={item} />;
          }}
          onEndReached={loadMore}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
});

SourceNewsScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("title", "TechShots"),
  headerLeft: () => null,
});

export default SourceNewsScreen;
