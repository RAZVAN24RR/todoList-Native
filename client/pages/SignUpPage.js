import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { axiosInstanceToApi } from "../utils/networking.util";
import { HttpStatusCode } from "axios";
import { Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

const SignUpPage = ({ navigation }) => {
  const [name, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await axiosInstanceToApi
        .post("/users/createUser", {
          name,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            navigation.navigate("LoginPage");
          } else {
            console.log(res);
            navigation.navigate("HomePage");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleBack = () => {
    console.log("back");
    navigation.navigate("PresPage");
  };
  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.touch} onPress={handleBack}>
          <Icon
            name="arrow-left"
            size={30}
            color="#047857"
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.textTitle}>Sign Up Screen</Text>
      </View>
      <Text style={styles.reg}> - - Register to our application -</Text>
      <TextInput
        placeholder="Nume utilizator"
        value={name}
        onChangeText={setUserName}
        style={styles.input}
      />
      <TextInput
        placeholder="Parola"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button
        style={styles.btn}
        size="md"
        onPress={handleSignUp}
        bg="tertiary.700"
      >
        SignUp
      </Button>
      <Text style={styles.terms}>
        Terms and conditions <Text style={styles.coloredLink}> Click! </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
  },
  header: {
    marginTop: 200,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 100,
  },
  textTitle: {
    width: "auto",
    fontSize: 30,
  },
  touch: {
    width: 50,
  },
  input: {
    padding: 8,
    borderColor: "#047857",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  reg: {
    textAlign: "right",
  },
  btn: {
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

export default SignUpPage;
