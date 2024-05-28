import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import json_response from '../response/articles.js';



export default function Main({navigation}) { 
   
  const [data, setData] = useState([]);  
   
 
    const fetchDataFromStorage = async () => { 
        try { 
            const storedData = await AsyncStorage.getItem('data'); 
 
            if (storedData !== null) { 
                setData(JSON.parse(storedData)); 
                console.log(storedData) 
            } 
        } catch (error) { 
            console.error('error', error); 
        } 
    }; 
    useEffect(() => { 
      (async () => { 
        await AsyncStorage.setItem('data',JSON.stringify(json_response.data)); 
        await fetchDataFromStorage();  
      })() 
    }, []); 

    useFocusEffect( 
          useCallback(() => { 
              fetchDataFromStorage();  
          }, []) 
      ); 
 
  // const imageMap = { 
  //   image1: require('../assets/article_promo.png'), 
  //   image2: require('../assets/icon_advice.png'),
  // } 
   
  // const getImagePath = (imageName) => { 
  //     return imageMap[imageName] || null; 
  //   }; 
 
  return ( 
    <View style={styles.container}> 
      <SafeAreaView style={styles.container}>  
        <Image style={styles.logo} source={require('../assets/plant_2820715 1.png')} /> 
        <Text style={styles.text_title}>Добро пожаловать!</Text> 
        <Text style={styles.text_simple}>ПРИВЫЧКА НА СЕГОДНЯ</Text> 
        <View style={styles.banner}>  
            <Text style={styles.banner_text} >Шоппинг без {'\n'}пластика</Text> 
            <Image style={styles.banner_image} source={require('../assets/main_picture.png')} /> 
        </View> 
        <TouchableOpacity onPress={()=> navigation.navigate('Articles')}>
          <Text style={styles.text_simple}>НОВЫЕ СТАТЬИ</Text>
        </TouchableOpacity>
        <FlatList data={data.slice(0, 2)} renderItem={({item}) =>( 
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
        <StatusBar style="auto" /> 
      </SafeAreaView> 
    </View> 
  ); 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF0DE',
    color: 'green',
    justifyContent: 'center',
  },
  text: {
    color: 'green',
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'
  },
  text_title: {
    color: 'green',
    textAlign: 'center',
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold'
  },
  text_simple: {
    color: 'green',
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 'auto',
    marginTop: 40
  },
  banner: {
    width: 350,
    height: 170,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  banner_text: {
    textAlign: 'left',
    fontSize: 20,
    marginLeft: 40,
    color: 'green'
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