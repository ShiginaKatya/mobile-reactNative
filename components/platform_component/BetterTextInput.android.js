import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';



export default function BetterTextInput({ onValueChange, placeholder, label, style, value}){
  return (
    <TextInput
        activeOutlineColor='green'
        mode='outlined'
        label={label}
        style={[styles.input, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onValueChange}
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
  
