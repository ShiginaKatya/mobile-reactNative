import React from "react";
import Main from "./components/Main";
import Start from "./components/Start";
import Article from "./components/Article";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Start"
                component={Start}
                options={{title: 'Старт'}}
             />
            <Stack.Screen
                name="Main"
                component={Main}
                options={{title: 'Главная'}}
             />
            <Stack.Screen
                name="Article"
                component={Article}
                options={{title: 'Статья'}}
             />
        </Stack.Navigator>
    </NavigationContainer>
}