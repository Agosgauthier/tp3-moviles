📱 TP3 - Autenticación y Gestión de Usuarios con SQLite (Expo)

Aplicación móvil desarrollada con **React Native (Expo)** que implementa un sistema de **autenticación de usuarios** y **gestión de roles** (Administrador / Usuario estándar), utilizando **SQLite local** como base de datos.

---

📖 Descripción  
Esta app permite:  
- Iniciar sesión con credenciales guardadas en SQLite.  
- Crear, editar y eliminar usuarios (solo disponible para el rol “admin”).  
- Administrar usuarios desde una interfaz simple y funcional.  
- Guardar la sesión activa localmente con AsyncStorage.  

El sistema crea automáticamente un usuario **Administrador** la primera vez que se ejecuta la app:  
---

⚙️ Requisitos  
- Node.js (v18 o superior)  
- Expo CLI  
- Expo Go (en tu celular)  

---

🚀 Instalación y ejecución  

```bash
# Clonar el repositorio
git clone <tu-repo>
cd TP3-Autenticacion

# Instalar dependencias
npm install

# Instalar dependencias necesarias manualmente
expo install expo-sqlite
expo install @react-native-async-storage/async-storage
npm install @react-navigation/native @react-navigation/stack
expo install react-native-screens react-native-gesture-handler

# Iniciar el servidor de desarrollo
npx expo start