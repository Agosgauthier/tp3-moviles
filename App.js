// App.js
import React, { useEffect, useState } from "react";
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
      await initDB();
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) setUserSession(JSON.parse(savedUser));
      setLoading(false);
    };
    setup();
  }, []);

  if (loading) return null;

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
            {(props) => <UserScreen {...props} user={userSession} setUserSession={setUserSession} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
