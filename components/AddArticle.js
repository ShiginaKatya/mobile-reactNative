import React, { useState } from 'react';
import { Platform, View, Text, StatusBar, StyleSheet, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import BetterButton from './platform_component/BetterButton'
import BetterTextInput from './platform_component/BetterTextInput'

export default function AddArticle({ navigation }){
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [partitle, setPartitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [advices, setAdvices] = useState();
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
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>BE BETTER</Text>
        <BetterTextInput
          label='Заголовок'
          placeholder="Введите заголовок статьи"
          value={title}
          onValueChange={title => setTitle(title)}
        />
        <BetterTextInput
          label='Подзаголовок'
          placeholder="Введите подзаголовок статьи"
          value={partitle}
          onValueChange={partitle => setPartitle(partitle)}
        />
        <BetterTextInput
          label='Текст'
          style={styles.contentInput}
          placeholder="Введите текст статьи"
          value={text}
          onValueChange={text => setText(text)}
          multiline
        />
        <BetterTextInput
          label='Тема'
          placeholder="Введите тему статьи"
          value={theme}
          onValueChange={theme => setTheme(theme)}
        />
        <BetterTextInput
          label='Автор'
          placeholder="Введите автора статьи"
          value={author}
          onValueChange={author => setAuthor(author)}
        />
        {promo && <Image source={{ uri: promo }} style={styles.image} />}
        <BetterButton style={[styles.button_style,{borderColor: 'green'} ]} color={'green'} textColor={'white'} onPress={handleImagePicker} title='ВЫБРАТЬ ИЗОБРАЖЕНИЕ'/>
        <BetterTextInput
          label='Cоветы(разделяй запятыми)'
          placeholder="Введите советы"
          value={advices}
          onValueChange={advices => setAdvices(advices)}
        />
        <BetterButton style={[styles.button_style,{borderColor: 'green'} ]} color={'green'} textColor={'white'} onPress={handleSaveArticle} title='ДОБАВИТЬ'/>
        <StatusBar style="auto" />
      </ScrollView>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: 'green',
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  button_style: {
    ...Platform.select({
      ios:{
        marginVertical: 16,
      },
      android:{
        marginBottom: 16,
      },
      default:{
        marginBottom: 16,
      }
    }),
    marginHorizontal: 'auto',
    width: '50%'
  },
  // input: {
  //   // borderWidth: 1,
  //   // borderColor: '#ccc',
  //   // borderRadius: 4,
  //   // padding: 8,
  //   backgroundColor: 'white',
  //   marginBottom: 16,
  //   marginHorizontal: 16
  // },
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 'auto',
    marginVertical: 10,
  },
  contentInput: {
    height: 100,
  },
});