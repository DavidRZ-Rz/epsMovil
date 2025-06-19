import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "../../Components/CardComponent";
export default function ListarEspecialidadScreen({ navigation }) {
  const pacientes = [
    { id: 1, nombre: "Juan Pérez", edad: 35, telefono: "555-1234" },
    { id: 2, nombre: "María García", edad: 28, telefono: "555-5678" },
    { id: 3, nombre: "Carlos López", edad: 42, telefono: "555-9012" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado Especialidades</Text>
      <ScrollView style={styles.listContainer}>
        {pacientes.map((paciente) => (
          <CardComponent
            key={paciente.id}
            item={paciente}
            onView={() =>
              navigation.navigate("DetalleEspecialidad", { paciente })
            }
            onEdit={() =>
              navigation.navigate("EditarEspecialidad", { paciente })
            }
            viewIcon="eye"
            editIcon="create"
            showActions={true}
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
