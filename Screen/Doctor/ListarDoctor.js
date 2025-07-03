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

export default function ListarDoctorScreen({ navigation }) {
  const doctores = [
    { 
      id: 1, 
      nombre: "Juan Pérez", 
      edad: 35, 
      telefono: "555-1234",
      especialidad: "Cardiología",
     
    },
    { 
      id: 2, 
      nombre: "María García", 
      edad: 28, 
      telefono: "555-5678",
      especialidad: "Dermatología",
     
    },
    { 
      id: 3, 
      nombre: "Carlos López", 
      edad: 42, 
      telefono: "555-9012",
      especialidad: "Pediatría",
     
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Doctores</Text>

      <ScrollView style={styles.listContainer}>
        {doctores.map((doctores) => (
          <CardComponent
            key={doctores.id}
            item={doctores}
            onView={() => navigation.navigate("DetalleDoctor", { doctores })}
            onEdit={() => navigation.navigate("EditarDoctor", { doctores })}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NuevoDoctor")}
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