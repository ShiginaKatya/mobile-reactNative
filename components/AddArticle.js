import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddArticle({ navigation }){
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [partitle, setPartitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [advices, setAdvices] = useState([]);
  const [promo, setPromo] = useState('https://i.pinimg.com/474x/3c/9f/32/3c9f328f15f0bb980c163265fe0ee9e9.jpg'); // Задаем постоянное значение для изображения
  const [articles, setArticles] = useState([]);
  const handleSaveArticle = async () => {
    try {
      // Получаем существующие статьи из AsyncStorage
      const storedData = await AsyncStorage.getItem('data');
      let existingArticles = [];
      if (storedData !== null) {
        existingArticles = JSON.parse(storedData);
      }

      // Разделяем введенные советы по запятым и создаем массив
      const adviceArray = advices.split(',').map((advice) => advice.trim());

      // Создаем новую статью
      const newArticle = { title, partitle, text, theme, author, promo, advices: adviceArray };

      // Добавляем новую статью в массив
      const updatedArticles = [...existingArticles, newArticle];
      setArticles(updatedArticles);

      // Сохраняем обновленный массив статей в AsyncStorage
      await AsyncStorage.setItem('data', JSON.stringify(updatedArticles));

      // Очищаем поля формы
      setTitle('');
      setPartitle('');
      setText('');
      setTheme('');
      setAuthor('')
      setAdvices('');
      // Переходим обратно на главный экран
      navigation.goBack();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Название статьи"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Подзаголовок статьи"
        value={partitle}
        onChangeText={setPartitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Текст статьи"
        value={text}
        onChangeText={setText}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Тема статьи"
        value={theme}
        onChangeText={setTheme}
      />
      <TextInput
        style={styles.input}
        placeholder="Автор статьи"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Советы (разделяйте запятыми)"
        value={advices}
        onChangeText={setAdvices}
      />
      <Button color={'green'} title="Добавить" onPress={handleSaveArticle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  contentInput: {
    height: 150,
  },
});