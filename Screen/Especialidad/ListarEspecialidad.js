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

export default function ListarEspecialidadScreen({ navigation }) {
  const especialidades = [
    { id: 1, nombre: "Cardiología", descripcion: "Trata enfermedades del corazón", duracion: "3 años" },
    { id: 2, nombre: "Dermatología", descripcion: "Enfocada en la piel", duracion: "2 años" },
    { id: 3, nombre: "Pediatría", descripcion: "Cuidado de niños y adolescentes", duracion: "3 años" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Especialidades</Text>

      <ScrollView style={styles.listContainer}>
        {especialidades.map((especialidad) => (
          <CardComponent
            key={especialidad.id}
            item={especialidad}
            onView={() =>
              navigation.navigate("DetalleEspecialidad", { especialidad })
            }
            onEdit={() =>
              navigation.navigate("EditarEspecialidad", { especialidad })
            }
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NuevaEspecialidad")}
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