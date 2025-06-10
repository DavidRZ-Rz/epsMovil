import PacientesStack from "./stacks/PacienteStack";
import EspecialidadStack from "./stacks/EspecialidadStack";
import DoctorStack from "./stacks/DoctorStack";
import ConsultorioStack from "./stacks/ConsultorioStack";
import CitaStack from "./stacks/CitaStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

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
        name="Paciente"
        component={PacientesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Especialidad"
        component={EspecialidadStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="university" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Doctor"
        component={DoctorStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="stethoscope"size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Consultorio"
        component={ConsultorioStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="customerservice" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cita"
        component={CitaStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hospital-user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}