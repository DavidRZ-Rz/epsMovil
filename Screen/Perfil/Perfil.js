import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../Components/BotonComponent";
import api from "../../src/Services/conexion";
import { logoutUser } from "../../src/Services/AuthService";

export default function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPefil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No se encontró el token de usuario");
          return;
        }

        console.log("Intentando cargar perfil con token:", token);
        const response = await api.get("/me");
        console.log("Perfil cargado exitosamente:", response.data);
        setUsuario(response.data);
      } catch (error) {
        console.log("Error al cargar el perfil:", error);

        if (error.isAuthError || error.shouldRedirectToLogin) {
          console.log("Error de autenticación, redirigiendo a login...");
          return;
        }
        if (error.response) {
          console.log(
            "Error respinse: ",
            error.response.status,
            error.response.data
          );
          Alert.alert(
            "Error al servidor",
            `Error ${error.response.status}: ${
              error.response.data?.message ||
              "Ocurrió un error al cargar el perfil."
            }`,
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else if (error.request) {
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar al servidor. Por favor, verifica tu conexión a internet.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else {
          Alert.alert(
            "Error",
            "Ocurrió un error inesperado al cargar el perfil.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        }
      } finally {
        setLoading(false);
      }
    };
    cargarPefil();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.ContainerPerfil}>
          <Text style={styles.errorPerfil}>
            No se pudo cargar el perfil del usuario.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.ContainerPerfil}>
        <Text style={styles.profileText}>Nombre: {usuario.user.name || "no disponible"}</Text>
        <Text style={styles.profileText}>Correo Electrónico: {usuario.user.email || "no disponible"}</Text>
        <Text style={styles.profileText}>Role: {usuario.user.role || "no disponible"}</Text>

        <BottonComponent title="Editar Perfil" onPress={() => {}} />
        <BottonComponent
          title="Cerrar Sesión"
          onPress={async () => {
            await logoutUser();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  ContainerPerfil: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  errorPerfil: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
