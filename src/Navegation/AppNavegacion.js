import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal";

export default function AppNavegacion() {
    const Autenticado = true; // Cambia esto según el estado de autenticación del usuario

    
    return (
        // NavigationContainer es el contenedor principal de navegación
        // que debe envolver toda la aplicación de navegación.
        <NavigationContainer>
            {Autenticado ? <NavegacionPrincipal /> : <AuthNavigation />}
        </NavigationContainer>
    );

}