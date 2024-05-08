import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import ArticlePromo from './ArticlePromo';

export default function Main({navigation}) {
  const loadArticle = () => {
    navigation.navigate('Article')
  } 
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}> 
        <Image style={styles.logo} source={require('../assets/plant_2820715 1.png')} />
        <Text style={styles.text_title}>Добро пожаловать!</Text>
        <Text style={styles.text_simple}>ПРИВЫЧКА НА СЕГОДНЯ</Text>
        <View style={styles.banner}> 
            <Text style={styles.banner_text} >Шоппинг без {'\n'}пластика</Text>
            <Image style={styles.banner_image} source={require('../assets/main_picture.png')} />
        </View>
        <Text style={styles.text_simple}>НОВЫЕ СТАТЬИ</Text>
        <TouchableOpacity onPress={loadArticle}>
            <ArticlePromo />
        </TouchableOpacity>
        <ArticlePromo />
        <ArticlePromo />
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF0DE',
    color: 'green',
    justifyContent: 'center',
  },
  text: {
    color: 'green',
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'
  },
  text_title: {
    color: 'green',
    textAlign: 'center',
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold'
  },
  text_simple: {
    color: 'green',
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 'auto',
    marginTop: 40
  },
  banner: {
    width: 350,
    height: 170,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  banner_text: {
    textAlign: 'left',
    fontSize: 20,
    marginLeft: 40,
    color: 'green'
  },
  
});