import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Loader from "../components/Loader";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LOOKUP, axiosInstance } from "../libs/axios";
import { combinedIngredients } from "../utils/utils";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  imageWrapper: {
    width: heightPercentageToDP(100),
    height: heightPercentageToDP(50),
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  icon: {
    position: "absolute",
    left: 20,
    zIndex: 100,
  },
  ingredients: {
    boxShadow: "0 0 3px #777",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    margin: "auto",
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnWrapper: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 40,
  },
  start: {
    color: "white",
    textAlign: "center",
  },
});
export default function MealDetailsScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const { navigate } = useNavigation();
  const { id } = props.route.params;
  const getMealDetails = async (mealId) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance(`${LOOKUP}?i=${mealId}`);
      if (response && response?.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getMealDetails(id);
  }, [id]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Ionicons
        onPress={() => navigate("Home")}
        name="arrow-back"
        color="orange"
        size={25}
        style={styles.icon}
      />
      {isLoading ? (
        <Loader size="large" style={styles.loader} />
      ) : (
        <View>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{ uri: meals[0]?.strMealThumb }}
            />
          </View>
          <Animated.View
            className="space-y-2 px-4"
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
          >
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{
                fontSize: hp(2),
                color: "#00000",
              }}
            >
              {meals[0]?.strMeal}
            </Text>

            <Text
              style={{
                fontSize: hp(2),
              }}
              className="text-neutral-500 font-medium"
            >
              {meals[0]?.strArea}
            </Text>
          </Animated.View>
          <Animated.View style={styles.ingredients}>
            <View>
              <Text
                style={{
                  fontSize: hp(2.5),
                  color: "orange",
                }}
                className="font-bold flex-1 text-neutral-700"
              >
                Ingredients
              </Text>
              <View className="space-y-2 ml-3">
                {meals?.length > 0 && (
                  <View>
                    <Text> {combinedIngredients(meals[0]).join("\n")}</Text>
                  </View>
                )}
              </View>
            </View>
          </Animated.View>
          <Text
            className="font-bold flex-1 text-neutral-700"
            style={{
              fontSize: hp(2.5),
            }}
          >
            Instructions
          </Text>

          <Text
            className="text-neutral-700"
            style={{
              fontSize: hp(1.7),
            }}
          >
            {meals[0]?.strInstructions}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate("Home");
            }}
            style={styles.btnWrapper}
          >
            <Text style={styles.start}>Go back</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
