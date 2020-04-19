import React,{useState} from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./LoginPharmacien";
import Register from "./RegisterPharmacien";
import Sell from "./SellBavette";
import GestionStock from "./GestionStock"
import auth from "@react-native-firebase/auth"
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

function PharmacienMain() {
    const [isAuth,setAuth] = useState(false)

    auth().onAuthStateChanged(user => {
        setAuth(user? true: false)
      })
    if (isAuth) {
        return (
            <Tab.Navigator initialRoute="Saisie">
                <Tab.Screen name="Saisie" component={Sell} />
                <Tab.Screen name="Gestion Stock" component={GestionStock} />
            </Tab.Navigator>
        )
    } else {
        return(
            <Stack.Navigator initialRouteName="Login" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        )
    }
}

export default PharmacienMain;