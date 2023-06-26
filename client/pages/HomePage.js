import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ScrollView,
} from "react-native";
import Task from "../components/Task";
import { Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeTokenFromStorage } from "../hooks/useAsyncStorage";
import jwtDecode from "jwt-decode";
import { axiosInstanceToApi } from "../utils/networking.util";

export default function HomePage({ navigation }) {
  const [cont, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("token").then((_data) => {
      // console.log(_data);
      setToken(() => jwtDecode(_data).userId);
    });
  }, [setTaskItems, setUser]);

  useEffect(() => {
    if (!token) return;
    getData(token).then((data) => {
      // console.log(data);
      setUser(data.data.data.user);
      let arr = extractConts(data.data.data.user.todoEl);
      console.log(arr);
      setTaskItems(arr);
    });
  }, [token, taskItems]);

  function extractConts(array) {
    const contArray = array.map((obj) => [obj.cont, obj.id]);
    return contArray;
  }

  const getData = async (token) => {
    try {
      return await axiosInstanceToApi.get(`/users/getUser/${token}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddTask = async () => {
    Keyboard.dismiss();

    try {
      await axiosInstanceToApi
        .post(`/todoEl/createTodoEl`, {
          cont,
          userId: token,
        })
        .then(() => {
          setTaskItems((prev) => {
            let aux = prev;
            aux.push(cont);
            return aux;
          });
        });
      setTask("");
    } catch (err) {
      console.log(err);
    }
  };

  const completeTask = async (id) => {
    try {
      await axiosInstanceToApi.delete(`/todoEl/deleteTodoEl/${id}`).then(() => {
        setTaskItems((prevData) => prevData.filter((item) => item[1] !== id));
        console.log(taskItems);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogOut = async () => {
    await removeTokenFromStorage();
    navigation.navigate("PresPage");
  };
  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      > */}
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text>Welcome {user.name}</Text>
        <View style={styles.contH}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <Button
            style={styles.btn}
            size="md"
            onPress={handleLogOut}
            bg="tertiary.700"
          >
            Log out
          </Button>
        </View>

        <View style={styles.items}>
          <FlatList
            data={taskItems}
            keyExtractor={(friend) => friend[1]}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => completeTask(item[1])}>
                  <Task text={item[0]} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      {/* </ScrollView> */}

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={cont}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  contH: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: "#047857",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#047857",
    borderWidth: 1,
  },
  addText: {},
});
// const getToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem("token");
//     setToken(token);
//     setUserId(jwtDecode(token).userId);
//   } catch (err) {
//     console.log(err);
//   }
// };
// setUser(data.data.data.user);
// let arr = extractConts(data.data.data.user.todoEl);
// console.log(arsr);
// setTaskItems(arr);
