import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import EspecialidadComponent from "../../Components/EspecialidadComponent";
import { useNavigation } from "@react-navigation/native";
import { listarEspecialidad, eliminarEspecialidad } from "../../src/Services/ActividadService";

export default function ListarEspecialidadScreen() {
  const [especialidad, setEspecialdad] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleEspecialidades = async () => {
    setLoading(true);
    try {
      const result = await listarEspecialidad();
      if (result.success) {
        setEspecialdad(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "no se pudiaron obtener las especiliades"
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudiaron cargar las especialidades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleEspecialidades);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (especialidad) => {
    navigation.navigate("EditarEspecialidad", { especialidad });
  };

  const handleCrear = () => {
    navigation.navigate("EditarEspecialidad");
  };

  const handleView = (especialidad) => {
    navigation.navigate("DetalleEspecialidad", { especialidad });
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar Especialidad",
      "¿Estas seguro de eliminar esta especialidad?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarEspecialidad(id);
              if (result.success) {
                // setPacientes(pacientes.filter((p) => p.id !== id));
                // otra funcion para listar
                handleEspecialidades();
              } else {
                Alert.alert(
                  "Error",
                  result.message || "No se pudo eliminar la especialidad"
                );
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la especialidad");
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
      <Text style={styles.title}>Listado de Especialidades</Text>

      {especialidad.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={especialidad}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EspecialidadComponent
              especialidad={item}
              onDelete={() => handleEliminar(item.id)}
              onEdit={() => handleEditar(item)}
              onView={() => handleView(item)}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No hay especialidades ingresadas</Text>
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleCrear}>
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
