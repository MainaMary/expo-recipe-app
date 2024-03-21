import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

function Category({categories, isCategoryActive, handleCategoryChange }) {
  return (
    <View>
      <ScrollView horizontal
        showsHorizontalScrollIndicator
        className=""
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
      >
        {categories?.map((category, index) => {
          console.log({category})
          return(
             <TouchableOpacity
          className="flex items-center space-y-1"
          key={index}
           onPress ={() => handleCategoryChange(category?.strCategory)}>
          <View 
          
           style={{backgroundColor : category.strCategory == isCategoryActive ? 'orange':'',
           borderRadius: 10
           }}
          className ={ category.strCategory == isCategoryActive ? "bg-orange rounded-xl" :"rounded-xl bg white"}>
            <Image
              source={{
                uri: category.strCategoryThumb
              }}
              style={{
                width: hp(5),
                height: hp(5)
              }}
            />
          </View>
         <Text 
         style={{
          fontSize: hp(1.4)
         }}
         className="text-neutral-900">{category.strCategory}</Text>
        </TouchableOpacity>
          )
        }
       )}
      </ScrollView>
      <Text>Categories</Text>
    </View>
  )
}
export default Category