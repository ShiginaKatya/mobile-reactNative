import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper';

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
        <TextInput
          activeOutlineColor='green'
          mode='outlined'
          style={styles.input}
          label='Привычка'
          placeholder="Введите привычку "
          value={title}
          onChangeText={title => setTitle(title)}
        />
        <TextInput
          activeOutlineColor='green'
          mode='outlined'
          label='Описание'
          style={[styles.input, styles.contentInput]}
          placeholder="Введите описание привычки"
          value={description}
          onChangeText={description => setDescription(description)}
          multiline
        />
        <Button style={styles.button_style} buttonColor={'green'} textColor={'white'} onPress={handleSaveHabit}>ДОБАВИТЬ</Button>
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
    marginBottom: 16,
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