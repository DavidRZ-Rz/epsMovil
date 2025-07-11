import {createStackNavigator} from '@react-navigation/stack';
import PantallaLogin from "../../Screen/Auth/login";
import PantallaRegistro from "../../Screen/Auth/Registro";

const Stack = createStackNavigator();
export default function AuthNavigation() {
    return (
        <Stack.Navigator initialRouteName='login'>
            <Stack.Screen
                name="login"
                component={PantallaLogin}
                options={{ title: 'Iniciar Sesión', headerShown: false }}
            />
            <Stack.Screen
                name="Registro"
                component={PantallaRegistro}
                options={{ title: 'Registrarse', headerShown: false }}
            />
        </Stack.Navigator>
    );
}