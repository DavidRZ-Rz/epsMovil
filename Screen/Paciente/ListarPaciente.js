import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "../../Components/CardComponent";
import { useNavigation } from "@react-navigation/native";
import { listarPaciente,eliminarPaciente } from "../../src/Services/ActividadService";


export default function ListarPacienteScreen() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handlePacientes = async () => {
    setLoading(true);
    try {
      const result = await listarPaciente();
      if (result.success) {
        setPacientes(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron obtener los pacientes"
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handlePacientes);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (paciente) => {
    // Implement edit functionality
    navigation.navigate("EditarPaciente", { paciente });
  };

  const handleCrear = () =>{
    navigation.navigate("EditarPaciente")
  }

  const handleView = (paciente) => {
    // Implement edit functionality
    navigation.navigate("DetallePaciente", { paciente });
  };

  const handleEliminar = (id) => {
    // Implement delete functionality
    Alert.alert(
      "Eliminar Paciente",
      "¿Estas seguro de eliminar este paciente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarPaciente(id);
              if (result.success) {
                // setPacientes(pacientes.filter((p) => p.id !== id));
                // otra funcion para listar
                handlePacientes();
              } else {
                Alert.alert(
                  "Error",
                  result.message || "No se pudo eliminar el paciente"
                );
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el paciente");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Pacientes</Text>

      {pacientes.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={pacientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardComponent
              paciente={item}
              onDelete={() => handleEliminar(item.id)}
              onEdit={() => handleEditar(item)}
              onView={() => handleView(item)}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No hay pacientes registrados</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleCrear}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
