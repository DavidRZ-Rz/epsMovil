import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Card from "../../Components/DetalleComponent";


export default function DetalleCita({ route, navigation }) {
  // Extrae los datos de la cita de los parámetros de navegación
  const { cita } = route.params;

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Detalle de la Cita</Text>
      
      {/* Divisor visual debajo del título */}
      <View style={styles.divider} />

      {/* Componente Card que envuelve los detalles */}
      <Card>
        {/* Item/Fila para la fecha de la cita */}
        <View style={styles.item}>
          <FontAwesome name="calendar" size={20} color="#4A90E2" />
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{cita.fecha}</Text>
        </View>

        {/* Item/Fila para la hora de la cita */}
        <View style={styles.item}>
          <FontAwesome name="clock-o" size={20} color="#4A90E2" />
          <Text style={styles.label}>Hora:</Text>
          <Text style={styles.value}>{cita.hora}</Text>
        </View>
        
        {/* Item/Fila para el paciente de la cita */}
        <View style={styles.item}>
          <FontAwesome name="user" size={20} color="#4A90E2" />
          <Text style={styles.label}>Paciente:</Text>
          <Text style={styles.value}>{cita.idPaciente}</Text>
        </View>
        
        {/* Item/Fila para el doctor de la cita */}
        <View style={styles.item}>
          <FontAwesome name="user" size={20} color="#4A90E2" />
          <Text style={styles.label}>Doctor:</Text>
          <Text style={styles.value}>{cita.idDoctor}</Text>
        </View>
      </Card>
    </View>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flexGrow: 1,        
    padding: 20,       
    backgroundColor: "#F5F7FA",  
    justifyContent: "center",  
  },
  
  // Estilo del título principal
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",  
    textAlign: "center",
    marginBottom: 10,
  },
  
  // Divisor visual
  divider: {
    height: 2,
    backgroundColor: "#E1E5EA",  
    marginVertical: 15,          
  },
  
  // Estilo para cada fila de información
  item: {
    flexDirection: "row",  
    alignItems: "center",  
    marginBottom: 15,      
  },
  
  // Estilo para las etiquetas (Fecha:, Hora:, etc.)
  label: {
    fontSize: 16,
    fontWeight: "600",    
    color: "#2C3E50",     
    marginLeft: 10,        
  },
  
  // Estilo para los valores de los campos
  value: {
    fontSize: 16,
    color: "#555",         
    marginLeft: 5,         
  },
  

});