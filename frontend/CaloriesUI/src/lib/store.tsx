import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface PlateItem {
  comidaId: number;
  amount: number; // user-entered units of the medida
}

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

interface StoreCtx {
  plate: PlateItem[];
  addToPlate: (comidaId: number) => void;
  setAmount: (comidaId: number, amount: number) => void;
  removeFromPlate: (comidaId: number) => void;
  clearPlate: () => void;
  history: ConsumoRecord[];
  saveRecord: (record: Omit<ConsumoRecord, "id" | "timestamp">) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

const PLATE_KEY = "nutri.plate";
const HISTORY_KEY = "nutri.history";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [plate, setPlate] = useState<PlateItem[]>([]);
  const [history, setHistory] = useState<ConsumoRecord[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const p = localStorage.getItem(PLATE_KEY);
      if (p) setPlate(JSON.parse(p));
      const h = localStorage.getItem(HISTORY_KEY);
      if (h) setHistory(JSON.parse(h));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(PLATE_KEY, JSON.stringify(plate));
  }, [plate]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addToPlate = (comidaId: number) => {
    setPlate((p) => (p.some((i) => i.comidaId === comidaId) ? p : [...p, { comidaId, amount: 1 }]));
  };
  const setAmount = (comidaId: number, amount: number) => {
    setPlate((p) => p.map((i) => (i.comidaId === comidaId ? { ...i, amount } : i)));
  };
  const removeFromPlate = (comidaId: number) => {
    setPlate((p) => p.filter((i) => i.comidaId !== comidaId));
  };
  const clearPlate = () => setPlate([]);

  const saveRecord: StoreCtx["saveRecord"] = (record) => {
    const r: ConsumoRecord = {
      ...record,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    setHistory((h) => [r, ...h]);
  };

  return (
    <Ctx.Provider value={{ plate, addToPlate, setAmount, removeFromPlate, clearPlate, history, saveRecord }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used within StoreProvider");
  return v;
}
