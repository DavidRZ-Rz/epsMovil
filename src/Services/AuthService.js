import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";
import { Alert } from "react-native";

export const loginUser = async (email, password) => {
  try {
    const respnse = await api.post("/login", { email, password });
    const { token } = respnse.data;

    await AsyncStorage.setItem("userToken", token);

    return { success: true, token };
  } catch (error) {
    console.error(
      "Error de login",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: error.response ? error.response.data.message : "Error de conexión",
    };
  }
};
