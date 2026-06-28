
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
  categoria: Categoria;
  medida: Medida;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type BackendLang = "EN" | "ES";

export function toBackendLang(lang: Lang): BackendLang {
  return lang === "en" ? "EN" : "ES";
}

export type PlateEntry = Pick<Comida, "nameEN" | "nameES" | "calories" | "protein" | "carbs" | "fat" | "categoria"> & {
  amount: number;
  medidaAbreviation: string;
};