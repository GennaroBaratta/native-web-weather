import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native-web";

function SearchInput({ placeholder, onSubmit }) {
  const [text, setText] = useState("");

  const handleChangeText = (newLocation) => {
    setText(newLocation);
  };

  const handleSumbitEditing = () => {
    if (!text) return;

    onSubmit(text);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSumbitEditing}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: "#adadad",
    marginHorizontal: 40,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: "white",
  },
});

export default SearchInput;
