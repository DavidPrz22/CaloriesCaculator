export interface ConsumptionsApiResponse {
  items: Array<{
    id: number;
    calorias_consumidas: number;
    grasas_consumidas: number;
    proteinas_consumidas: number;
    carbohidratos_consumidos: number;
    timestamp: string;
    userId: number;
  }>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type itemsHistory = Array<{
    id: number;
    calorias_consumidas: number;
    grasas_consumidas: number;
    proteinas_consumidas: number;
    carbohidratos_consumidos: number;
    timestamp: string;
    userId: number;
  }>;
  
export interface ConsumptionDetailApiResponse {
  id: number;
  calorias_consumidas: number;
  grasas_consumidas: number;
  proteinas_consumidas: number;
  carbohidratos_consumidos: number;
  timestamp: string;
  userId: number;
  detalles: Array<{
    id: number;
    comidaId: number;
    cantidad_consumida: number;
    calorias_consumida: number;
    grasas_consumidas: number;
    proteinas_consumidas: number;
    carbohidratos_consumidos: number;
    dataConsumoId: number;
    comida: {
      id: number;
      FDCID: number;
      nameES: string;
      nameEN: string;
      medidaId: number;
    };
  }>;
}
