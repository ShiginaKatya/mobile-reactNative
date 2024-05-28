import React from "react";
import Main from "./components/Main";
import Start from "./components/Start";
import Article from "./components/Article";
import Articles from "./components/Articles"
import AddArticle from "./components/AddArticle"

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
      <Tab.Navigator
      // Настраиваем внешний вид и поведение табной навигации
        screenOptions={({ route }) => ({
        // Определяем, какой иконка будет отображаться для каждой вкладки
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // Выбираем иконку в зависимости от названия вкладки
            if (route.name === 'Main') {
              iconName = 'home';
            } else if (route.name === 'Articles') {
              iconName = 'list';
            } 
            // Возвращаем компонент иконки FontAwesome
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          // Задаем цвет активной и неактивной вкладки
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          // Скрываем заголовок в шапке приложения
          headerShown: false,
          // Скрываем подписи под иконками вкладок
          tabBarShowLabel: false,
        })}
      >
        {/* // Определяем вкладки навигации и связываем их с компонентами */}
        <Tab.Screen name="Main" component={Main} />
        <Tab.Screen name="Articles" component={Articles} />
      </Tab.Navigator>
    );
  }

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
                component={MainTabs}
                options={{title: 'Главная'}}
             />
             {/* <Stack.Screen
                name="Articles"
                component={Articles}
                options={{title: 'Cтатьи'}}
             /> */}
            <Stack.Screen
                name="Article"
                component={Article}
                options={{title: 'Статья'}}
             />
            <Stack.Screen
                name="AddArticle"
                component={AddArticle}
                options={{title: 'Добавить статью'}}
             />
        </Stack.Navigator>
    </NavigationContainer>
}