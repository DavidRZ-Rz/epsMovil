import {createStackNavigator} from "@react-navigation/stack";
import ListarDoctor from "../../../Screen/Doctor/ListarDoctor";
import DetalleDoctor from "../../../Screen/Doctor/DetalleDoctor";
import EditarDoctor from "../../../Screen/Doctor/EditarDoctor";
import NuevoDoctor from "../../../Screen/Doctor/NuevoDoctor";

const Stack = createStackNavigator();
export default function DoctorStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ListarDoctor" 
                component={ListarDoctor} 
                options={{ title: "Lista de Doctores" }} 
            />
            <Stack.Screen 
                name="DetalleDoctor" 
                component={DetalleDoctor} 
                options={{ title: "Detalle del Doctor" }} 
            />
            <Stack.Screen 
                name="EditarDoctor" 
                component={EditarDoctor} 
                options={{ title: "Editar Doctor" }} 
            />
            <Stack.Screen 
               name="NuevoDoctor"
               component={NuevoDoctor}
               options={{ title: "Nuevo Doctor" }}
            />
        </Stack.Navigator>
    );
}