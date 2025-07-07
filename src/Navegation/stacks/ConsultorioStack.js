import {createStackNavigator} from "@react-navigation/stack";
import ListarConsultorio from "../../../Screen/Consultorio/ListarConsultorio";
import DetalleConsultorio from "../../../Screen/Consultorio/DetalleConsultorio";
import EditarConsultorio from "../../../Screen/Consultorio/EditarConsultorio";
3
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
                name="DetalleConsultorio" 
                component={DetalleConsultorio} 
                options={{ title: "Detalle del Consultorio" }} 
            />
            <Stack.Screen 
                name="EditarConsultorio" 
                component={EditarConsultorio} 
                options={{ title: "Editar Consultorio" }} 
            />
            
        </Stack.Navigator>
    );
}