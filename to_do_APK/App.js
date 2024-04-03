import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './Styles/temaContext';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Pages/home.js'; // Importe suas telas
import Config from './Pages/config.js'; // Importe suas telas
// import Msg from './Components/PushNotification.js'; // Importe suas telas

export default function App() {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const Stack = createStackNavigator();

  return (
    <ThemeProvider>
      <NavigationContainer >
        <Stack.Navigator  screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tela 1" component={Home} />
          <Stack.Screen name="Configurações" component={Config} />
          {/* <Stack.Screen name="Mensagem" component={Msg} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}



