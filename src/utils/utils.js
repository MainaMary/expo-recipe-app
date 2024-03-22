export function combinedIngredients(data) {
  const ingredients = [];
  const measurements = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (data[ingredientKey] && data[measureKey]) {
      ingredients.push(data[ingredientKey]);
      measurements.push(data[measureKey]);
    }
  }

  // Combine the ingredients and measurements
  const combinedIngredients = ingredients.map((ingredient, index) => {
    return `  ${measurements[index]} ${ingredient}`;
  });

  return combinedIngredients;
}
