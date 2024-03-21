import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'
const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3, // For iOS shadow
  },
  image: {
    width: '100%',
    height: heightPercentageToDP(25),
  },
  text: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default function MealCard({meal}) {
 return (
    <View style={styles.container}>
      <Pressable style={styles.image}>
        <Image 
          source={{ uri: meal?.strMealThumb }}
          style={styles.image}
        />
      </Pressable>
      <Text style={styles.text}>
        {meal?.strMeal.length > 25 ? `${meal?.strMeal.slice(0, 20, -3)}...` : meal?.strMeal}
      </Text>
    </View>
  );
}