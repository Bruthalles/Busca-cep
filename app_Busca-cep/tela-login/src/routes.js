import { createStackNavigator } from "@react-navigation/stack";
import Home from './pages/home/home';
import { Contatos } from './pages/contatos/contatos';

const Stack = createStackNavigator();

export function Routes(){
  return(
    <Stack.Navigator initialRouteName="home" headerMode="false">
      <Stack.Screen
        name="home"
        component={Home}
      />
      <Stack.Screen
        name="contatos"
        component={Contatos}
      />
    </Stack.Navigator>
  )
}
