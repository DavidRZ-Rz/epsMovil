import{ View, Text, TextInput, Button, StyleSheet } from 'react-native';


export default function NuevoPaciente() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo Paciente</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
            />
            <TextInput
                style={styles.input}
                placeholder="Documento de Identidad"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Número de Teléfono"
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
            />
            <Button title="Guardar Paciente" onPress={() => alert('Paciente guardado')} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});