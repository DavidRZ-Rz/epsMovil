import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "../../Components/CitaComponent";
import { useNavigation } from "@react-navigation/native";
import { listarCita, eliminarCita } from "../../src/Services/CitasService";


export default function ListarCita() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleCitas = async () => {
    setLoading(true);
    try {
      const result = await listarCita();
      if (result.success) {
        setCitas(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron obtener las citas"
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las citas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCitas);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (cita) => {
    navigation.navigate("EditarCita", { cita });
  };
  const handleCrear = () => {
    navigation.navigate("EditarCita");
  };
  const handleView = (cita) => {
    navigation.navigate("DetalleCita", { cita });
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar Cita",
      "¿Estás seguro de que deseas eliminar esta cita?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const result = await eliminarCita(id);
              if (result.success) {
                setCitas(citas.filter((cita) => cita.id !== id));
                Alert.alert("Éxito", "Cita eliminada correctamente");
              } else {
                Alert.alert(
                  "Error",
                  result.message || "No se pudo eliminar la cita"
                );
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la cita");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando citas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Citas</Text>

      {citas.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={citas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardComponent
              cita={item}
              onEdit={() => handleEditar(item)}
              onDelete={() => handleEliminar(item.id)}
              onView={() => handleView(item)}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No hay Citas registrados</Text>
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
