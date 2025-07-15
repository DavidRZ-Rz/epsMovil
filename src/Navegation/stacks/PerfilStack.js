import {createStackNavigator} from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfil/Perfil";
// Componente de navegación para la pila de perfil
// Permite navegar a la pantalla de perfil del usuario
const Stack = createStackNavigator();

export default function PerfilStack() {
    return (
        <Stack.Navigator>
            {/* Pantalla de perfil del usuario */}
            {/* Permite ver y editar la información del perfil */}
            <Stack.Screen 
                name="Perfil" 
                component={Perfil} 
                 options={{ headerShown: false }} 
            />

        </Stack.Navigator>
    )
}