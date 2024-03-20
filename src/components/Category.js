import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-reanimated'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export default function Category({categories, isCategoryActive, handleCategory }) {
  return (
    <View>
      <ScrollView horizontal
        showsHorizontalScrollIndicator
        className=""
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
      >
        {categories?.map((category, index) => <TouchableOpacity
          className="flex items-center space-y-1"
          key={index}>
          <View className ={ category.strCategory === isCategoryActive ? "bg-orange rounded-xl" :"rounded-xl bg white"}>
            <Image
            onPress ={() => handleCategory(category?.strCategory)}
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
