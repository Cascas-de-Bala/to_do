
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { Header, createStackNavigator } from "@react-navigation/stack";
import Home from "./Pages/Todas.js"; // Importe suas telas




const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tela 1" component={Home}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}