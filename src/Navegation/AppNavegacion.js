import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, StyleSheet, AppState } from "react-native";

// Componente principal de navegación de la aplicación
// Maneja la navegación entre las pantallas de autenticación y las pantallas principales
// Utiliza AsyncStorage para manejar el token de usuario y el estado de la aplicación
// Escucha cambios en el estado de la aplicación para recargar el token si es necesario

export default function AppNavegacion() {
  // Estado para manejar el token de usuario y el estado de carga
  const [isLoading, setIsLoading] = useState(true);
  // Estado para almacenar el token de usuario
  // Se inicializa como null y se carga desde AsyncStorage al inicio
  const [userToken, setUserToken] = useState(null);
  // Referencia para manejar el estado de la aplicación
  // Permite detectar cambios en el estado de la aplicación (activo, inactivo, en
  const appState = useRef(AppState.currentState);

  // Función para cargar el token de usuario desde AsyncStorage
  // Se ejecuta al inicio y cada vez que la aplicación vuelve a primer plano
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
    } catch (e) {
      console.error("Error al cargar el token desde AsyncStorage:", e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadToken(); //carga incial del token
  }, []);

  // Escucha cambios en el estado de la aplicación
  // Si la aplicación vuelve a primer plano, recarga el token
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App ha vuelto a primer plano, recargando el token...");
        loadToken();
      }
      appState.current = nextAppState;
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, []);

  // Efecto para recargar el token cada 5 minutos si la aplicación está activa 
  // Esto es útil para mantener el token actualizado en caso de que expire
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        if (AppState.currentState === 'active') {
          loadToken(); // recarga el token cada 5 minutos si la app está activa
        }
      }, 2000); // 2 segundos para pruebas, cambiar a 300000 para 5 minutos
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    // NavigationContainer es el contenedor principal de navegación
    // que debe envolver toda la aplicación de navegación.
    <NavigationContainer>
      {userToken ? <NavegacionPrincipal /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    },
});