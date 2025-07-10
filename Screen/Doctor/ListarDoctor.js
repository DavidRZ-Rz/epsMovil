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
import DoctorComponent from "../../Components/DoctorComponent";
import { useNavigation } from "@react-navigation/native";
import {
  listarDoctor,
  eliminarDoctor,
} from "../../src/Services/DoctorService";

export default function ListarDoctorScreen() {
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleDoctores = async () => {
    setLoading(true);
    try {
      const result = await listarDoctor();
      if (result.success) {
        setDoctor(result.data);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleDoctores);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (doctor) => {
    navigation.navigate("EditarDoctor", { doctor });
  };

  const handleCrear = () => {
    navigation.navigate("EditarDoctor");
  };
  const handleView = (doctor) => {
    navigation.navigate("DetalleDoctor", { doctor });
  };
  const handleEliminar = (id) => {
    // Implement delete functionality
    Alert.alert("Eliminar Doctor", "¿Estas seguro de eliminar este doctor?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await eliminarDoctor(id);
            if (result.success) {
              // setPacientes(pacientes.filter((p) => p.id !== id));
              // otra funcion para listar
              handleDoctores();
            } else {
              Alert.alert("Error", result.message || "No se pudo eliminar el ");
            }
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el doctor");
          }
        },
      },
    ]);
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
      <Text style={styles.title}>Listado de Doctores</Text>

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
