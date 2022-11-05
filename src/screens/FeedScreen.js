import React, { useContext, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import FeedItem from "../components/FeedItem";
import { Context as FeedContext } from "../context/FeedContext";
import { FontAwesome } from "@expo/vector-icons";
import SearchComponent from "../components/SearchComponent";

const FeedScreen = () => {
  const { state, fetchFeed, setQuery, loadMoreFeed } = useContext(FeedContext);
  let totalLoaded = state.articles.length;

  useEffect(() => {
    fetchFeed(state.q);
  }, [state.q]);

  const loadMore = () => {
    console.log(state.totalResults);
    console.log(totalLoaded);
    if (state.totalResults > totalLoaded) {
      loadMoreFeed(state.q, state.page);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchComponent
          onSubmit={(value) => {
            console.log("Value ", value);
            setQuery(value);
            //fetchFeed(state.q);
          }}
          onClear={() => {
            setQuery("");
          }}
        />
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
    marginBottom: 90,
  },
});

FeedScreen.navigationOptions = {
  headerTitle: "TechShots",
  headerRight: () => {
    return null;
  },
};

export default FeedScreen;
