import { create } from "zustand";

export interface ConsumoDetalle {
  id: number;
  comidaId: number;
  cantidad_consumida: number;
  calorias_consumida: number;
  protein_consumida: number;
  carbs_consumida: number;
  fat_consumida: number;
  dataConsumoId: number;
  comida?: {
    id: number;
    FDCID: number;
    nameES: string;
    nameEN: string;
    medidaId: number;
  };
}

export interface ConsumoRecord {
  id: number;
  timestamp: string;
  calorias_consumidas: number;
  protein_consumida: number;
  carbs_consumida: number;
  fat_consumida: number;
  detalles: ConsumoDetalle[];
}

interface HistoryStore {
  history: ConsumoRecord[];
  loading: boolean;
  addRecord: (record: ConsumoRecord) => void;
  setHistory: (records: ConsumoRecord[]) => void;
  removeRecord: (id: number) => void;
}

export const useHistoryStore = create<HistoryStore>()((set) => ({
  history: [],
  loading: false,
  addRecord: (record) =>
    set((state) => ({
      history: [record, ...state.history],
    })),
  setHistory: (records) => set({ history: records }),
  removeRecord: (id) =>
    set((state) => ({
      history: state.history.filter((r) => r.id !== id),
    })),
}));
