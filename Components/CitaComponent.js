// Components/CardComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

/** 
 * Componente CitaComponent
 * Muestra información de una cita con opciones para ver, editar y eliminar.
*/
export default function CardComponent({ 
  item, 
  onView, 
  onEdit,
  onDelete, 
  viewIcon = "eye", 
  editIcon = "create",
  cita,
  showActions = true 
}) {
  return (
    <View style={styles.card}>
      {/* Contenedor principal de información */}
      <View style={styles.infoContainer}>
        {/* Muestra la fecha de la cita */}
        <Text style={styles.name}>Fecha: {cita.fecha}</Text>
        {/* Muestra la hora de la cita */}
        <Text style={styles.detail}>Hora: {cita.hora}</Text>
      </View>

      {/* Contenedor de acciones (solo se muestra si showActions es true) */}
      {showActions && (
        <View style={styles.actionsContainer}>
          {/* Botón de Ver - Solo se muestra si se pasa onView */}
          {onView && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onView}
            >
              <Ionicons name={viewIcon} size={20} color="#1976D2" />
            </TouchableOpacity>
          )}
          
          {/* Botón de Editar - Solo se muestra si se pasa onEdit */}
          {onEdit && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onEdit}
            >
              <Ionicons name={editIcon} size={20} color="#FFA000" />
            </TouchableOpacity>
          )}

          {/* Botón de Eliminar - Solo se muestra si se pasa onDelete */}
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
  // Estilo base de la tarjeta
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // Contenedor de la información principal
  infoContainer: {
    flex: 1,
  },
  // Estilo para el texto principal (nombre/título)
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  // Estilo para los detalles
  detail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  // Contenedor de los botones de acción
  actionsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  // Estilo de cada botón de acción
  actionButton: {
    marginLeft: 10,
    padding: 8,
  },
});