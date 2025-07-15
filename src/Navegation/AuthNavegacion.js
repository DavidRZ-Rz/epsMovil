import {createStackNavigator} from '@react-navigation/stack';
import PantallaLogin from "../../Screen/Auth/login";
import PantallaRegistro from "../../Screen/Auth/Registro";

// Componente de navegación para la autenticación
// Permite navegar entre las pantallas de inicio de sesión y registro
const Stack = createStackNavigator();
export default function AuthNavigation() {
    return (
        <Stack.Navigator initialRouteName='login'>
            {/* Pantalla de inicio de sesión */}
            <Stack.Screen
                name="login"
                component={PantallaLogin}
                options={{ title: 'Iniciar Sesión', headerShown: false }}
            />
            {/* Pantalla de registro */}
            {/* Permite a los usuarios crear una nueva cuenta */}
            <Stack.Screen
                name="Registro"
                component={PantallaRegistro}
                options={{ title: 'Registrarse', headerShown: false }}
            />
        </Stack.Navigator>
    );
}