import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { TextInput } from "react-native";

const SearchComponent = ({ onSubmit, onClear }) => {
  const [value, setValue] = useState("");

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={{
          flex: 1,
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 10,
          height: 40,
          marginHorizontal: 15,
          marginVertical: 20,
          padding: 10,
        }}
        placeholder="Search Topic"
        value={value}
        onChangeText={(value) => setValue(value)}
      />
      <Button
        title="Search"
        style={{ marginRight: 15, marginTop: 20 }}
        onPress={() => onSubmit(value)}
      />
      {value != "" ? (
        <Button
          title="Clear"
          style={{ marginRight: 15, marginTop: 20 }}
          onPress={() => {
            setValue("");
            onClear();
          }}
        />
      ) : null}
    </View>
  );
};

export default SearchComponent;
