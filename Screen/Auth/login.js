import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import BottonComponent from '../../Components/BotonComponent';


export default function LoginScreen({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <BottonComponent
                title={"Ingresar"}
                onPress={() => {
                    // Aquí puedes agregar la lógica para iniciar sesión
                    console.log("Iniciar sesión con:", email, password);
                }}
            />
            <BottonComponent
                title={"Registrarse"}
                onPress={() => navigation.navigate("Registro")}
                style={styles.registerButton}/>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    registerButton: {
        backgroundColor: '#28a745',
    },
});