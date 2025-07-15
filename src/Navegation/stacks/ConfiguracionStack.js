import {createStackNavigator} from "@react-navigation/stack";
import Configuracion from "../../../Screen/Configuracion/Configuracion";
// Componente de navegación para la pila de configuración
const Stack = createStackNavigator();

export default function PerfilStack() {
    return (
        <Stack.Navigator>
            {/* Pantalla de configuración principal */}
            {/* Permite acceder a las opciones de configuración del usuario */}
            <Stack.Screen 
                name="Configuracion" 
                component={Configuracion} 
                options={{ headerShown: false }} 
            />

        </Stack.Navigator>
    )
}