import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StatusBar, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BetterButton from './platform_component/BetterButton'
import BetterTextInput from './platform_component/BetterTextInput'

export default function AddHabit({navigation }){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [habits, setHabits] = useState([]);

    const handleSaveHabit = async () => {
        try {
          // Получаем существующие статьи из AsyncStorage
          const storedData = await AsyncStorage.getItem('habits');
          let existingHabits = [];
          if (storedData !== null) {
            existingHabits = JSON.parse(storedData);
          }
           
          // Создаем новую привычку
          const newHabit = { title, description};
    
          // Добавляем новую привычку в массив
          const updatedHabits = [...existingHabits, newHabit];
          setHabits(updatedHabits);
    
          // Сохраняем обновленный массив статей в AsyncStorage
          await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
    
          // Очищаем поля формы
          setTitle('');
          setDescription('');
          // Переходим обратно на главный экран
          navigation.goBack();
        } catch (error) {
          console.error('Error saving habit:', error);
        }
      };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>BE BETTER</Text>
        <BetterTextInput
          label='Привычка'
          placeholder="Введите привычку "
          value={title}
          style={styles.input}
          onValueChange={title => setTitle(title)}
        />
        <BetterTextInput
          label='Описание'
          style={[styles.input, styles.contentInput]}
          placeholder="Введите описание привычки"
          value={description}
          onValueChange={description => setDescription(description)}
          multiline
        />
        <BetterButton style={[styles.button_style, {borderColor: 'green'}]} textColor={'white'} color={'green'} title='ДОБАВИТЬ' onPress={handleSaveHabit}/>
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
  input: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 4,
    // padding: 8,
    backgroundColor: 'white',
    marginBottom: 16,
    marginHorizontal: 16
  },
  contentInput: {
    height: 100,
  },
});