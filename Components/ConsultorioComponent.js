// Components/CardComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Importa componentes esenciales de React Native
import { Ionicons, AntDesign } from '@expo/vector-icons'; // Importa iconos desde la librería de Expo

/** 
 * Componente CardComponent
 * Muestra información de un consultorio con botones para ver, editar y eliminar.
 */
export default function CardComponent({ 
  item,               // Datos del item (no usado directamente aquí, pero puede ser útil en callbacks)
  onView,             // Función que se ejecuta al presionar el botón "ver"
  onEdit,             // Función que se ejecuta al presionar el botón "editar"
  onDelete,           // Función que se ejecuta al presionar el botón "eliminar"
  viewIcon = "eye",   // Nombre del icono para la acción de ver (por defecto "eye")
  editIcon = "create",// Nombre del icono para la acción de editar (por defecto "create")
  consultorio,        // Objeto que contiene los datos del consultorio (piso, número, etc.)
  showActions = true  // Bandera para mostrar u ocultar los botones de acción
}) {
  return (
    <View style={styles.card}> {/* Contenedor principal del componente */}

      {/* Contenedor de la información del consultorio */}
      <View style={styles.infoContainer}>
        {/* Muestra el piso del consultorio */}
        <Text style={styles.name}>Piso de Consultorio: {consultorio.piso}</Text>
        
        {/* Muestra el número del consultorio */}
        <Text style={styles.name}>Numero del Consultorio: {consultorio.numero}</Text>
      </View>

      {/* Si showActions es verdadero, se muestran los botones de acción */}
      {showActions && (
        <View style={styles.actionsContainer}>
          
          {/* Botón para ver detalles del consultorio */}
          {onView && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onView}
            >
              <Ionicons name={viewIcon} size={20} color="#1976D2" />
            </TouchableOpacity>
          )}
          
          {/* Botón para editar el consultorio */}
          {onEdit && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onEdit}
            >
              <Ionicons name={editIcon} size={20} color="#FFA000" />
            </TouchableOpacity>
          )}

          {/* Botón para eliminar el consultorio */}
          {onDelete && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onDelete}
            >
              <AntDesign name="delete" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",       // Color de fondo
    borderRadius: 10,               // Bordes redondeados
    padding: 15,                    // Espaciado interno
    marginBottom: 15,               // Espaciado inferior entre tarjetas
    flexDirection: "row",          // Alineación horizontal
    justifyContent: "space-between",// Espaciado entre elementos
    alignItems: "flex-start",      // Alineación vertical al inicio
    shadowColor: "#000",           // Color de sombra
    shadowOffset: { width: 0, height: 2 }, // Dirección de la sombra
    shadowOpacity: 0.1,            // Opacidad de la sombra
    shadowRadius: 4,               // Difuminado de la sombra
    elevation: 3,                  // Elevación en Android
  },
  infoContainer: {
    flex: 1, // Ocupa todo el espacio disponible
  },
  name: {
    fontSize: 18,        // Tamaño del texto
    fontWeight: "600",   // Peso del texto (semi-negrita)
    color: "#333",       // Color del texto
    marginBottom: 5,     // Margen inferior
  },
  detail: {
    fontSize: 14,        // Tamaño del texto para detalles
    color: "#666",       // Color gris
    marginBottom: 3,     // Margen inferior
  },
  actionsContainer: {
    flexDirection: "row", // Alineación horizontal de los botones
    marginTop: 5,         // Margen superior
  },
  actionButton: {
    marginLeft: 10, // Margen izquierdo entre botones
    padding: 8,     // Espaciado interno
  },
});
