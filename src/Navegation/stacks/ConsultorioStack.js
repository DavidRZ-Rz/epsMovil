import {createStackNavigator} from "@react-navigation/stack";
import ListarConsultorio from "../../../Screen/Consultorio/ListarConsultorio";
import DetalleConsultorio from "../../../Screen/Consultorio/DetalleConsultorio";
import EditarConsultorio from "../../../Screen/Consultorio/EditarConsultorio";
import NuevoConsultorio from "../../../Screen/Consultorio/NuevoConsultorio";

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
            <Stack.Screen 
                name="NuevoConsultorio"
                component={NuevoConsultorio}
                options={{ title: "Nuevo Consultorio" }}
            />
        </Stack.Navigator>
    );
}