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
import ConsultorioComponent from "../../Components/ConsultorioComponent";
import { useNavigation } from "@react-navigation/native";
import {
  ListarConsultorio,
  eliminarConsultorio,
} from "../../src/Services/ConsultorioService";

export default function ListarConsultorioScreen() {
  const [consultorio, setConsultorio] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleConsultorio = async () => {
    setLoading(true);
    try {
      const result = await ListarConsultorio();
      if (result.success) {
        setConsultorio(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "no se puedieron obtener los consultorios"
        );
      }
    } catch {
      Alert.alert("Error", "No se pudo obtener los consultorios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleConsultorio);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (consultorio) => {
    navigation.navigate("EditarConsultorio", { consultorio });
  };

  const handleCrear = () => {
    navigation.navigate("EditarConsultorio");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar Consultorio",
      "¿Estás seguro de eliminar este consultorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarConsultorio(id);
              if (result.success) {
                // setPacientes(pacientes.filter((p) => p.id !== id));
                // otra funcion para listar
                handleConsultorio();
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Consultorios</Text>

      {consultorio.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={consultorio}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ConsultorioComponent
              consultorio={item}
              onDelete={() => handleEliminar(item.id)}
              onEdit={() => handleEditar(item)}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No hay consultorios ingresados</Text>
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
