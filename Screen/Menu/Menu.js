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
      {/* Título principal de la pantalla */}
      <Text style={styles.title}>Bienvenido a EPS</Text>
      
      {/* Contenedor grid para los botones de navegación */}
      <View style={styles.gridContainer}>
        {/* Botón para navegar a Gestión de Pacientes */}
        <TouchableOpacity
          style={[styles.button, styles.pacientesButton]}
          onPress={() => navigation.navigate("PacienteStack")}
        >
          <AntDesign name="user" size={50} color="white" />
          <Text style={styles.buttonText}>Gestión de Pacientes</Text>
        </TouchableOpacity>

        {/* Botón para navegar a Gestión de Citas */}
        <TouchableOpacity
          style={[styles.button, styles.citasButton]}
          onPress={() => navigation.navigate("CitaStack")}
        >
          <FontAwesome5 name="hospital-user" size={50} color={"white"} />
          <Text style={styles.buttonText}>Gestión de Citas</Text>
        </TouchableOpacity>

        {/* Botón para navegar a Gestión de Doctores */}
        <TouchableOpacity
          style={[styles.button, styles.doctorButton]}
          onPress={() => navigation.navigate("DoctorStack")}
        >
          <FontAwesome6 name="user-doctor" size={50} color="white" />
          <Text style={styles.buttonText}>Gestión de Doctores</Text>
        </TouchableOpacity>

        {/* Botón para navegar a Gestión de Especialidades */}
        <TouchableOpacity
          style={[styles.button, styles.especialidadButton]}
          onPress={() => navigation.navigate("EspecialidadStack")}
        >
          <FontAwesome5 name="university" size={50} color={"white"} />
          <Text style={styles.buttonText}>Gestión de Especialidades</Text>
        </TouchableOpacity>

        {/* Botón para navegar a Gestión de Consultorios */}
        <TouchableOpacity
          style={[styles.button, styles.consultorioButton]}
          onPress={() => navigation.navigate("ConsultorioStack")}
        >
          <AntDesign name="customerservice" size={50} color={"white"} />
          <Text style={styles.buttonText}>Gestión de Consultorios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",

    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#3498db",
  },
  button: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  pacientesButton: {
    backgroundColor: "black",
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
    backgroundColor: "#3498db",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 10,
    padding: 20,
  },
});
