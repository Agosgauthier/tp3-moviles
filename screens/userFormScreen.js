import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { addUsuario, updateUsuario } from "../db";

export default function UserFormScreen({ navigation, route }) {
  const usuario = route.params?.usuario; 

  const [nombre, setNombre] = useState(usuario ? usuario.nombre.split(" ")[0] : "");
  const [apellido, setApellido] = useState(usuario ? usuario.nombre.split(" ")[1] || "" : "");
  const [username, setUsername] = useState(usuario ? usuario.username : "");
  const [password, setPassword] = useState(usuario ? usuario.password : "");
  const [rol, setRol] = useState(usuario ? usuario.rol : "user");

  const handleGuardar = async () => {
    if (!nombre || !apellido || !username || !password) {
      Alert.alert("Error", "Completá todos los campos");
      return;
    }

    const nombreCompleto = `${nombre} ${apellido}`;

    if (usuario) {
  await updateUsuario(usuario.id, nombreCompleto, username, password, rol.toLowerCase());
  Alert.alert("Éxito", "Usuario actualizado correctamente");
} else {
  await addUsuario(nombreCompleto, username, password, rol.toLowerCase());
  Alert.alert("Éxito", "Usuario agregado correctamente");
}

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {usuario ? "✏️ Editar usuario" : "🧍‍♂️ Nuevo usuario"}
      </Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej: Juan" />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput style={styles.input} value={apellido} onChangeText={setApellido} placeholder="Ej: Pérez" />

      <Text style={styles.label}>Usuario:</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Ej: juanperez" />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Ej: juan123" />

      <Text style={styles.label}>Rol:</Text>
      <TextInput style={styles.input} value={rol} onChangeText={setRol} placeholder="user / admin" />

      <Button title="Guardar" onPress={handleGuardar} color="#0066cc" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  label: { fontWeight: "bold", marginTop: 10, color: "#333" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
});
