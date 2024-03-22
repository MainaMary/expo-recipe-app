import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  }
})
export default function Header() {
  return (
    <View style={styles.container}>
      <Entypo name="menu" size={26} color="black" />
      <Image source={require('../../assets/images/profile-photo.jpg')}

        style={{
          width: hp(5),
          height: hp(5),
          borderRadius: 50
        }} />
    </View>
  )
}