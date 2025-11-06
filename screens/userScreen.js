// screens/UserScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserScreen({ setUserSession }) {
  const [movies, setMovies] = useState([]);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUserSession(null);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "TU_API_KEY_DE_TMDB"; // 🔑 reemplazala por tu key real
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`);
      const data = await res.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Películas populares</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
              style={styles.poster}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 22, textAlign: "center", marginVertical: 10 },
  movieCard: { marginBottom: 20, alignItems: "center" },
  poster: { width: 120, height: 180, borderRadius: 10 },
  title: { marginTop: 8, textAlign: "center", fontWeight: "bold" },
});
