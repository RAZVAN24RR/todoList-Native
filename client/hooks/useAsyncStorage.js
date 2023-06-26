import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveTokenToStorage(tokenValue) {
  try {
    await AsyncStorage.setItem("token", tokenValue);
    console.log("Token saved successfully");
  } catch (error) {
    console.log("Error saving token:", error);
  }
}

export async function removeTokenFromStorage() {
  try {
    await AsyncStorage.removeItem("token");
    console.log("Token removed successfully");
  } catch (error) {
    console.log("Error removing token:", error);
  }
}
