
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './screens/LandingScreen';
import Client from "./screens/client"
import CheckStock from './screens/CheckStock';
import PharmacienMain from './screens/PharmacienMain';
import firebase from "@react-native-firebase/app"

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={Landing} />
          <Stack.Screen name="client" component={Client} />
          <Stack.Screen name="stock" component={CheckStock}/>
          <Stack.Screen name="pharmacien" component={PharmacienMain}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default App;
