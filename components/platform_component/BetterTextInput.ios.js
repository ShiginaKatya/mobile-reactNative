import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField } from 'react-native-ios-kit';
import Icon from 'react-native-vector-icons/Ionicons';



export default function BetterTextInput({ onValueChange, label, style, value}){
  return (
    <TextField
          style={[styles.input, style]}
          placeholder={label}
          clearButtonMode="always"
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
  
