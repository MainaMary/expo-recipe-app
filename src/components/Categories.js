import { View, Text, TouchableOpacity } from 'react-native'
import { categoryData } from '../constants'
import React from 'react'
import { ScrollView } from 'react-native-reanimated'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export default function Categories({ isCategoryActive, handleCategory }) {
  return (
    <View>
      <ScrollView horizontal
        showsHorizontalScrollIndicator
        className=""
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
      >
        {categoryData.map((category, index) => <TouchableOpacity
          className="flex items-center space-y-1"
          key={index}>
          <View>
            <Image
              source={{
                uri: category.strCategoryThumb
              }}
              style={{
                width: heightPercentageToDP(5),
                height: heightPercentageToDP(5)
              }}
            />
          </View>
         <Text 
         style={{
          fontSize: hp(1.4)
         }}
         className="text-neutral-900">{category.strCategory}</Text>
        </TouchableOpacity>)}
      </ScrollView>
      <Text>Categories</Text>
    </View>
  )
}