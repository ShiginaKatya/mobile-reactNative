import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function AddArticle({ navigation }){
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [partitle, setPartitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [advices, setAdvices] = useState([]);
  const [promo, setPromo] = useState('https://i.pinimg.com/474x/3c/9f/32/3c9f328f15f0bb980c163265fe0ee9e9.jpg'); 
  const [articles, setArticles] = useState([]);

  const handleImagePicker = async () => {
    try {
      // Запрашиваем разрешение на доступ к медиафайлам
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Необходимо разрешение на доступ к фото и медиафайлам');
        return;
      }

      // Открываем медиа-пикер
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setPromo(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Ошибка при выборе изображения:', error);
    }
  };

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
      setPromo('https://i.pinimg.com/474x/3c/9f/32/3c9f328f15f0bb980c163265fe0ee9e9.jpg');
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
      {promo && <Image source={{ uri: promo }} style={styles.image} />}
      <Button color={'green'} title="Выбрать изображение" onPress={handleImagePicker} />
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
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 'auto',
    marginVertical: 10,
  },
  contentInput: {
    height: 100,
    marginTop: 10
  },
});