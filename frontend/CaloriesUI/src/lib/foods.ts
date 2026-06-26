export type Lang = "en" | "es";

export interface Categoria {
  id: number;
  nameES: string;
  nameEN: string;
}

export interface Medida {
  id: number;
  nameES: string;
  nameEN: string;
  abreviation: string;
}

export interface Comida {
  id: number;
  FDCID: number;
  nameES: string;
  nameEN: string;
  categoriaId: number;
  medidaId: number;
  /** kcal per 1 unit of its medida */
  caloriesPerUnit: number;
  /** grams of protein per 1 unit of its medida */
  proteinPerUnit: number;
  /** grams of carbs per 1 unit of its medida */
  carbsPerUnit: number;
  /** grams of fat per 1 unit of its medida */
  fatPerUnit: number;
}

export const categorias: Categoria[] = [
  { id: 1, nameEN: "Fruits", nameES: "Frutas" },
  { id: 2, nameEN: "Vegetables", nameES: "Verduras" },
  { id: 3, nameEN: "Grains", nameES: "Granos" },
  { id: 4, nameEN: "Proteins", nameES: "Proteínas" },
  { id: 5, nameEN: "Dairy", nameES: "Lácteos" },
  { id: 6, nameEN: "Beverages", nameES: "Bebidas" },
  { id: 7, nameEN: "Snacks", nameES: "Snacks" },
];

export const medidas: Medida[] = [
  { id: 1, nameEN: "Gram", nameES: "Gramo", abreviation: "g" },
  { id: 2, nameEN: "Milliliter", nameES: "Mililitro", abreviation: "ml" },
  { id: 3, nameEN: "Unit", nameES: "Unidad", abreviation: "u" },
  { id: 4, nameEN: "Cup", nameES: "Taza", abreviation: "cup" },
  { id: 5, nameEN: "Slice", nameES: "Rebanada", abreviation: "sl" },
];

