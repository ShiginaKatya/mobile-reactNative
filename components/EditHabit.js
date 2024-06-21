import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper';

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
        <TextInput
          activeOutlineColor='green'
          mode='outlined'
          style={styles.input}
          label='Привычка'
          placeholder="Введите привычку "
          value={editedHabit.title}
          onChangeText={(title) => setEditedHabit({ ...editedHabit, title })}
        />
        <TextInput
          activeOutlineColor='green'
          mode='outlined'
          label='Описание'
          style={[styles.input, styles.contentInput]}
          placeholder="Введите описание привычки"
          value={editedHabit.description}
          onChangeText={(description) => setEditedHabit({ ...editedHabit, description })}
          multiline
        />
        <Button style={styles.button_style} buttonColor={'green'} textColor={'white'} onPress={updateHabit}>СОХРАНИТЬ</Button>
        <Button style={styles.button_style} buttonColor={'gray'} textColor={'white'} onPress={() => navigation.goBack()}>ОТМЕНА</Button>
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