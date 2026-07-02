import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./foods";

type Dict = Record<string, { en: string; es: string }>;

const dict = {
  appName:        { en: "NutriLedger", es: "NutriLedger" },
  tagline:        { en: "Track every bite, mindfully.", es: "Registra cada bocado, con conciencia." },
  menu:           { en: "Menu", es: "Menú" },
  language:       { en: "Language", es: "Idioma" },
  english:        { en: "English", es: "Inglés" },
  spanish:        { en: "Spanish", es: "Español" },
  home:           { en: "Search foods", es: "Buscar alimentos" },
  history:        { en: "Consumption history", es: "Historial de consumo" },
  foodsDb:        { en: "Foods in database", es: "Alimentos registrados" },
  searchPlaceholder: { en: "Search a food…", es: "Busca un alimento…" },
  allCategories:  { en: "All categories", es: "Todas las categorías" },
  noResults:      { en: "No matches yet — keep typing.", es: "Sin coincidencias — sigue escribiendo." },
  startTyping:    { en: "Start typing to find foods.", es: "Empieza a escribir para buscar alimentos." },
  add:            { en: "Add", es: "Agregar" },
  create:         { en: "Create New", es: "Crear Nuevo" },
  yourPlate:      { en: "Your plate", es: "Tu plato" },
  emptyPlate:     { en: "Selected foods will appear here.", es: "Los alimentos seleccionados aparecerán aquí." },
  amount:         { en: "Amount", es: "Cantidad" },
  calculate:      { en: "Calculate calories", es: "Calcular calorías" },
  results:        { en: "Results", es: "Resultados" },
  food:           { en: "Food", es: "Alimento" },
  consumed:       { en: "Consumed", es: "Consumido" },
  calories:       { en: "Calories", es: "Calorías" },
  total:          { en: "Total", es: "Total" },
  record:         { en: "Save this entry", es: "Guardar este registro" },
  saved:          { en: "Saved to history", es: "Guardado en el historial" },
  backHome:       { en: "Back to search", es: "Volver a buscar" },
  category:       { en: "Select Category", es: "Selecciona una Categoría" },
  measure:        { en: "Measure", es: "Medida" },
  calPerUnit:     { en: "kcal / unit", es: "kcal / unidad" },
  noHistory:      { en: "No recordings yet. Calculate a meal and save it.", es: "Aún no hay registros. Calcula una comida y guárdala." },
  date:           { en: "Date", es: "Fecha" },
  items:          { en: "Items", es: "Elementos" },
  remove:         { en: "Remove", es: "Quitar" },
  invalidAmount:  { en: "Enter a positive number", es: "Ingresa un número positivo" },
  selectFirst:    { en: "Add at least one food first.", es: "Agrega al menos un alimento." },
  kcal:           { en: "kcal", es: "kcal" },
  protein:        { en: "Protein", es: "Proteína" },
  carbs:          { en: "Carbs", es: "Carbohidratos" },
  fat:            { en: "Fat", es: "Grasa" },
  consumption:    { en: "Consumption", es: "Consumo" },
  totalCalories:  { en: "Total Calories", es: "Calorías Totales" },
  totalProtein:   { en: "Total Protein", es: "Proteínas Totales" },
  totalCarbs:     { en: "Total Carbs", es: "Carbohidratos Totales" },
  totalFat:       { en: "Total Fat", es: "Grasas Totales" },
  dateTime:       { en: "Date & Time", es: "Fecha y Hora" },
  viewDetails:    { en: "View Details", es: "Ver Detalles" },
  deleteConsumption: { en: "Delete", es: "Eliminar" },
  confirmDelete:  { en: "Delete consumption record?", es: "¿Eliminar registro de consumo?" },
  confirmDeleteDesc: { en: "This action cannot be undone.", es: "Esta acción no se puede deshacer." },
  consumptionDetail: { en: "Consumption Detail", es: "Detalle de Consumo" },
  quantity:       { en: "Quantity", es: "Cantidad" },
  per100g:        { en: "per 100g", es: "por 100g" },
  per100ml:       { en: "per 100ml", es: "por 100ml" },
  noConsumptions: { en: "No consumption records found.", es: "No se encontraron registros de consumo." },
  clearFilters:   { en: "Clear Filters", es: "Limpiar Filtros" },
  fromDate:       { en: "From", es: "Desde" },
  toDate:         { en: "To", es: "Hasta" },
  page:           { en: "Page", es: "Página" },
  of:             { en: "of", es: "de" },
  previous:       { en: "Previous", es: "Anterior" },
  next:           { en: "Next", es: "Siguiente" },
  macros:         { en: "Macros", es: "Macros" },
  basedOn:        { en: "Values based on", es: "Valores basados en" },
  login:          { en: "Login", es: "Iniciar sesión" },
  signup:         { en: "Sign up", es: "Registrarse" },
  username:       { en: "Username", es: "Usuario" },
  password:       { en: "Password", es: "Contraseña" },
  logout:         { en: "Logout", es: "Cerrar sesión" },
  noAccount:      { en: "Don't have an account?", es: "¿No tienes cuenta?" },
  hasAccount:     { en: "Already have an account?", es: "¿Ya tienes cuenta?" },
  loginDesc:      { en: "Enter your credentials to continue", es: "Ingresa tus credenciales para continuar" },
  signupDesc:     { en: "Create an account to get started", es: "Crea una cuenta para comenzar" },
  loggingIn:      { en: "Logging in...", es: "Iniciando sesión..." },
  signingUp:      { en: "Creating account...", es: "Creando cuenta..." },
} satisfies Dict;

export type DictKey = keyof typeof dict;

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (stored === "en" || stored === "es") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: DictKey) => dict[k][lang];

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used within I18nProvider");
  return v;
}
