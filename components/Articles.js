import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import json_response from '../response/articles.js';
import BetterButton from './platform_component/BetterButton'




export default function Articles({navigation}) { 
   
    // Состояние для хранения данных, полученных из AsyncStorage
  const [data, setData] = useState([]);

  // Функция для получения данных из AsyncStorage
  const fetchDataFromStorage = async () => {
    try {
      // Получаем данные из AsyncStorage
      const storedData = await AsyncStorage.getItem('data');

      // Если данные есть, обновляем состояние
      if (storedData !== null) {
        setData(JSON.parse(storedData));
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
      await AsyncStorage.setItem('data', JSON.stringify(json_response.data));
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

      <SafeAreaView style={styles.container}> 
        <Image style={styles.logo} source={require('../assets/plant_2820715 1.png')} /> 
        <Text style={styles.text_title}>Статьи</Text>  
        <FlatList data={data} renderItem={({item}) =>( 
          <TouchableOpacity onPress={()=> navigation.navigate('Article', item)}> 
            <View style={styles.article}> 
              <View> 
                <Image style={styles.promo_image}  source={{
                  uri: item.promo}} /> 
              </View> 
              <View style={styles.article_block} > 
                  <Text style={styles.article_theme}>{ item.theme }</Text> 
                  <Text style={styles.article_title}>{ item.title} </Text> 
                  <Text style={styles.article_author}>{ item.author }</Text> 
              </View> 
            </View>  
          </TouchableOpacity>
        )} /> 
        <BetterButton textColor='white' color={'green'} title='ДОБАВИТЬ' style={{borderColor:'green', width: '50%', marginHorizontal: 'auto', marginBottom: 10}} onPress={()=> navigation.navigate('AddArticle')} />
        <StatusBar style="auto" /> 
      </SafeAreaView>
  ); 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF0DE',
    color: 'green',
    justifyContent: 'center',
    paddingTop: 20
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
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 'auto',
    marginTop: 10
  },
  article: {
    width: 350,
    height: 124,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 'auto',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 10,
  },
  article_block: {
    marginLeft: 10,
    alignItems: 'baseline'
  },
  article_theme: {
    fontSize: 10,
    color: 'green',
    paddingBottom: 10,
  },
  article_title:{
    fontSize: 12,
    textAlign: 'left',
    paddingBottom: 10,
    width: 200
  },
  article_author: {
    fontSize: 10,
    color: 'gray'
  },

  promo_image: {
    width: 139,
    height: 124,
    borderRadius: 4,
  }
  
});