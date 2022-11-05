import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native";
import SourceItem from "../components/SourceItem";
import { Context as SourceContext } from "../context/SourceContext";
import { Entypo } from "@expo/vector-icons";

const SourceScreen = ({ navigation }) => {
  const { state, fetchSources } = useContext(SourceContext);

  useEffect(() => {
    fetchSources();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={state.sources}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <SourceItem source={item} navigation={navigation} />;
          }}
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

SourceScreen.navigationOptions = {
  headerTitle: "TechShots",
};

export default SourceScreen;
