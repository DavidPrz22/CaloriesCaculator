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
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  categoria?: Categoria;
  medida?: Medida;
}

export interface PaginatedComidas {
  items: Comida[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
