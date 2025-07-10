import { createStackNavigator } from "@react-navigation/stack";
import ListarConsultorio from "../../../Screen/Consultorio/ListarConsultorio";
import EditarConsultorio from "../../../Screen/Consultorio/EditarConsultorio";

const Stack = createStackNavigator();

export default function ConsultorioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarConsultorio"
        component={ListarConsultorio}
        options={{ title: "Lista de Consultorios" }}
      />

      <Stack.Screen
        name="EditarConsultorio"
        component={EditarConsultorio}
        options={{ title: "Editar Consultorio" }}
      />
    </Stack.Navigator>
  );
}
