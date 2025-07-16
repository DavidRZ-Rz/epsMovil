import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome, Fontisto } from "react-native-vector-icons";
import Card from "../../Components/DetalleComponent"; // Componente personalizado para mostrar información en una tarjeta
import { buscarEspecialidad } from "../../src/Services/EspecialidadService"; // Servicio para obtener la especialidad del doctor

// Componente principal de la pantalla que muestra el detalle del doctor
export default function DetalleDoctorScreen({ route }) {
  // Se extrae el objeto doctor de los parámetros de navegación
  const { doctor } = route.params;

  // Estado local para almacenar el nombre de la especialidad del doctor
  const [especialidadNombre, setEspecialidadNombre] = useState("");

  // useEffect se ejecuta al montar el componente o cuando cambia el idEspecialidad
  useEffect(() => {
    // Función asíncrona para buscar el nombre de la especialidad del doctor
    const buscarEspecialidades = async () => {
      try {
        // Llamada al servicio para obtener la especialidad
        const resultado = await buscarEspecialidad(doctor.idEspecialidad);
        if (resultado.success) {
          // Si la llamada fue exitosa, se actualiza el nombre de la especialidad
          setEspecialidadNombre(resultado.data.nombre);
        } else {
          // Si la respuesta no fue exitosa, se muestra un mensaje de error
          setEspecialidadNombre("Especialidad no encontrada");
          console.error(resultado.message);
        }
      } catch (error) {
        // Manejo de errores en caso de fallo en la llamada al servicio
        setEspecialidadNombre("Error al cargar");
        console.error("Error al cargar especialidad:", error);
      }
    };

    // Se ejecuta la función para buscar la especialidad
    buscarEspecialidades();
  }, [doctor.idEspecialidad]); // Dependencia: se ejecuta si cambia el ID de especialidad

  return (
    <View style={styles.container}>
      {/* Encabezado de la pantalla */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Detalle del Doctor</Text>
        <View style={styles.divider} />
      </View>

      {/* Contenedor de la tarjeta con la información del doctor */}
      <Card>
        {/* Fila: Nombre del doctor */}
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <FontAwesome name="user" size={20} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.valor}>{doctor.nombre}</Text>
          </View>
        </View>

        {/* Fila: Apellido del doctor */}
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <FontAwesome name="user" size={20} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Apellido</Text>
            <Text style={styles.valor}>{doctor.apellido}</Text>
          </View>
        </View>

        {/* Fila: Especialidad del doctor */}
        <View style={[styles.item, { borderBottomWidth: 0 }]}>
          <View style={styles.iconContainer}>
            <FontAwesome name="university" size={20} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Especialidad</Text>
            <Text style={styles.valor}>{especialidadNombre}</Text>
          </View>
        </View>

        {/* Fila: Consultorio asignado */}
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

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el contenido crezca dentro del contenedor
    padding: 20,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20, // Espaciado inferior
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
    flexDirection: "row", // Alineación horizontal
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F5",
  },
  iconContainer: {
    width: 40, // Ancho reservado para el ícono
    alignItems: "center",
  },
  textContainer: {
    flex: 1, // Ocupa el espacio restante en la fila
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
