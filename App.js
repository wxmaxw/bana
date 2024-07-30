import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native";

import Login from "./pages/auth/Login/Login";
import Sign from "./pages/auth/Sign/Sign";
import Home from "./pages/auth/Home/Home";

const Stack = createStackNavigator();

const AuthStack = () =>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginPage" component={Login}/>
      <Stack.Screen name="SignPage" component={Sign}/>
      <Stack.Screen name="HomePage" component={Home}/>
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        {/*<Stack.Screen name="SignPage" component={Sign} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
