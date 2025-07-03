import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "../../Components/CardComponent";

export default function ListarCita({ navigation }) {
  const citas = [
    { id: 1, paciente: "Juan Pérez", fecha: "2025-07-05", hora: "10:00 AM" },
    { id: 2, paciente: "María García", fecha: "2025-07-06", hora: "2:00 PM" },
    { id: 3, paciente: "Carlos López", fecha: "2025-07-07", hora: "11:30 AM" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Citas</Text>

      <ScrollView style={styles.listContainer}>
        {citas.map((cita) => (
          <CardComponent
            key={cita.id}
            item={cita}
            onView={() =>
              navigation.navigate("DetalleCita", { cita })
            }
            onEdit={() =>
              navigation.navigate("EditarCita", { cita })
            }
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NuevaCita")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#1976D2",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});