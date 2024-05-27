import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, ScrollView } from 'react-native';

export default function Article({route}) {
  return (
    <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container}> 
            <Image style={styles.article_image} source={{
              uri: route.params.promo
            }} />
            <View style={styles.article_block}>
                <Text style={styles.article_title}>{route.params.title}</Text>
                <Text style={styles.article_theme}>{route.params.theme}</Text>
                <Text style={styles.article_group}>{route.params.partitle}</Text>
                <Text style={styles.article_text}>{route.params.text}</Text>
                <Text style={styles.article_group}>СОВЕТЫ</Text>
                <View style={styles.advice}>
                    <Image style={styles.advice_image} source={require('../assets/icon_advice.png')} />
                    <Text style={styles.advice_text}>{route.params.advices[0]}</Text>
                </View>
                <View style={styles.advice}> 
                    <Image style={styles.advice_image} source={require('../assets/icon_advice.png')} />
                    <Text style={styles.advice_text}>{route.params.advices[1]}</Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'green',
  },
  article_image: {
    width: 400,
    height: 320
  },
  article_block: {
    margin: 20
  },
  article_title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green'
  },
  article_theme: {
    fontSize: 12,
    color: 'gray'
  },
  article_group:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 20
  },
  advice: {
    flexDirection: 'row',
    gap: 20,
    margin: 10
  },
  article_text:{
    color: 'gray'
  },
  advice_text: {
    color: 'gray'
  }
  
  
});