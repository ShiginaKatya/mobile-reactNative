import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView } from 'react-native';

export default function ArticlePromo() {
  return (
    <View style={styles.article}>
        <Image style={styles.banner_image} source={require('../assets/article_promo.png')} />
        <View style={styles.article_block} >
            <Text style={styles.article_theme}>route.params.datatitle</Text>
            <Text style={styles.article_title}>Как уменьшить {'\n'}количество{'\n'}пластика в жизни? </Text>
            <Text style={styles.article_author}>route.params.desc</Text>
        </View>
     </View>   
  );
}

const styles = StyleSheet.create({
  article: {
    width: 350,
    height: 124,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 'auto',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 10,
  },
  article_block: {
    marginLeft: 10,
    alignItems: 'baseline'
  },
  article_theme: {
    fontSize: 10,
    color: 'green',
    paddingBottom: 10,
  },
  article_title:{
    fontSize: 15,
    textAlign: 'left',
    paddingBottom: 10,
  },
  article_author: {
    fontSize: 10,
    color: 'gray'
  }
  
});