import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../db";

export default function LoginScreen({ setUserSession }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Ingresá usuario y contraseña");
      return;
    }
    const user = await loginUser(username, password);
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserSession(user);
    } else {
      Alert.alert("Error", "Credenciales inválidas");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 TP3 - Login</Text>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} color="#0066cc" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f0f0f0" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15,
    backgroundColor: "#fff",
  },
});
