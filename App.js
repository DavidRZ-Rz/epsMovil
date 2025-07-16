import { Alert, Button ,View} from "react-native";
import AppNavegacion from "./src/Navegation/AppNavegacion";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";

export default function App() {
  // Configuración de notificaciones
  useEffect(() => {
    Notifications.setNotificationHandler({
      // como se debe manejar las notificaciones cuando la app esta abierta
      handleNotification: async () => ({
        shouldShowAlert: true, // mostrar alerta de notificación
        shouldPlaySound: true, // reproducir sonido de notificación
        shouldSetBadge: false, // no cambia el icnono de la app
      }),
    });
    // Solicitar permisos para notificaciones
    // Esto es necesario para que la aplicación pueda enviar notificaciones al usuario
    const getPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso de notificaciones",
          "Debe permitir las notificaciones para recibir alertas importantes."
        );
      }
    };
    getPermissions();
  }, []);

  const enviarNotificacionLocal = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificación de prueba",
        body: "Esta es una notificación de prueba enviada desde la aplicación.",
      },
      trigger: { seconds: 2 }, // se dispara después de 2 segundos
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppNavegacion />
      <Button
        color="#841584"
        title="Enviar Notificación Local"
        onPress={enviarNotificacionLocal}
      />
    </View>
  );

  // El componente AppNavegacion es el punto de entrada de la aplicación
}
