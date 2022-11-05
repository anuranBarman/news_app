import React from "react";
import { Card, Button, Text } from "react-native-elements";
import { Linking, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const SourceItem = ({ source, navigation }) => {
  return (
    <Card>
      <Card.Title>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(source.url).catch((err) => {
              console.log(err);
            });
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
              }}
            >
              {source.name}
            </Text>
            <Entypo
              name="link"
              size={20}
              color="black"
              style={{ marginLeft: 5 }}
            />
          </View>
        </TouchableOpacity>
      </Card.Title>
      <Card.Divider />
      <Text>{source.description}</Text>
      <Button
        title="View Top Headlines"
        style={{ marginTop: 10 }}
        onPress={() => {
          navigation.navigate("SourceNews", {
            id: source.id,
            title: source.name,
          });
        }}
      />
    </Card>
  );
};

export default SourceItem;
