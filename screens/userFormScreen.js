// screens/UserFormScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { addUsuario, updateUsuario } from "../db";

export default function UserFormScreen({ route, navigation }) {
  const usuario = route.params?.usuario;
  const [nombre, setNombre] = useState(usuario ? usuario.nombre : "");
  const [username, setUsername] = useState(usuario ? usuario.username : "");
  const [password, setPassword] = useState(usuario ? usuario.password : "");
  const [rol, setRol] = useState(usuario ? usuario.rol : "user");

  const guardar = async () => {
    if (!nombre || !username || !password) {
      Alert.alert("Error", "Completá todos los campos");
      return;
    }
    if (usuario) {
      await updateUsuario(usuario.id, nombre, username, password, rol);
      Alert.alert("Actualizado", "Usuario modificado");
    } else {
      await addUsuario(nombre, username, password, rol);
      Alert.alert("Agregado", "Usuario creado");
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{usuario ? "Editar usuario" : "Nuevo usuario"}</Text>
      <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
      <TextInput placeholder="Usuario" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="Rol (admin/user)" style={styles.input} value={rol} onChangeText={setRol} />
      <Button title="Guardar" onPress={guardar} color="#0066cc" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
});
