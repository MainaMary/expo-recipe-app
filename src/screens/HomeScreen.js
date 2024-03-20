import { View, Text, StatusBar, SafeAreaView, TextInput ,Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline'
import { ScrollView } from 'react-native-reanimated'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import {Category} from '../components/Category.js'
import {axiosInstance, CATEGORIES, FILTER} from '../libs/axios.ts'

export default function HomeScreen() {
  const [isCategoryActive, setIsCategoryActive] = useState('chicken')
  const[categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])

  useEffect(() =>{
  const handleGetRecipes =async (category ='chicken') =>{
      try{
        const response = await axiosInstance(`${FILTER}?i=${category}`)
         
      }
      catch(error){
       console.log(error.message)
      }

    }
    const handleGetCategories =async () =>{
      try{
        const response = await axiosInstance(CATEGORIES)
         if(response){
            setCategories(response?.data?.categories)
            console.log(response?.data?.categories)
          }
      }
      catch(error){
        console.log(error.message)
      }
    }
  handleGetCategories()
  handleGetRecipes()
  },[])
   const handleCategoryChange =(category) =>{
  
   handleGetRecipes(category)
   setIsCategoryActive(category)
  }
   
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="pt-12"
        >
          <View className="mx-4 flex-row justify-between items-center">
            <AdjustmentsHorizontalIcon size={16} />
            <Image source={'../../assets/images/profile-photo.jpg'}
              className="rounded-full"
              style={{
                width: heightPercentageToDP(5),
                height: heightPercentageToDP(5)
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
              Food you <Text className="text-orange">Love</Text>
            </Text>
          </View>
          {/* Search bar */}
          <View className="flex mx-4 items-center border rounded-xl border-black p-[6px]">
            <View className="bg-white rounded-full p-2">
              <MagnifyingGlassIcon size={heightPercentageToDP(5)} strokeWidth={4}/>
            </View>
            <TextInput placeholder='Search your favourite'
            placeholderTextColor={"gray"}
            className="flex-1 text-base mb-1 pl-1 tracking-widest"
            style={{
              fontSize: heightPercentageToDP(1.8)
            }}
            />
          </View>
          {/* Categories */}
          <View>
            <Category isCategoryActive={isCategoryActive} handleCategory={handleCategoryChange} categories={categories}/>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Text>HomeScreen</Text>
    </View>
  )
}