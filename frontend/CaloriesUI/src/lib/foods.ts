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

export function nameOf<T extends { nameEN: string; nameES: string }>(item: T, lang: Lang) {
  return lang === "es" ? item.nameES : item.nameEN;
}

export const categorias: Categoria[] = [
  { id: 1, nameEN: "Fruits", nameES: "Frutas" },
  { id: 2, nameEN: "Vegetables", nameES: "Verduras" },
  { id: 3, nameEN: "Meats", nameES: "Carnes" },
];

export const medidas: Medida[] = [
  { id: 1, nameEN: "Piece", nameES: "Pieza", abreviation: "pz" },
  { id: 2, nameEN: "Gram", nameES: "Gramo", abreviation: "g" },
];

export const comidas: Comida[] = [
  {
    id: 1,
    FDCID: 11090,
    nameEN: "Apple",
    nameES: "Manzana",
    categoriaId: 1,
    medidaId: 1,
    caloriesPerUnit: 95,
    proteinPerUnit: 0.5,
    carbsPerUnit: 25,
    fatPerUnit: 0.3,
  },
  {
    id: 2,
    FDCID: 11215,
    nameEN: "Broccoli",
    nameES: "Brócoli",
    categoriaId: 2,
    medidaId: 2,
    caloriesPerUnit: 0.34,
    proteinPerUnit: 0.028,
    carbsPerUnit: 0.066,
    fatPerUnit: 0.004,
  },
];

export function getMedida(id: number): Medida {
  return medidas.find((m) => m.id === id) || medidas[0];
}

export function getCategoria(id: number): Categoria {
  return categorias.find((c) => c.id === id) || categorias[0];
}
