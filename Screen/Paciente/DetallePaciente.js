import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons, FontAwesome, Fontisto } from "react-native-vector-icons";
import Card from "../../Components/DetalleComponent"; // Asegúrate de que la ruta sea correcta

export default function DetallePacienteScreen() {
  const paciente = {
    nombre: "Juan Pérez",
    apellido: "Perez",
    documento: "123456789",
    telefono: "+52 123 456 7890",
    email: "juanpres@gmail.com",
  };

  const handleEditar = () => {
    console.log("Editar paciente");
  };

  const handleEliminar = () => {
    console.log("Eliminar paciente");
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
              <Text style={styles.valor}>{paciente.nombre}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <FontAwesome name="user" size={20} color="#4A90E2" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Apellido</Text>
              <Text style={styles.valor}>{paciente.apellido}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <FontAwesome name="credit-card" size={20} color="#4A90E2" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Documento</Text>
              <Text style={styles.valor}>{paciente.documento}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <FontAwesome name="phone" size={20} color="#4A90E2" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Teléfono</Text>
              <Text style={styles.valor}>{paciente.telefono}</Text>
            </View>
          </View>

          <View style={[styles.item, { borderBottomWidth: 0 }]}>
            <View style={styles.iconContainer}>
              <Fontisto name="email" size={20} color="#4A90E2" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <Text style={styles.valor}>{paciente.email}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonEdit]}
            onPress={handleEditar}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonDelete]}
            onPress={handleEliminar}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
   
  );
}

// Mantenemos los mismos estilos que antes, solo quitamos el estilo de card
const styles = StyleSheet.create({
  container: {
  flexGrow: 1,
  padding: 20,
  backgroundColor: "#F5F7FA",
  justifyContent: 'center',
  alignItems: 'center',
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
  buttonEdit: {
    backgroundColor: "#4CAF50",
  },
  buttonDelete: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});
