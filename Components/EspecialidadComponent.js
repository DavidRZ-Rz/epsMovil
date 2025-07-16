// Components/CardComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Importa componentes esenciales de React Native
import { Ionicons, AntDesign } from '@expo/vector-icons'; // Importa íconos desde la librería de Expo

/** 
 * Componente CitaComponent (aunque realmente muestra una especialidad)
 * Muestra información de una especialidad médica con botones para ver, editar y eliminar.
*/
export default function CardComponent({ 
  item,                    // Objeto general del item (no se usa directamente aquí, pero puede servir en callbacks)
  onView,                  // Función que se ejecuta al presionar el botón "ver"
  onEdit,                  // Función que se ejecuta al presionar el botón "editar"
  onDelete,                // Función que se ejecuta al presionar el botón "eliminar"
  viewIcon = "eye",        // Icono predeterminado para ver (puede ser personalizado)
  editIcon = "create",     // Icono predeterminado para editar (puede ser personalizado)
  especialidad,            // Objeto que contiene los datos de la especialidad médica
  showActions = true       // Bandera para mostrar/ocultar los botones de acción
}) {
  return (
    <View style={styles.card}> {/* Contenedor principal de la tarjeta */}

      {/* Contenedor de la información de la especialidad */}
      <View style={styles.infoContainer}>
        {/* Muestra el nombre de la especialidad */}
        <Text style={styles.name}>Nombre Especialidad: {especialidad.nombre}</Text>
      </View>

      {/* Si se permite mostrar acciones, se renderizan los botones de acción */}
      {showActions && (
        <View style={styles.actionsContainer}>
          
          {/* Botón para ver más información */}
          {onView && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onView}
            >
              <Ionicons name={viewIcon} size={20} color="#1976D2" />
            </TouchableOpacity>
          )}

          {/* Botón para editar la especialidad */}
          {onEdit && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onEdit}
            >
              <Ionicons name={editIcon} size={20} color="#FFA000" />
            </TouchableOpacity>
          )}

          {/* Botón para eliminar la especialidad */}
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

// Estilos del componente
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",       // Fondo blanco de la tarjeta
    borderRadius: 10,               // Bordes redondeados
    padding: 15,                    // Espaciado interno
    marginBottom: 15,               // Espaciado inferior entre tarjetas
    flexDirection: "row",           // Alineación horizontal (info + botones)
    justifyContent: "space-between",// Distribución entre info y acciones
    alignItems: "flex-start",       // Alineación vertical al inicio
    shadowColor: "#000",            // Color de sombra
    shadowOffset: { width: 0, height: 2 }, // Dirección de la sombra
    shadowOpacity: 0.1,             // Opacidad de la sombra
    shadowRadius: 4,                // Difuminado de la sombra
    elevation: 3,                   // Elevación para sombra en Android
  },
  infoContainer: {
    flex: 1,                        // Ocupa todo el espacio disponible para la información
  },
  name: {
    fontSize: 18,                   // Tamaño de fuente grande para el nombre
    fontWeight: "600",             // Seminegrita
    color: "#333",                 // Texto oscuro
    marginBottom: 5,               // Margen inferior
  },
  detail: {
    fontSize: 14,                   // Fuente más pequeña para detalles (no se usa aquí)
    color: "#666",                  // Color gris claro
    marginBottom: 3,               // Margen inferior
  },
  actionsContainer: {
    flexDirection: "row",          // Alineación horizontal de los botones
    marginTop: 5,                  // Separación superior
  },
  actionButton: {
    marginLeft: 10,                // Separación entre botones
    padding: 8,                    // Espaciado interno del botón
  },
});
