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
import DoctorComponent from "../../Components/DoctorComponent"; // Componente que muestra un doctor individualmente
import { useNavigation } from "@react-navigation/native";
import {
  listarDoctor,
  eliminarDoctor,
} from "../../src/Services/DoctorService"; // Servicios para listar y eliminar doctores

// Componente principal para listar, eliminar, ver y navegar hacia la edición o creación de doctores
export default function ListarDoctorScreen() {
  const [doctor, setDoctor] = useState([]); // Lista de doctores
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigation = useNavigation(); // Hook para navegar entre pantallas

  // Función que obtiene los doctores desde el servicio
  const handleDoctores = async () => {
    setLoading(true);
    try {
      const result = await listarDoctor(); // Llamada al servicio
      if (result.success) {
        setDoctor(result.data); // Guardar los doctores obtenidos
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron obtener los doctores"
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los doctores");
    } finally {
      setLoading(false);
    }
  };

  // Cargar doctores cada vez que se enfoca la pantalla (útil al volver desde otra)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleDoctores);
    return unsubscribe; // Limpiar el listener al desmontar
  }, [navigation]);

  // Navega a la pantalla de edición con datos del doctor
  const handleEditar = (doctor) => {
    navigation.navigate("EditarDoctor", { doctor });
  };

  // Navega a la pantalla de creación (sin pasar datos)
  const handleCrear = () => {
    navigation.navigate("EditarDoctor");
  };

  // Navega al detalle del doctor
  const handleView = (doctor) => {
    navigation.navigate("DetalleDoctor", { doctor });
  };

  // Muestra un Alert de confirmación antes de eliminar
  const handleEliminar = (id) => {
    Alert.alert("Eliminar Doctor", "¿Estás seguro de eliminar este doctor?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await eliminarDoctor(id); // Llamada para eliminar
            if (result.success) {
              handleDoctores(); // Recargar doctores tras eliminación
            } else {
              Alert.alert("Error", result.message || "No se pudo eliminar el doctor");
            }
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el doctor");
          }
        },
      },
    ]);
  };

  // Mostrar pantalla de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Doctores</Text>

      {/* Si hay doctores, mostrar lista; si no, mostrar mensaje vacío */}
      {doctor.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={doctor}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DoctorComponent
              doctor={item}
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

      {/* Botón flotante para crear nuevo doctor */}
      <TouchableOpacity style={styles.addButton} onPress={handleCrear}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

// Estilos para la pantalla
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
