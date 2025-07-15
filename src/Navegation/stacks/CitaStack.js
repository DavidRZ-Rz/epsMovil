import { createStackNavigator } from "@react-navigation/stack";
import ListarCita from "../../../Screen/Cita/ListarCita";
import DetalleCita from "../../../Screen/Cita/DetalleCita";
import EditarCita from "../../../Screen/Cita/EditarCita";

// Componente de navegación para la pila de citas
// Permite navegar entre las pantallas de listar, detalle y editar citas


const Stack = createStackNavigator();
export default function CitaStack() {
  return (
    <Stack.Navigator>
      {/* Pantalla inicial para listar citas */}
      <Stack.Screen
        name="ListarCita"
        component={ListarCita}
        options={{ title: "Lista de Citas" }}
      />
      {/* Pantalla para ver detalles de una cita específica */}
      {/* Permite ver información detallada de una cita seleccionada */}
      <Stack.Screen
        name="DetalleCita"
        component={DetalleCita}
        options={{ title: "Detalle de la Cita" }}
      />
      {/* Pantalla para editar una cita existente */}
      {/* Permite modificar los detalles de una cita seleccionada */}
      <Stack.Screen
        name="EditarCita"
        component={EditarCita}
        options={{ title: "Editar Cita" }}
      />
      
    </Stack.Navigator>
  );
}
