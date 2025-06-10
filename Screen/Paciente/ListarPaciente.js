import { View, Text, Button } from 'react-native';


export default function ListarPacienteScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Pantalla de Listar Pacientes</Text>
            <Button
                title='ver Detalle Paciente'
                onPress={() => navigation.navigate("DetallePaciente")}
            />
            <Button
                title='Editar Paciente'
                onPress={() => navigation.navigate("EditarPaciente")}
            />
            <Button
                title='Nuevo Paciente'
                onPress={() => navigation.navigate('FormularioPaciente')}
            />
        </View>
    );
}