import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import Category from "../components/Category.js";
import { axiosInstance, CATEGORIES, FILTER } from "../libs/axios.js";
import Meals from "../components/Meals.js";
import Header from "../components/Header.js";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 12,
    paddingRight: 12,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    borderColor: "gray",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  submitButton: {
    marginLeft: 10,
  },
  categories: {
    marginTop: 10,
    marginBottom: 10,
  },
});
export default function HomeScreen() {
  const [isCategoryActive, setIsCategoryActive] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipeError, setRecipeError] = useState("");
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef(null);

  const handleGetRecipes = async (category = "Beef") => {
    setIsLoading(true);
    setIsSearchActive(false);
    try {
      const response = await axiosInstance(`${FILTER}?i=${category}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGetCategories = async () => {
    setIsCategoryLoading(true);
    try {
      const response = await axiosInstance(CATEGORIES);
      if (response) {
        setCategories(response?.data?.categories);
      }
    } catch (error) {
      console.log(error.message);
      setRecipeError(error.message);
    } finally {
      setIsCategoryLoading(false);
    }
  };
  useEffect(() => {
    handleGetCategories();
    handleGetRecipes();
  }, []);

  const handleCategoryChange = (category) => {
    setIsCategoryActive(category);
    handleGetRecipes(category);
  };
  const handleSearch = async () => {
    setIsSearchActive(true);
    try {
      if (!searchTerm) {
        console.log("search value is empty");
        return; // Exit if input value is empty
      }
      const response = await axiosInstance(`search.php?f=${searchTerm}`);
      console.log(response?.data);

      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="pt-12"
        >
          <Header />
          <View className="mx-4 mb-2 space-y-1">
            <View>
              <Text
                className="text-gray-900 font-bold"
                style={{
                  fontSize: heightPercentageToDP(3),
                }}
              >
                Your favourite Delicacies
              </Text>
            </View>
            <Text
              style={{
                fontSize: heightPercentageToDP(3),
              }}
              className="font-semibold"
            >
              Food you{" "}
              <Text
                style={{
                  color: "orange",
                  fontWeight: "semibold",
                }}
              >
                Love
              </Text>
            </Text>
          </View>
          {/* Search bar */}

          <View style={styles.searchWrapper}>
            <Feather name="search" size={18} color="gray" style={styles.icon} />
            <TextInput
              ref={searchInputRef}
              placeholderTextColor="gray"
              placeholder="Search  meal by first letter.."
              style={styles.input}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSearch}
            >
              <Feather name="arrow-right" size={18} color="black" />
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <View style={styles.categories}>
            <Category
              isCategoryActive={isCategoryActive}
              handleCategoryChange={handleCategoryChange}
              categories={categories}
              isCategoryLoading={isCategoryLoading}
              isSearchActive={isSearchActive}
              setSearchTerm={setSearchTerm}
            />
          </View>
          {/* Meals */}
          <View>
            <Meals
              meals={meals}
              isLoading={isLoading}
              recipeError={recipeError}
              isSearchActive={isSearchActive}
              searchTerm={searchTerm}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
