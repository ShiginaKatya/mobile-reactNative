import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function Start({navigation}) {
  const loadScene = () => {
    navigation.navigate('Main')
  } 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BE BETTER</Text>
      <Image source={require('../assets/plant_2820715 1.png')} />
      <Text style={styles.text}>Привет!</Text>
      <Text style={styles.text_simple}>С BE BETTER ты можешь стать лучше вместе с нашей планетой!</Text>
      <Button color={'green'} title='Старт' onPress={loadScene} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'green',
  },
  text: {
    color: 'green',
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  text_simple: {
    color: 'green',
    textAlign: 'center',
    padding: 20,
  }
  
});