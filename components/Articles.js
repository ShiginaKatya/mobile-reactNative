import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import ArticlePromo from './ArticlePromo';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import json_response from '../response/articles.js';



export default function Articles({navigation}) { 
   
  const [data, setData] = useState([]); ; 
   
 
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
 
  return ( 
    <View style={styles.container}> 
      <SafeAreaView style={styles.container}>   
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
    paddingTop: 20
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