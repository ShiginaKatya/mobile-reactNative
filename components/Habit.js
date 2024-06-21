import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import BetterButton from './platform_component/BetterButton'



export default function Habit({route, navigation}) {
  // Извлекаем параметры привычки из навигационного маршрута
  const { title, description } = route.params;

  // Создаем состояние для хранения текущей привычки
  const [habit, setHabit] = useState({ title, description });
  
  // При монтировании компонента или изменении заголовка привычки
  useEffect(() => {
    // Функция для загрузки привычки из AsyncStorage
    const loadHabit = async () => {
      try {
        // Получаем данные из AsyncStorage
        const storedData = await AsyncStorage.getItem('habits');
        if (storedData !== null) {
      // Парсим данные из AsyncStorage
          const habits = JSON.parse(storedData);
          // Находим привычку с соответствующим заголовком
          const currentHabit = habits.find((hab) => hab.title === title);
          // Обновляем состояние с найденной привычкой
          setHabit(currentHabit);
        }
      } catch (error) {
        // Обрабатываем ошибки
        console.error('Error loading habit:', error);
      }


    };

    // Если привычка еще не загружена или заголовок привычки изменился, загружаем привычку
    if (!habit || habit.title !== title) {
      loadHabit()
    }
  }, [habit, title]);



  // Если привычка еще не загружена, показываем загрузку
  if (!habit) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const navigateToEditScreen = () => {
    navigation.navigate('EditHabit', { habit });
  }; 
  const deleteHabit = async () => {
    try {
        // Получаем данные из AsyncStorage
      const storedData = await AsyncStorage.getItem('habits');
      if (storedData !== null) {
          // Парсим данные из AsyncStorage
        const habits = JSON.parse(storedData);
          // Удаляем привычку с соответствующим заголовком
        const updatedHabits = habits.filter((hab) => hab.title !== habit.title);
          // Сохраняем обновленные данные в AsyncStorage
        await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
          // Возвращаемся на предыдущий экран
        navigation.goBack();
        }
    } catch (error) {
        console.error('Ошибка удаления привычки:', error);
      }
    };

  

  return (
    <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container_card}> 
            <View style={styles.habit_image}> 
                <FontAwesome name={'leaf'} size={100} color="#DAF0DE" />
            </View> 
            <View style={styles.habit_block}>
                <Text style={styles.habit_title}>{habit.title}</Text>
                <Text style={styles.habit_text}>{habit.description}</Text>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
        <BetterButton style={[styles.button_style, {borderColor: 'green'}]} textColor={'white'} color={'green'} title='ИЗМЕНИТЬ' onPress={navigateToEditScreen}/>
        <BetterButton  onPress={deleteHabit} title='УДАЛИТЬ'  textColor='white' color={'gray'} style={[styles.button_style, {borderColor: 'gray'}]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF0DE',
  },
  container_card:{
    flex: 1,
    backgroundColor: 'white',
    height: '50%',
    elevation: 6
},
 habit_image: {
    marginVertical: 20,
    marginHorizontal: 'auto',
  },
  habit_block: {
    margin: 20,
  },
  habit_title: {
    fontSize: 25,
    ...Platform.select({
      ios:{
        fontWeight: '500',
      },
      android:{
        fontWeight: 'bold',
      },
      default:{
        fontWeight: 'bold',
      }
    }),
    color: 'green'
  },
  habit_text:{
    color: 'gray',
    fontSize: 18,
    marginTop: 10
  },
  button_style: {
    marginTop: 10,
    marginHorizontal: 'auto',
    width: 200
  },
  button_delete: {
    // backgroundColor: 'gray'
  }
  
});