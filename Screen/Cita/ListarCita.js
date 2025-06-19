import { View, Text, Button } from "react-native";

export default function ListarCitaScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Listar Citas</Text>
      {/* Aquí puedes agregar más detalles sobre las citas */}
      <Button
        title="ver Detalle Cita"
        onPress={() => navigation.navigate("DetalleCita")}
      />
      <Button
        title="Editar Cita"
        onPress={() => navigation.navigate("EditarCita")}
      />
      <Button
        title="Nueva Cita"
        onPress={() => navigation.navigate("FormularioCita")}
      />
    </View>
  );
}
