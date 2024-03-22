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
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});
function Meals({ meals, isLoading, recipeError, isSearchActive, searchTerm }) {
  const navigation = useNavigation();
  if (recipeError) {
    <Text>{recipeError}</Text>;
  }

  return (
    <Animated.View
      className="mx-4  space-y-4"
      entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
    >
      {meals?.length > 0 && !isSearchActive ? (
        <Text
          style={{
            fontSize: hp(2),
          }}
          className="font-semibold text-neutral-600"
        >
          {meals?.length} Recipes
        </Text>
      ) : isSearchActive ? (
        <Text>{`Search results for letter ${searchTerm}`}</Text>
      ) : (
        ""
      )}

      <Animated.View
        entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
      >
        {isLoading ? (
          <Loader size="large" style={styles.loader} />
        ) : meals?.length > 0 ? (
          <View style={styles.container}>
            {meals.map((meal, index) => (
              <View style={styles.row} key={index}>
                <MealCard meal={meal} />
                {/* Render another MealCard if it exists */}
                {index < meals.length - 1 && (
                  <MealCard meal={meals[index + 1]} />
                )}
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>
            No data found in this category. Please try again
          </Text>
        )}
      </Animated.View>
    </Animated.View>
  );
}
export default Meals;
