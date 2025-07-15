import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";
import MenuInicial from "./stacks/MenuInicial";
import PerfilStack from "./stacks/PerfilStack";
import ConfiguracionStack from "./stacks/ConfiguracionStack";


// Componente principal de navegación de la aplicación
// Utiliza un Tab Navigator para gestionar las pestañas de navegación
const Tab = createBottomTabNavigator();
// Permite a los usuarios navegar entre las diferentes secciones de la aplicación
// Incluye pestañas para el menú principal, perfil y configuración
export default function NavegacionPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1976D2", // Color cuando esta activo
        tabBarInactiveTintColor: "#757575", // Color cuando no esta activo
        tabBarStyle: {
          backgroundColor: "#fff",
        }, // Color de fondo de la barra de pestañas
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={MenuInicial}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          headerShown: false, // Oculta el header en esta pantalla
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={ConfiguracionStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
