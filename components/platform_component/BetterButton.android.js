import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function BetterButton({ onPress, title, style, textColor, color}){
  return (
    <Button
      onPress={onPress}
      style={[styles.button, style]}
      textColor ={textColor}
      buttonColor={color}
    //   color='green'
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
    button: {
        borderColor: 'green',
        color: 'green'
    }
  });