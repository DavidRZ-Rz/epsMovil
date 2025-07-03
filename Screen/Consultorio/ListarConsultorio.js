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

export default function ListarConsultorioScreen({ navigation }) {
  const consultorio = [
    { id: 1, nombre: "Juan Pérez", piso: "5", numero: "101" },
    { id: 2, nombre: "María García", piso: "6", numero: "301" },
    { id: 3, nombre: "Carlos López", piso: "2", numero: "100" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Consultorios</Text>

      <ScrollView style={styles.listContainer}>
        {consultorio.map((consultorio) => (
          <CardComponent
            key={consultorio.id}
            item={consultorio}
            onView={() =>
              navigation.navigate("DetalleConsultorio", { consultorio })
            }
            onEdit={() =>
              navigation.navigate("EditarConsultorio", { consultorio })
            }
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NuevoConsultorio")}
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