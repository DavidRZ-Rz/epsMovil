// Components/CardComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function CardComponent({ 
  item, 
  onView, 
  onEdit,
  onDelete, 
  viewIcon = "eye", 
  editIcon = "create",
  paciente,
  especialidad,
  showActions = true 
}) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        {/* Título principal */}
        <Text style={styles.name}>Nombre: {paciente.nombre}</Text>
        <Text style={styles.name}>Apellido: {paciente.apellido}</Text>
        <Text style={styles.detail}>Documento: {paciente.documento}</Text>
        {/* <Text style={styles.detail}>Telefono: {paciente.telefono}</Text> */}
        {/* <Text style={styles.detail}>Email: {paciente.email}</Text> */}


        



        {/* Mostrar campos si existen */}
        {/* {item.descripcion && (
          <Text style={styles.detail}>Descripción: {item.descripcion}</Text>
        )}
        {item.duracion && (
          <Text style={styles.detail}>Duración: {item.duracion}</Text>
        )}
        {item.edad !== undefined && (
          <Text style={styles.detail}>Edad: {item.edad} años</Text>
        )}
        {item.telefono && (
          <Text style={styles.detail}>Teléfono: {item.telefono}</Text>
        )}
        {item.fecha && (
          <Text style={styles.name}>Fecha: {item.fecha}</Text>
        )}
        {item.hora && (
          <Text style={styles.detail}>Hora: {item.hora}</Text>
        )}
        {item.especialidad && (
          <Text style={styles.detail}>Especialidad: {item.especialidad}</Text>
        )}
        {item.piso && (
          <Text style={styles.detail}>Piso: {item.piso}</Text>
        )}
        {item.numero && (
          <Text style={styles.detail}>Numero habitación: {item.numero}</Text>
        )} */}
      </View>

      {showActions && (
        <View style={styles.actionsContainer}>
          {onView && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onView}
            >
              <Ionicons name={viewIcon} size={20} color="#1976D2" />
            </TouchableOpacity>
          )}
          
          {onEdit && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onEdit}
            >
              <Ionicons name={editIcon} size={20} color="#FFA000" />
            </TouchableOpacity>
          )}

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

const styles = StyleSheet.create({
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
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  actionButton: {
    marginLeft: 10,
    padding: 8,
  },
});