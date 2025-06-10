import {createStackNavigator} from "@react-navigation/stack";
import ListarCita from "../../../Screen/Cita/ListarCita";
import DetalleCita from "../../../Screen/Cita/DetalleCita";  
import EditarCita from "../../../Screen/Cita/EditarCita";

const Stack = createStackNavigator();
export default function CitaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ListarCita" 
                component={ListarCita} 
                options={{ title: "Lista de Citas" }} 
            />
            <Stack.Screen 
                name="DetalleCita" 
                component={DetalleCita} 
                options={{ title: "Detalle de la Cita" }} 
            />
            <Stack.Screen 
                name="EditarCita"
                component={EditarCita}
                options={{ title: "Editar Cita" }}
            />
        </Stack.Navigator>
    );
}