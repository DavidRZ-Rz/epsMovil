import { View, Text, Button } from "react-native";

export default function ListarConsultorioScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Listar Consultorios</Text>
      {/* Aquí puedes agregar más detalles sobre los consultorios */}
      <Button
        title="ver Detalle Cosnultorio"
        onPress={() => navigation.navigate("DetalleConsultorio")}
      />
      <Button
        title="Editar Consultorio"
        onPress={() => navigation.navigate("EditarConsultorio")}
      />
      <Button
        title="Nuevo Consultorio"
        onPress={() => navigation.navigate("FormularioConsultorio")}
      />
    </View>
  );
}
