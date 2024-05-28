import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, ScrollView } from 'react-native';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

export default function Article({route}) {
  // Извлекаем параметры статьи из навигационного маршрута
  const { title, partitle, text, theme, author, promo, advices } = route.params;

  // Создаем состояние для хранения текущей статьи
  const [article, setArticle] = useState({ title, partitle, text, theme, author, promo, advices });

  // При монтировании компонента или изменении заголовка статьи
  useEffect(() => {
    // Функция для загрузки статьи из AsyncStorage
    const loadArticle = async () => {
      try {
        // Получаем данные из AsyncStorage
        const storedData = await AsyncStorage.getItem('data');
        if (storedData !== null) {
          // Парсим данные из AsyncStorage
          const articles = JSON.parse(storedData);
          // Находим статью с соответствующим заголовком
          const currentArticle = articles.find((art) => art.title === title);
          // Обновляем состояние с найденной статьей
          setArticle(currentArticle);
        }
      } catch (error) {
        // Обрабатываем ошибки
        console.error('Error loading article:', error);
      }
    };

    // Если статья еще не загружена или заголовок статьи изменился, загружаем статью
    if (!article || article.title !== title) {
      loadArticle();
    }
  }, [article, title]);

  // Если статья еще не загружена, показываем загрузку
  if (!article) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container}> 
            <Image style={styles.article_image} source={{
              uri: article.promo
            }} />
            <View style={styles.article_block}>
                <Text style={styles.article_title}>{article.title}</Text>
                <Text style={styles.article_theme}>{article.theme}</Text>
                <Text style={styles.article_group}>{article.partitle}</Text>
                <Text style={styles.article_text}>{article.text}</Text>
                <Text style={styles.article_group}>СОВЕТЫ</Text>
                <View style={styles.advice}>
                    <Image style={styles.advice_image} source={require('../assets/icon_advice.png')} />
                    <Text style={styles.advice_text}>{article.advices[0]}</Text>
                </View>
                <View style={styles.advice}> 
                    <Image style={styles.advice_image} source={require('../assets/icon_advice.png')} />
                    <Text style={styles.advice_text}>{article.advices[1]}</Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'green',
  },
  article_image: {
    width: 400,
    height: 320
  },
  article_block: {
    margin: 20
  },
  article_title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green'
  },
  article_theme: {
    fontSize: 12,
    color: 'gray'
  },
  article_group:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 20
  },
  advice: {
    flexDirection: 'row',
    gap: 20,
    margin: 10
  },
  article_text:{
    color: 'gray'
  },
  advice_text: {
    color: 'gray'
  }
  
  
});