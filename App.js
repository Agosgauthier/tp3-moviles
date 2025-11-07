import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initDB } from "./db";

import LoginScreen from "./screens/loginScreen";
import AdminScreen from "./screens/adminScreen";
import UserScreen from "./screens/userScreen";
import UserFormScreen from "./screens/userFormScreen";

const Stack = createStackNavigator();

export default function App() {
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setup = async () => {
      try {
        await initDB();
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUserSession(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log("⚠️ Error al iniciar la app:", error);
      } finally {
        setLoading(false);
      }
    };
    setup();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{ marginTop: 10, color: "black" }}>Cargando aplicación...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userSession ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUserSession={setUserSession} />}
          </Stack.Screen>
        ) : userSession.rol === "admin" ? (
          <>
            <Stack.Screen name="Admin">
              {(props) => (
                <AdminScreen {...props} user={userSession} setUserSession={setUserSession} />
              )}
            </Stack.Screen>
            <Stack.Screen name="UserForm" component={UserFormScreen} />
          </>
        ) : (
          <Stack.Screen name="User">
            {(props) => (
              <UserScreen {...props} user={userSession} setUserSession={setUserSession} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

