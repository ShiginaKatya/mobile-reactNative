import React from "react";
import Main from "./components/Main";
import Start from "./components/Start";
import Article from "./components/Article";
import Articles from "./components/Articles"
import AddArticle from "./components/AddArticle"
import Habits from "./components/Habits"
import Habit from "./components/Habit"
import EditHabit from "./components/EditHabit";
import AddHabit from "./components/AddHabit";


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
            } else if (route.name === 'Habits') {
              iconName = 'leaf'
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
        <Tab.Screen name="Habits" component={Habits} />
        <Tab.Screen name="Articles" component={Articles} />
      </Tab.Navigator>
    );
  }

export default function Navigate() {

    return <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'green',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontStyle: 'italic'
            },
          }}
        >
            <Stack.Screen
                name="Start"
                component={Start}
                options={{title: 'Старт'}}
             />
            <Stack.Screen
                name="Main"
                component={MainTabs}
                options={{title: 'BE BETTER'}}
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
                name="Habit"
                component={Habit}
                options={{title: 'Привычка'}}
             />
            <Stack.Screen
                name="AddArticle"
                component={AddArticle}
                options={{title: 'Добавить статью'}}
             />
             <Stack.Screen
                name="AddHabit"
                component={AddHabit}
                options={{title: 'Добавить привычку'}}
             />
            <Stack.Screen
                name="EditHabit"
                component={EditHabit}
                options={{title: 'Редактировать привычку'}}
             />
        </Stack.Navigator>
    </NavigationContainer>
}