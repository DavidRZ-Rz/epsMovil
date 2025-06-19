import { View, Text , Button } from "react-native";

export default function ListarDoctorScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Listar Doctores</Text>
      <Button
        title="ver Detalle Doctor"
        onPress={() => navigation.navigate("DetalleDoctor")}
      />
      <Button
        title="Editar Doctor"
        onPress={() => navigation.navigate("EditarDoctor")}
      />
      <Button
        title="Nuevo Doctor"
        onPress={() => navigation.navigate("FormularioDoctor")}
      />
    </View>
  );
}
