import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function EditarEspecialidadScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Especialidad</Text>
      <TextInput style={styles.input} placeholder="editar la Especialidad" />
      <Button title="Guardar" onPress={() => alert("Edicion de la Especialidad guardada")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});