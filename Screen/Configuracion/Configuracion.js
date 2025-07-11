import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function ConfiguracionScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración</Text>
            
            {/* Opción de notificaciones */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Notificaciones</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
            </View>
            
            {/* Opción de modo oscuro */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Modo oscuro</Text>
                <Switch
                    value={darkModeEnabled}
                    onValueChange={() => setDarkModeEnabled(!darkModeEnabled)}
                />
            </View>
            
            {/* Opción de cuenta */}
            <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Cuenta</Text>
                <Text style={styles.arrow}>{'>'}</Text>
            </TouchableOpacity>
            
            {/* Opción de ayuda */}
            <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Ayuda y soporte</Text>
                <Text style={styles.arrow}>{'>'}</Text>
            </TouchableOpacity>
            
            {/* Opción de cerrar sesión */}
            <TouchableOpacity style={[styles.settingItem, styles.logoutButton]}>
                <Text style={[styles.settingText, styles.logoutText]}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    settingText: {
        fontSize: 16,
    },
    arrow: {
        fontSize: 18,
        color: '#999',
    },
    logoutButton: {
        marginTop: 30,
        justifyContent: 'center',
        borderBottomWidth: 0,
    },
    logoutText: {
        color: 'red',
        textAlign: 'center',
    },
});