import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Loader from "./Loader";
const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: "center",
    margin: 10,
  },
  selectedCategoryContainer: {
    backgroundColor: "orange",
    borderRadius: 10,
  },
  imageContainer: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    overflow: "hidden",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  categoryName: {
    fontSize: hp(1.4),
    color: "black",
    marginTop: 5,
    marginBottom: 5,
  },
  loader: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});
function Category({
  categories,
  isCategoryActive,
  handleCategoryChange,
  isCategoryLoading,
  isSearchActive,
  setSearchTerm,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handlePress = (index, category) => {
    setSearchTerm("");
    setSelectedIndex(index);
    handleCategoryChange(category);
  };
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          display: "gap",
          gap: 10,
          marginTop: 5,
          marginBottom: 5,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {isCategoryLoading ? (
          <Loader size="large" style={styles.loader} />
        ) : (
          categories?.map((category, index) => {
            return (
              <TouchableOpacity
                className="flex items-center space-y-1"
                key={index}
                onPress={() => handlePress(index, category?.strCategory)}
              >
                <View
                  style={{
                    backgroundColor:
                      category.strCategory == isCategoryActive &&
                      selectedIndex == index &&
                      !isSearchActive
                        ? "orange"
                        : "white",
                    borderRadius: 10,
                    padding: 4,
                    width: hp(8),
                    height: hp(8),
                  }}
                >
                  <Image
                    source={{
                      uri: category.strCategoryThumb,
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.categoryName}>
                    {category.strCategory}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      {categories?.length > 0 && !isSearchActive && (
        <Text
          style={{
            fontSize: hp(1.8),
          }}
          className="font-semibold"
        >
          Category:{" "}
          <Text
            style={{
              color: "orange",
              fontWeight: "semibold",
            }}
          >
            {isCategoryActive}
          </Text>
        </Text>
      )}
    </View>
  );
}
export default Category;
