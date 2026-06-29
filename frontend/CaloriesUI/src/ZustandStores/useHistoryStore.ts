import { create } from "zustand";

export interface ConsumoDetalle {
  comidaId: number;
  cantidad_consumida: number;
  calorias_consumida: number;
  protein_consumida: number;
  carbs_consumida: number;
  fat_consumida: number;
}

export interface ConsumoRecord {
  id: string;
  timestamp: string;
  calorias_consumidas: number;
  protein_consumida: number;
  carbs_consumida: number;
  fat_consumida: number;
  detalles: ConsumoDetalle[];
}

interface HistoryStore {
  history: ConsumoRecord[];
  addRecord: (record: ConsumoRecord) => void;
}

export const useHistoryStore = create<HistoryStore>()((set) => ({
  history: [],
  addRecord: (record) =>
    set((state) => ({
      history: [record, ...state.history],
    })),
}));