export const comidas: Comida[] = [
  // Fruits
  { id: 1,  FDCID: 173944, nameEN: "Apple",        nameES: "Manzana",     categoriaId: 1, medidaId: 3, caloriesPerUnit: 95,  proteinPerUnit: 0.5,  carbsPerUnit: 25.0,  fatPerUnit: 0.3 },
  { id: 2,  FDCID: 173945, nameEN: "Banana",       nameES: "Plátano",     categoriaId: 1, medidaId: 3, caloriesPerUnit: 105, proteinPerUnit: 1.3,  carbsPerUnit: 27.0,  fatPerUnit: 0.4 },
  { id: 3,  FDCID: 169097, nameEN: "Orange",       nameES: "Naranja",     categoriaId: 1, medidaId: 3, caloriesPerUnit: 62,  proteinPerUnit: 1.2,  carbsPerUnit: 15.0,  fatPerUnit: 0.2 },
  { id: 4,  FDCID: 167762, nameEN: "Strawberry",   nameES: "Fresa",       categoriaId: 1, medidaId: 1, caloriesPerUnit: 0.32,proteinPerUnit: 0.01, carbsPerUnit: 0.08,  fatPerUnit: 0.003 },
  { id: 5,  FDCID: 173946, nameEN: "Grapes",       nameES: "Uvas",        categoriaId: 1, medidaId: 1, caloriesPerUnit: 0.69,proteinPerUnit: 0.01, carbsPerUnit: 0.18,  fatPerUnit: 0.002 },
  // Vegetables
  { id: 6,  FDCID: 170417, nameEN: "Broccoli",     nameES: "Brócoli",     categoriaId: 2, medidaId: 4, caloriesPerUnit: 55,  proteinPerUnit: 3.7,  carbsPerUnit: 11.0,  fatPerUnit: 0.6 },
  { id: 7,  FDCID: 170457, nameEN: "Carrot",       nameES: "Zanahoria",   categoriaId: 2, medidaId: 3, caloriesPerUnit: 25,  proteinPerUnit: 0.6,  carbsPerUnit: 6.0,   fatPerUnit: 0.1 },
  { id: 8,  FDCID: 168462, nameEN: "Spinach",      nameES: "Espinaca",    categoriaId: 2, medidaId: 4, caloriesPerUnit: 7,   proteinPerUnit: 0.9,  carbsPerUnit: 1.1,   fatPerUnit: 0.1 },
  { id: 9,  FDCID: 170000, nameEN: "Tomato",       nameES: "Tomate",      categoriaId: 2, medidaId: 3, caloriesPerUnit: 22,  proteinPerUnit: 1.1,  carbsPerUnit: 4.8,   fatPerUnit: 0.2 },
  { id: 10, FDCID: 170093, nameEN: "Potato",       nameES: "Papa",        categoriaId: 2, medidaId: 3, caloriesPerUnit: 161, proteinPerUnit: 4.3,  carbsPerUnit: 37.0,  fatPerUnit: 0.2 },
  // Grains
  { id: 11, FDCID: 168880, nameEN: "White Rice",   nameES: "Arroz Blanco",categoriaId: 3, medidaId: 4, caloriesPerUnit: 205, proteinPerUnit: 4.3,  carbsPerUnit: 45.0,  fatPerUnit: 0.4 },
  { id: 12, FDCID: 169704, nameEN: "Brown Rice",   nameES: "Arroz Integral",categoriaId: 3, medidaId: 4, caloriesPerUnit: 216,proteinPerUnit: 5.0,  carbsPerUnit: 45.0,  fatPerUnit: 1.8 },
  { id: 13, FDCID: 168917, nameEN: "Whole Wheat Bread", nameES: "Pan Integral", categoriaId: 3, medidaId: 5, caloriesPerUnit: 81,  proteinPerUnit: 4.0,  carbsPerUnit: 13.0,  fatPerUnit: 1.0 },
  { id: 14, FDCID: 168927, nameEN: "Pasta",        nameES: "Pasta",       categoriaId: 3, medidaId: 4, caloriesPerUnit: 220, proteinPerUnit: 8.0,  carbsPerUnit: 43.0,  fatPerUnit: 1.3 },
  { id: 15, FDCID: 170285, nameEN: "Oatmeal",      nameES: "Avena",       categoriaId: 3, medidaId: 4, caloriesPerUnit: 158, proteinPerUnit: 5.3,  carbsPerUnit: 27.0,  fatPerUnit: 3.2 },
  // Proteins
  { id: 16, FDCID: 171477, nameEN: "Chicken Breast", nameES: "Pechuga de Pollo", categoriaId: 4, medidaId: 1, caloriesPerUnit: 1.65, proteinPerUnit: 0.31, carbsPerUnit: 0.0,   fatPerUnit: 0.04 },
  { id: 17, FDCID: 173109, nameEN: "Beef Steak",   nameES: "Bistec de Res", categoriaId: 4, medidaId: 1, caloriesPerUnit: 2.71,proteinPerUnit: 0.26, carbsPerUnit: 0.0,   fatPerUnit: 0.19 },
  { id: 18, FDCID: 175167, nameEN: "Salmon",       nameES: "Salmón",      categoriaId: 4, medidaId: 1, caloriesPerUnit: 2.08,proteinPerUnit: 0.20, carbsPerUnit: 0.0,   fatPerUnit: 0.13 },
  { id: 19, FDCID: 173424, nameEN: "Egg",          nameES: "Huevo",       categoriaId: 4, medidaId: 3, caloriesPerUnit: 72,  proteinPerUnit: 6.3,  carbsPerUnit: 0.6,   fatPerUnit: 5.0 },
  { id: 20, FDCID: 174270, nameEN: "Tuna",         nameES: "Atún",        categoriaId: 4, medidaId: 1, caloriesPerUnit: 1.32,proteinPerUnit: 0.28, carbsPerUnit: 0.0,   fatPerUnit: 0.03 },
  { id: 21, FDCID: 174256, nameEN: "Black Beans",  nameES: "Frijoles Negros", categoriaId: 4, medidaId: 4, caloriesPerUnit: 227, proteinPerUnit: 15.0, carbsPerUnit: 41.0,  fatPerUnit: 0.9 },
  // Dairy
  { id: 22, FDCID: 171265, nameEN: "Whole Milk",   nameES: "Leche Entera",categoriaId: 5, medidaId: 2, caloriesPerUnit: 0.61,proteinPerUnit: 0.03, carbsPerUnit: 0.05,  fatPerUnit: 0.03 },
  { id: 23, FDCID: 173441, nameEN: "Greek Yogurt", nameES: "Yogur Griego",categoriaId: 5, medidaId: 1, caloriesPerUnit: 0.59,proteinPerUnit: 0.10, carbsPerUnit: 0.04,  fatPerUnit: 0.003 },
  { id: 24, FDCID: 173414, nameEN: "Cheddar Cheese", nameES: "Queso Cheddar", categoriaId: 5, medidaId: 1, caloriesPerUnit: 4.04,proteinPerUnit: 0.25, carbsPerUnit: 0.01,  fatPerUnit: 0.33 },
  { id: 25, FDCID: 173430, nameEN: "Butter",       nameES: "Mantequilla", categoriaId: 5, medidaId: 1, caloriesPerUnit: 7.17,proteinPerUnit: 0.01, carbsPerUnit: 0.01,  fatPerUnit: 0.81 },
  // Beverages
  { id: 26, FDCID: 174718, nameEN: "Orange Juice", nameES: "Jugo de Naranja", categoriaId: 6, medidaId: 2, caloriesPerUnit: 0.45,proteinPerUnit: 0.007,carbsPerUnit: 0.10,  fatPerUnit: 0.002 },
  { id: 27, FDCID: 171890, nameEN: "Coffee",       nameES: "Café",        categoriaId: 6, medidaId: 2, caloriesPerUnit: 0.01,proteinPerUnit: 0.001,carbsPerUnit: 0.001, fatPerUnit: 0.0 },
  // Snacks
  { id: 28, FDCID: 170567, nameEN: "Almonds",      nameES: "Almendras",   categoriaId: 7, medidaId: 1, caloriesPerUnit: 5.79,proteinPerUnit: 0.21, carbsPerUnit: 0.22,  fatPerUnit: 0.50 },
  { id: 29, FDCID: 170178, nameEN: "Dark Chocolate", nameES: "Chocolate Oscuro", categoriaId: 7, medidaId: 1, caloriesPerUnit: 5.46,proteinPerUnit: 0.05, carbsPerUnit: 0.61,  fatPerUnit: 0.32 },
  { id: 30, FDCID: 170270, nameEN: "Peanut Butter",nameES: "Mantequilla de Maní", categoriaId: 7, medidaId: 1, caloriesPerUnit: 5.88,proteinPerUnit: 0.25, carbsPerUnit: 0.20,  fatPerUnit: 0.50 },
];

export function getCategoria(id: number) {
  return categorias.find((c) => c.id === id)!;
}
export function getMedida(id: number) {
  return medidas.find((m) => m.id === id)!;
}
export function nameOf<T extends { nameEN: string; nameES: string }>(item: T, lang: Lang) {
  return lang === "es" ? item.nameES : item.nameEN;
}
