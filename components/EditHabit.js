import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BetterButton from './platform_component/BetterButton'
import BetterTextInput from './platform_component/BetterTextInput'

export default function EditHabit({ route, navigation }){
    const { habit } = route.params // Добавляем значение по умолчанию, если route.params является undefined
    const [editedHabit, setEditedHabit] = useState(habit); // Также добавляем значение по умолчанию для habit
    

    useEffect(() => {
        setEditedHabit({ ...habit }); // Обновляем состояние editedHabit при изменении habit
      }, [habit]);

    const updateHabit = async () => {
        try {
            const storedData = await AsyncStorage.getItem('habits');
            if (storedData !== null) {
              const habits = JSON.parse(storedData);
              const index = habits.findIndex((hab) => hab.title === habit.title); // Используем habit.title или пустую строку, если habit является undefined
              habits[index] = editedHabit;
              await AsyncStorage.setItem('habits', JSON.stringify(habits));
              navigation.navigate('Habits')
            }
        } catch (error) {
            console.error('Error updating habit:', error);
          }
        };
      

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>BE BETTER</Text>
        <BetterTextInput
          label='Привычка'
          placeholder="Введите привычку "
          value={editedHabit.title}
          onValueChange={(title) => setEditedHabit({ ...editedHabit, title })}
        />
        <BetterTextInput
          label='Описание'
          style={styles.contentInput}
          placeholder="Введите описание привычки"
          value={editedHabit.description}
          onValueChange={(description) => setEditedHabit({ ...editedHabit, description })}
          multiline
        />
        <BetterButton style={[styles.button_style, {borderColor: 'green'}]} color={'green'} textColor={'white'} onPress={updateHabit} title='СОХРАНИТЬ'/>
        <BetterButton style={[styles.button_style, {borderColor: 'gray'}]} color={'gray'} textColor={'white'} onPress={() => navigation.goBack()} title='ОТМЕНА'/>
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
    marginTop: 10,
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