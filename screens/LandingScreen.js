import React from 'react';
import { Icon } from "react-native-elements"
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Landing = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.main}>
        <View style={styles.logo}>
          <Text style={styles.bavette}>Bavette</Text>
          <Text style={styles.plus}>Plus</Text>
        </View>
        <View style={styles.choice}>
          <Text style={styles.question}>QUI ETES-VOUS?</Text>
          <View style={styles.icons}>
            <View style={styles.icon}>
              <Icon
                name='user'
                type='font-awesome'
                color='black'
                size={40}
                onPress={()=>navigation.navigate('client')}
              />
              <Text style={styles.client}>
                CLIENT
                </Text>
            </View>
            <View style={styles.icon}>
              <Icon
                name='medkit'
                type='font-awesome'
                color='black'
                size={40}
                onPress={()=>navigation.navigate('pharmacien')}
              />
              <Text style={styles.client}>
                PHARMACIEN
                </Text>
            </View>
          </View>
        </View>
        <View >
          <Text style={styles.heart}>Heart and soul in every line of code</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: "center",
    backgroundColor: "#df3051"
  },
  bavette: {
    fontSize: 80,
    fontWeight: "bold",
    color: '#fef5f6'
  },
  plus: {
    fontSize: 60,
    fontWeight: "100",
    color: "#e2dfe0"
  },
  logo: {
    alignItems: 'center',
    flex: 2,
    marginTop: 10
  },
  question: {
    fontSize: 40,
    color: "#fff"
  },
  choice: {
    flex: 2
  },
  button: {
    flex: 1
  },
  icons:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:30
  },
  icon:{
    alignItems:"center"
  },
  client:{
    color:"#fff"
  },
  heart:{
      fontSize:5,
      color:"white"
  }
});

export default Landing;
