// screens/AdminScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsuarios, deleteUsuario } from "../db";

export default function AdminScreen({ navigation, user, setUserSession }) {
  const [usuarios, setUsuarios] = useState([]);

  const cargar = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", cargar);
    return unsub;
  }, [navigation]);

  const eliminar = async (id) => {
    if (id === user.id) {
      Alert.alert("Error", "No podés eliminarte a vos mismo.");
      return;
    }
    Alert.alert("Confirmar", "¿Eliminar usuario?", [
      { text: "Cancelar" },
      { text: "Eliminar", onPress: async () => {
          await deleteUsuario(id);
          cargar();
        }
      }
    ]);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUserSession(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👑 Administración de Usuarios</Text>
      <Button title="Agregar Usuario" onPress={() => navigation.navigate("UserForm")} />
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.nombre} ({item.rol})</Text>
            <Button title="Editar" onPress={() => navigation.navigate("UserForm", { usuario: item })} />
            <Button title="Eliminar" color="#e63946" onPress={() => eliminar(item.id)} />
          </View>
        )}
      />
      <Button title="Cerrar sesión" onPress={logout} color="#444" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  userItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
});
