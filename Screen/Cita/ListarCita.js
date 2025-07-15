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

/**
 * Componente para listar todas las citas médicas
 * Permite:
 * - Visualizar el listado completo de citas
 * - Navegar a detalles de una cita
 * - Editar o eliminar citas
 * - Crear nuevas citas
 */
export default function ListarCita() {
  // Estados del componente
  const [citas, setCitas] = useState([]); // Almacena la lista de citas
  const [loading, setLoading] = useState(true); // Controla el estado de carga
  const navigation = useNavigation(); // Hook de navegación

  /**
   * Función para cargar las citas desde el servicio
   * Maneja estados de carga y errores
   */
  const handleCitas = async () => {
    setLoading(true);
    try {
      const result = await listarCita();
      if (result.success) {
        setCitas(result.data); // Actualiza el estado con las citas obtenidas
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron obtener las citas"
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las citas");
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Efecto para recargar las citas cuando el componente recibe foco
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCitas);
    return unsubscribe; // Limpieza del listener al desmontar
  }, [navigation]);

  /**
   * Navega a la pantalla de edición con los datos de la cita seleccionada
   
   */
  const handleEditar = (cita) => {
    navigation.navigate("EditarCita", { cita });
  };

  /**
   * Navega a la pantalla de creación de nueva cita
   */
  const handleCrear = () => {
    navigation.navigate("EditarCita");
  };

  /**
   * Navega a la pantalla de detalles de la cita
  
   */
  const handleView = (cita) => {
    navigation.navigate("DetalleCita", { cita });
  };

  /**
   * Maneja la eliminación de una cita con confirmación
   
   */
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
                // Filtra la cita eliminada del estado local
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

  // Muestra estado de carga mientras se obtienen los datos
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

      {/* Renderizado condicional según existencia de citas */}
      {citas.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={citas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardComponent
              cita={item}
              onEdit={() => handleEditar(item)} // Prop para editar
              onDelete={() => handleEliminar(item.id)} // Prop para eliminar
              onView={() => handleView(item)} // Prop para ver detalles
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No hay citas registradas</Text>
        </View>
      )}

      {/* Botón flotante para crear nueva cita */}
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
