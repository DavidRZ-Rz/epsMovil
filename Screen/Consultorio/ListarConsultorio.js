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
import { Ionicons } from "@expo/vector-icons"; // Íconos de la librería Expo
import ConsultorioComponent from "../../Components/ConsultorioComponent"; // Componente personalizado para mostrar cada consultorio
import { useNavigation } from "@react-navigation/native"; // Hook para navegar entre pantallas
import {
  ListarConsultorio,
  eliminarConsultorio,
} from "../../src/Services/ConsultorioService"; // Funciones para listar y eliminar consultorios desde la API

// Componente principal para listar, crear, editar y eliminar consultorios
export default function ListarConsultorioScreen() {
  const [consultorio, setConsultorio] = useState([]); // Lista de consultorios
  const [loading, setLoading] = useState(true);       // Estado de carga
  const navigation = useNavigation();                 // Hook de navegación

  // Función para obtener los consultorios desde la API
  const handleConsultorio = async () => {
    setLoading(true);
    try {
      const result = await ListarConsultorio(); // Llama al servicio para listar consultorios
      if (result.success) {
        setConsultorio(result.data); // Guarda los consultorios en el estado
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron obtener los consultorios"
        );
      }
    } catch {
      Alert.alert("Error", "No se pudo obtener los consultorios");
    } finally {
      setLoading(false);
    }
  };

  // useEffect: se ejecuta cada vez que la pantalla vuelve a estar en foco
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleConsultorio);
    return unsubscribe; // Limpia el listener al salir de la pantalla
  }, [navigation]);

  // Función para redirigir a la pantalla de edición con los datos del consultorio
  const handleEditar = (consultorio) => {
    navigation.navigate("EditarConsultorio", { consultorio });
  };

  // Función para redirigir a la pantalla de creación de un nuevo consultorio
  const handleCrear = () => {
    navigation.navigate("EditarConsultorio");
  };

  // Función para eliminar un consultorio
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar Consultorio",
      "¿Estás seguro de eliminar este consultorio?",
      [
        { text: "Cancelar", style: "cancel" }, // Opción para cancelar
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarConsultorio(id); // Llama al servicio de eliminación
              if (result.success) {
                handleConsultorio(); // Refresca la lista
              } else {
                Alert.alert(
                  "Error",
                  result.message || "No se pudo eliminar el consultorio"
                );
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el consultorio");
            }
          },
        },
      ]
    );
  };

  // Si los datos están cargando, muestra un spinner
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Título principal */}
      <Text style={styles.title}>Listado de Consultorios</Text>

      {/* Lista de consultorios */}
      {consultorio.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={consultorio} // Datos de los consultorios
          keyExtractor={(item) => item.id.toString()} // Clave única por consultorio
          renderItem={({ item }) => (
            <ConsultorioComponent
              consultorio={item}
              onDelete={() => handleEliminar(item.id)} // Eliminar consultorio
              onEdit={() => handleEditar(item)}        // Editar consultorio
            />
          )}
        />
      ) : (
        // Si no hay consultorios
        <View style={styles.emptyContainer}>
          <Text>No hay consultorios ingresados</Text>
        </View>
      )}

      {/* Botón flotante para crear nuevo consultorio */}
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
