import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MealCard from "./MealCard";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Loader from "./Loader";
import Animated, { FadeInDown } from "react-native-reanimated";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
function Meals({ meals, categories }) {
  const navigation = useNavigation();

  return (
    <Animated.View
      className="mx-4  space-y-4"
      entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
    >
      <Text
        style={{
          fontSize: hp(2),
        }}
        className="font-semibold text-neutral-600"
      >
        {meals?.length} Recipes
      </Text>

      <Animated.View
        entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
      >
        {categories?.length == 0 || meals?.length == 0 ? (
          <Loader size="large" className="mt-20" />
        ) : (
          <View style={styles.container}>
            {meals?.map((meal, index) => (
              <View style={styles.row} key={index}>
                <MealCard meal={meal} />
                {/* Render another MealCard if it exists */}
                {meals?.length > 0 && <MealCard meal={meals[index + 1]} />}
              </View>
            ))}
          </View>
        )}
      </Animated.View>
    </Animated.View>
  );
}
export default Meals;
