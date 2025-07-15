import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome, Fontisto } from "react-native-vector-icons";
import Card from "../../Components/DetalleComponent";

export default function DetalleDoctorScreen({ route }) {
  const { doctor } = route.params;
  

  const handleEditar = () => {
    console.log("Editar doctores", doctor);
  };

  const handleEliminar = () => {
    console.log("Eliminar doctores", doctor);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Detalle del Paciente</Text>
        <View style={styles.divider} />
      </View>

      <Card>
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <FontAwesome name="user" size={20} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.valor}>{doctor.nombre}</Text>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <FontAwesome name="user" size={20} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Apellido</Text>
            <Text style={styles.valor}>{doctor.apellido}</Text>
          </View>
        </View>

        <View style={[styles.item, { borderBottomWidth: 0 }]}>
          <View style={styles.iconContainer}>
            <FontAwesome name="university" size={20} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Especialidad</Text>
            <Text style={styles.valor}>{doctor.idEspecialidad}</Text>
          </View>
        </View>
        <View style={[styles.item, { borderBottomWidth: 0 }]}>
          <View style={styles.iconContainer}>
            <FontAwesome name="stethoscope" size={20} color="#4A90E2" />{" "}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Consultorio</Text>
            <Text style={styles.valor}>{doctor.idConsultorio}</Text>
          </View>
        </View>
      </Card>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: "#E1E5EA",
    marginHorizontal: 40,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F5",
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7F8C8D",
    marginBottom: 4,
  },
  valor: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "48%",
  },
 
});
