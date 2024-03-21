import { View, Text, StatusBar, SafeAreaView, TextInput, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { Feather,Entypo  } from '@expo/vector-icons';
import Category from '../components/Category.js'
import { axiosInstance, CATEGORIES, FILTER } from '../libs/axios.js'
import Meals from '../components/Meals.js'

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 12,
    paddingRight: 12,
  },
  searchWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginTop: 10
  },
  input:{
    flex:1,
    fontSize: 14
  },
  icon:{
    marginRight:10
  },
  categories:{
    marginTop: 10,
    marginBottom: 10
  }
})
export default function HomeScreen() {
  const [isCategoryActive, setIsCategoryActive] = useState('')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
 const handleGetRecipes = async (category = 'Chicken') => {
      try {
        const response = await axiosInstance(`${FILTER}?i=${category}`)
        if (response && response.data) {
        setMeals(response.data.meals);
      }

      }
      catch (error) {
        console.log(error.message)
      }

    }
    const handleGetCategories = async () => {
      try {
        const response = await axiosInstance(CATEGORIES)
        if (response) {
          setCategories(response?.data?.categories)
          
        }
      }
      catch (error) {
        console.log(error.message)
      }
    }
  useEffect(() => {
    handleGetCategories()
    handleGetRecipes()
  }, [])
  
  const handleCategoryChange = (category) => {
    console.log('Hello world')
   console.log({clicked: category})
    setIsCategoryActive(category)
    handleGetRecipes(category)
   
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="pt-12"
        >
          <View className="mx-4 flex-row justify-between items-center" style={styles.header}>
            <Entypo name="menu" size={26} color="black" />
            <Image source={require('../../assets/images/profile-photo.jpg')}

              style={{
                width: heightPercentageToDP(5),
                height: heightPercentageToDP(5),
                borderRadius: 50
              }} />
          </View>
          <View className="mx-4 mb-2 space-y-1">
            <View>
              <Text
                className="text-gray-900 font-bold"
                style={{
                  fontSize: heightPercentageToDP(3)
                }}>
                Fast & Delicacies</Text>
            </View>
            <Text style={{
              fontSize: heightPercentageToDP(3)
            }}
              className="font-semibold"
            >
              Food you <Text style={{
                color: 'orange',
                fontWeight: 'semibold'
              }}>Love</Text>
            </Text>
          </View>
          {/* Search bar */}
          <View style={styles.searchWrapper}>
            <Feather name="search" size={18} color="gray" style={styles.icon} />
            <TextInput
              placeholderTextColor={"gray"}
              placeholder="Search your favourite.."
              style={styles.input}
              value={searchTerm}
              onChangeText={text => setSearchTerm(text)}
            />
          </View>
          
          {/* Categories */}
          <View style={styles.categories}>
            <Category isCategoryActive={isCategoryActive} handleCategoryChange={handleCategoryChange} categories={categories}/>
          </View>
          {/* Meals */}
          <View>
            <Meals meals={meals} categories={categories}/>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Text>HomeScreen</Text>
    </View>
  )
}