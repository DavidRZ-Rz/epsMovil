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
  cita,
  showActions = true 
}) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
       

        {/* especialidades */}
        <Text style={styles.name}>Fecha: {cita.fecha}</Text>
        <Text style={styles.detail}>Hora: {cita.hora}</Text>
        


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