// Components/DetalleComponent.js
import React from "react";
import { View, StyleSheet } from "react-native"; // Importa componentes esenciales de React Native

// Este componente es un contenedor reutilizable para mostrar detalles (como citas, pacientes, etc.)
const DetalleComponent = ({ children }) => {
  // Renderiza un contenedor con estilo de tarjeta y muestra los elementos hijos que se le pasen
  return <View style={styles.card}>{children}</View>;
};

// Estilos del componente
const styles = StyleSheet.create({
  card: {
    width: "100%",              // Ocupa todo el ancho disponible
    backgroundColor: "#FFFFFF", // Fondo blanco
    borderRadius: 10,           // Bordes redondeados
    padding: 20,                // Espaciado interno
    marginBottom: 20,           // Espaciado inferior entre componentes
    shadowColor: "#000",        // Color de sombra (negro)
    shadowOffset: { width: 0, height: 2 }, // Dirección de la sombra
    shadowOpacity: 0.1,         // Opacidad de la sombra
    shadowRadius: 5,            // Difuminado de la sombra
    elevation: 3,               // Elevación (sombra para Android)
  },
});

// Exporta el componente para que pueda ser usado en otros archivos
export default DetalleComponent;
