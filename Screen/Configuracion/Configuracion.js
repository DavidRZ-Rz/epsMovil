// Importación de componentes y librerías necesarias
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para guardar preferencias localmente
import * as Notifications from "expo-notifications"; // Manejo de permisos y notificaciones push

// Componente principal de la pantalla de configuración
export default function ConfiguracionScreen() {
  const [permisosNotificaciones, setPermisosNotificaciones] = useState(false); // Estado para saber si las notificaciones están activadas
  const [loading, setLoading] = useState(true); // Estado para mostrar la pantalla de carga

  // useEffect que se ejecuta al montar el componente
  useEffect(() => {
    const checkPermisos = async () => {
      const { status } = await Notifications.getPermissionsAsync(); // Verifica permisos del sistema
      const preferencia = await AsyncStorage.getItem("notificaciones_activadas"); // Obtiene preferencia almacenada del usuario

      // Se activa solo si los permisos del sistema están concedidos y la preferencia no es "false"
      setPermisosNotificaciones(status === "granted" && preferencia !== "false");
      setLoading(false); // Desactiva el estado de carga
    };
    checkPermisos();
  }, []);

  // Función para alternar el estado del switch
  const toggleSwitch = async (valor) => {
    if (valor) {
      // Solicita permisos si el usuario activa el switch
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        await AsyncStorage.setItem("notificaciones_activadas", "true");
        setPermisosNotificaciones(true);
        Alert.alert("Notificaciones", "Las notificaciones han sido activadas.");
      } else {
        await AsyncStorage.setItem("notificaciones_activadas", "false");
        setPermisosNotificaciones(false);
        Alert.alert("Notificaciones", "Las notificaciones han sido desactivadas.");
      }
    } else {
      // El usuario desactivó manualmente el switch
      await AsyncStorage.setItem("notificaciones_activadas", "false");
      setPermisosNotificaciones(false);
      Alert.alert(
        "Desactivación de Notificaciones",
        "Si quieres activar las notificaciones, debes hacerlo desde la configuración de tu dispositivo."
      );
    }
  };

  // Muestra una pantalla de carga mientras se obtienen permisos/preferencias
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Renderiza la pantalla principal de configuración
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      {/* Opción para activar o desactivar notificaciones */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>
          Notificaciones: {permisosNotificaciones ? "Activadas" : "Desactivadas"}
        </Text>
        {/* Switch que cambia el estado de las notificaciones */}
        <Switch
          value={permisosNotificaciones}
          onValueChange={toggleSwitch} // Llama a toggleSwitch con el nuevo valor
        />
      </View>

      {/* Botón de navegación a configuración de cuenta (simulado) */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Cuenta</Text>
        <Text style={styles.arrow}>{">"}</Text>
      </TouchableOpacity>

      {/* Botón de navegación a ayuda y soporte (simulado) */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Ayuda y soporte</Text>
        <Text style={styles.arrow}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
    color: "#999",
  },
  logoutButton: {
    marginTop: 30,
    justifyContent: "center",
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "red",
    textAlign: "center",
  },
});
