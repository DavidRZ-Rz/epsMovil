// Components/CardComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Importación de componentes básicos de React Native
import { Ionicons, AntDesign } from '@expo/vector-icons'; // Importación de íconos desde la librería de Expo

/** 
 * Componente DoctorComponent
 * Muestra información básica de un doctor con botones para ver, editar y eliminar.
*/
export default function CardComponent({ 
  item,                 // Datos del item, disponible si se necesita acceder al objeto completo
  onView,               // Función que se ejecuta al presionar el botón de "ver"
  onEdit,               // Función que se ejecuta al presionar el botón de "editar"
  onDelete,             // Función que se ejecuta al presionar el botón de "eliminar"
  viewIcon = "eye",     // Icono por defecto para la acción de ver
  editIcon = "create",  // Icono por defecto para la acción de editar
  doctor,               // Objeto que contiene la información del doctor (nombre, apellido, etc.)
  showActions = true    // Bandera que determina si se deben mostrar los botones de acción
}) {
  return (
    <View style={styles.card}> {/* Contenedor principal del componente */}

      <View style={styles.infoContainer}> {/* Contenedor para mostrar la información del doctor */}
        {/* Nombre del doctor */}
        <Text style={styles.name}>Nombre: {doctor.nombre}</Text>
        
        {/* Apellido del doctor */}
        <Text style={styles.detail}>Apellido: {doctor.apellido}</Text>
        
        {/* Campos comentados: Especialidad y Consultorio (se pueden mostrar si se desea) */}
        {/* 
        <Text style={styles.detail}>Especialidad: {doctor.idEspecialidad}</Text>
        <Text style={styles.detail}>Consultorio: {doctor.idConsultorio}</Text> 
        */}
      </View>

      {/* Sección de botones de acción: Ver, Editar, Eliminar */}
      {showActions && (
        <View style={styles.actionsContainer}>
          
          {/* Botón Ver */}
          {onView && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onView}
            >
              <Ionicons name={viewIcon} size={20} color="#1976D2" />
            </TouchableOpacity>
          )}
          
          {/* Botón Editar */}
          {onEdit && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onEdit}
            >
              <Ionicons name={editIcon} size={20} color="#FFA000" />
            </TouchableOpacity>
          )}

          {/* Botón Eliminar */}
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
    backgroundColor: "white",       // Fondo blanco
    borderRadius: 10,               // Bordes redondeados
    padding: 15,                    // Espaciado interno
    marginBottom: 15,               // Margen inferior entre tarjetas
    flexDirection: "row",           // Alineación horizontal entre info y acciones
    justifyContent: "space-between",// Distribución entre info y botones
    alignItems: "flex-start",       // Alineación superior
    shadowColor: "#000",            // Color de sombra
    shadowOffset: { width: 0, height: 2 }, // Dirección de la sombra
    shadowOpacity: 0.1,             // Opacidad de la sombra
    shadowRadius: 4,                // Difuminado
    elevation: 3,                   // Elevación (sombra en Android)
  },
  infoContainer: {
    flex: 1,                        // Toma todo el espacio disponible para los datos del doctor
  },
  name: {
    fontSize: 18,                   // Tamaño del texto del nombre
    fontWeight: "600",             // Peso de fuente seminegrita
    color: "#333",                 // Color del texto
    marginBottom: 5,               // Separación inferior
  },
  detail: {
    fontSize: 14,                  // Tamaño de fuente para detalles
    color: "#666",                 // Color gris
    marginBottom: 3,              // Separación inferior
  },
  actionsContainer: {
    flexDirection: "row",         // Botones alineados horizontalmente
    marginTop: 5,                 // Separación superior
  },
  actionButton: {
    marginLeft: 10,               // Separación entre botones
    padding: 8,                   // Espaciado interno
  },
});
