import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-ios-kit';



export default function BetterButton({ onPress, title, style, color}){
  return (
    <Button
      onPress={onPress}
      rounded
      style={[styles.button, style]}
      color ={color}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
   
  });
  

