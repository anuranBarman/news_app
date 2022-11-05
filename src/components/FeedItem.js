import React from "react";
import { Card, Button, Text, Image } from "react-native-elements";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const FeedItem = ({ source, navigation }) => {
  return (
    <Card>
      <Image
        source={{ uri: source.urlToImage }}
        style={{ width: "100%", height: 200 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Card.Title style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {source.title}
          </Text>
        </View>
      </Card.Title>
      <Card.Divider />
      <Text>{source.description}</Text>
      <Button
        title="Read Article"
        style={{ marginTop: 10 }}
        onPress={() => {
          Linking.openURL(source.url).catch((err) => {
            console.log(err);
          });
        }}
      />
    </Card>
  );
};

export default FeedItem;
