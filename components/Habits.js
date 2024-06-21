import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, SafeAreaView, TouchableOpacity, Button} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import json_response from '../response/articles.js';
import { FontAwesome } from '@expo/vector-icons';




export default function Habits({navigation}) { 
   
// Состояние для хранения данных, полученных из AsyncStorage
  const [habits, setHabits] = useState([]);

  // Функция для получения данных из AsyncStorage
  const fetchDataFromStorage = async () => {
    try {
      // Получаем данные из AsyncStorage
      const storedData = await AsyncStorage.getItem('habits');

      // Если данные есть, обновляем состояние
      if (storedData !== null) {
        setHabits(JSON.parse(storedData));
        // console.log(storedData);
      }
    } catch (error) {
      // Обрабатываем ошибки
      console.error('error', error);
    }
  };

  // При первом рендере компонента сохраняем данные из json_response.data в AsyncStorage
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('habits', JSON.stringify(json_response.habits));
      // загрузить данные из AsyncStorage
      // await fetchDataFromStorage();
    })();
  }, []);

  // Подписка на событие активации экрана (когда пользователь переходит на этот экран)
  useFocusEffect(
    useCallback(() => {
      // Загружаем данные из AsyncStorage при активации экрана
      fetchDataFromStorage();
    }, [])
  );  
 
  return ( 

      <View style={styles.container}> 
        <Image style={styles.logo} source={require('../assets/plant_2820715 1.png')} /> 
        <Text style={styles.text_title}>Эко-привычки</Text>  
        <FlatList data={habits} renderItem={({item}) =>( 
          <TouchableOpacity onPress={()=> navigation.navigate('Habit', item)}> 
            <View style={styles.article}> 
              <View style={styles.logo_habit}> 
                <FontAwesome name={'leaf'} size={24} color="green" />
              </View> 
              <View style={styles.article_block} >  
                  <Text style={styles.article_title}>{ item.title} </Text> 
              </View> 
            </View>  
          </TouchableOpacity>
        )} /> 
        <Button color={'green'} title='Добавить' onPress={()=> navigation.navigate('AddHabit')} /> 
        <StatusBar style="auto" /> 
      </View>
  ); 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF0DE',
    color: 'green',
    paddingTop: 20,
  },
  button_style:{
    width: 50,
    height: 20
  },
  text_title: {
    color: 'green',
    textAlign: 'center',
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold'
  },
  logo_habit:{
    marginHorizontal: 15
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 'auto',
    marginTop: 10
  },
  article: {
    width: 350,
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 'auto',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 10,
  },
  article_title:{
    fontSize: 15,
    textAlign: 'left',
    width: 260,
    color: 'black'
  },
  
});