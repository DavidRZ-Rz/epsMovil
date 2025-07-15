import { createStackNavigator } from "@react-navigation/stack";
import CitaStack from "./CitaStack";
import PacienteStack from "./PacienteStack";
import DoctorStack from "./DoctorStack";
import EspecialidadStack from "./EspecialidadStack";
import ConsultorioStack from "./ConsultorioStack";
import { MenuScreen } from "../../../Screen/Menu/Menu";
import { Button } from "react-native";
// Importar los stacks de las diferentes secciones del menú
// Permite navegar entre las pantallas de gestión de pacientes, citas, doctores, especialidades y consultorios
const Stack = createStackNavigator();

export default function MenuInicial() {
  return (
    
    <Stack.Navigator initialRouteName="MenuPrincipal">
      {/* Pantalla principal del menú */}
      {/* Permite acceder a las diferentes funcionalidades del sistema EPS */}
      {/* Oculta el header en esta pantalla para un diseño más limpio */}
      <Stack.Screen
        name="MenuPrincipal"
        component={MenuScreen}
        options={{
          // Oculta el header en esta pantalla
          headerShown: false,
        }}
      />
      {/* Definición de las diferentes pilas de navegación para cada sección del menú */}
      {/* Cada pila permite navegar entre las pantallas específicas de cada sección */}
      <Stack.Screen
        name="PacienteStack"
        component={PacienteStack}
        options={{ headerShown: false }} // Oculta el header en la pantalla de PacienteStack
      />
      <Stack.Screen
        name="CitaStack"
        component={CitaStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorStack"
        component={DoctorStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EspecialidadStack"
        component={EspecialidadStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConsultorioStack"
        component={ConsultorioStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
