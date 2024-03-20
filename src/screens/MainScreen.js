import { View, Text, StatusBar, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {Animated} from 'react-native-reanimated'
import {Lottie} from 'lottie-react-native'
import MainImage from '../../assets/images/welcome.jpg'

export default function MainScreen() {
  const navigation = useNavigation()
  const animation = useRef(null)
  return (
   <ImageBackground 
      source={MainImage} 
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: "#f0f0f0"
      }}
    >
      <StatusBar style="light"/>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Welcome to BaoBox Food app</Text>
        <Text style={{color: "white", fontSize:16}}>Explore delicious food</Text>
        <TouchableOpacity
        onPress={() =>{navigation.navigate("Home")}}
        style={{backgroundColor: "orange", padding: 10, borderRadius: 5, marginTop: 20}}>
          <Text  className="px-3 py-2 text-base font-semibold" style={{color: "white", textAlign: "center"}}>Click to get started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}