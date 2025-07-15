// MenuScreen.js
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Entypo,
  FontAwesome6,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

/**
 * Pantalla principal de menú con acceso a las diferentes funcionalidades del sistema EPS
 * Permite navegar a las pantallas de gestión de pacientes, citas, doctores, especialidades y consultorios.
 */
export function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Encabezado con logo y título */}
      <View style={styles.header}>
        <AntDesign name="medicinebox" size={36} color="#2c3e50" />
        <Text style={styles.title}>Sistema EPS</Text>
        <Text style={styles.subtitle}>Gestión Integral de Salud</Text>
      </View>
      
      {/* Contenedor grid para los botones de navegación */}
      <View style={styles.gridContainer}>
        {/* Botón para navegar a Gestión de Pacientes */}
        <TouchableOpacity
          style={[styles.button, styles.pacientesButton]}
          onPress={() => navigation.navigate("PacienteStack")}
        >
          <View style={styles.iconContainer}>
            <AntDesign name="user" size={32} color="white" />
          </View>
          <Text style={styles.buttonText}>Pacientes</Text>
          <Text style={styles.buttonSubtext}>Gestión de registros</Text>
        </TouchableOpacity>

        {/* Botón para navegar a Gestión de Citas */}
        <TouchableOpacity
          style={[styles.button, styles.citasButton]}
          onPress={() => navigation.navigate("CitaStack")}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5 name="hospital-user" size={32} color="white" />
          </View>
          <Text style={styles.buttonText}>Citas</Text>
          <Text style={styles.buttonSubtext}>Agenda y control</Text>
        </TouchableOpacity>

        {/* Botón para navegar a Gestión de Doctores */}
        <TouchableOpacity
          style={[styles.button, styles.doctorButton]}
          onPress={() => navigation.navigate("DoctorStack")}
        >
          <View style={styles.iconContainer}>
            <FontAwesome6 name="user-doctor" size={32} color="white" />
          </View>
          <Text style={styles.buttonText}>Doctores</Text>
          <Text style={styles.buttonSubtext}>Personal médico</Text>
        </TouchableOpacity>

        {/* Botón para navegar a Gestión de Especialidades */}
        <TouchableOpacity
          style={[styles.button, styles.especialidadButton]}
          onPress={() => navigation.navigate("EspecialidadStack")}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5 name="university" size={32} color="white" />
          </View>
          <Text style={styles.buttonText}>Especialidades</Text>
          <Text style={styles.buttonSubtext}>Áreas médicas</Text>
        </TouchableOpacity>

        {/* Botón para navegar a Gestión de Consultorios */}
        <TouchableOpacity
          style={[styles.button, styles.consultorioButton]}
          onPress={() => navigation.navigate("ConsultorioStack")}
        >
          <View style={styles.iconContainer}>
            <AntDesign name="customerservice" size={32} color="white" />
          </View>
          <Text style={styles.buttonText}>Consultorios</Text>
          <Text style={styles.buttonSubtext}>Espacios físicos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: "#f8f9fa",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginTop: 12,
    color: "#2c3e50",
    fontFamily: "sans-serif-medium",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginTop: 4,
  },
  button: {
    width: "46%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 7,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  buttonSubtext: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
    textAlign: "center",
  },
  pacientesButton: {
    backgroundColor: "#3498db",
  },
  citasButton: {
    backgroundColor: "#2ecc71",
  },
  doctorButton: {
    backgroundColor: "#e74c3c",
  },
  especialidadButton: {
    backgroundColor: "#f39c12",
  },
  consultorioButton: {
    backgroundColor: "#9b59b6",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});