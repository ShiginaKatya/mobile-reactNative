import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField } from 'react-native-ios-kit';



export default function BetterTextInput({ onValueChange, label, style, value}){
  return (
    <TextField
          style={[styles.input, style]}
          placeholder={label}
        //   Подключение другой кнопки очистки
          clearButtonMode="always"
        //   Отключение кнопки очищения поля, иконка которой не прогружается
          clearButton={false}
          value={value}
          onValueChange={onValueChange}
        />
  );
};

const styles = StyleSheet.create({
    input:{
        backgroundColor: 'white',
        marginBottom: 16,
        marginHorizontal: 16
    }
    
  });
  
