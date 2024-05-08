import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView } from 'react-native';

export default function Article() {
  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.container}> 
            <Image style={styles.article_image} source={require('../assets/article.png')} />
            <View style={styles.article_block}>
                <Text style={styles.article_title}>Заголовок</Text>
                <Text style={styles.article_theme}>zero waste - пластик</Text>
                <Text style={styles.article_group}>ПОДТЕМА</Text>
                <Text style={styles.article_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ex eleifend, faucibus libero ac, lobortis leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ex eleifend, faucibus libero ac, lobortis leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ex eleifend, faucibus libero ac, lobortis leo.</Text>
                <Text style={styles.article_group}>СОВЕТЫ</Text>
                <View style={styles.advice}>
                    <Image style={styles.advice_image} source={require('../assets/icon_advice.png')} />
                    <Text style={styles.advice_text}>zero waste - пластик</Text>
                </View>
                <View style={styles.advice}> 
                    <Image style={styles.advice_image} source={require('../assets/icon_advice.png')} />
                    <Text style={styles.advice_text}>zero waste - пластик</Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    </View>
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