import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";


const PresPage = ({ navigation }) => {
  const handleSignUp = () => {
    navigation.navigate("SignUpPage");
  };
  const handleLogIn = () => {
    navigation.navigate("LoginPage");
  };
  return (
    <View style={styles.content}>
      <Text style={styles.text}>Welcome to Todo List!</Text>
      <View style={styles.container}>
        <Text style={styles.already}>Already an account?</Text>
        <View style={styles.button}>
          <Button size="md" onPress={handleSignUp} bg="tertiary.700">
            SignUp
          </Button>
        </View>
        <View style={styles.button}>
          <Button size="md" onPress={handleLogIn} bg="tertiary.500">
            Log in
          </Button>
        </View>
        <Text style={styles.terms}>
          Terms and conditions <Text style={styles.coloredLink}> Click! </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 200,
    marginBottom: "auto",
  },
  container: {
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    margin: 0,
    marginTop: 180,
  },
  text: {
    fontSize: 54,
  },
  already: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  coloredLink: {
    color: "#047857",
  },
  terms: {
    marginTop: 60,
    textAlign: "center",
  },
});

export default PresPage;
