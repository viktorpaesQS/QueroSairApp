import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

export const SUPPORTED = [
  { code: "pt", label: "Português (PT)" },
  { code: "pt-BR", label: "Português (BR)" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "العربية" },
  { code: "it", label: "Italiano" },
];

const M = {
  en: {
    "vehicles.title": "Vehicles",
    "garages.title": "Garages",
    "form.type": "Type",
    "form.brand": "Brand",
    "form.model": "Model",
    "form.plate": "Plate",
    "form.color": "Color",
    "form.year": "Year",
    "form.addVehicle": "Add vehicle",
    "form.addGarage": "Add garage",
    "required.all": "Fill all required fields",
    "garage.name": "Garage name",
    "garage.address": "Address",
    "garage.notes": "Notes",
  },
  pt: {
    "vehicles.title": "Veículos",
    "garages.title": "Garagens",
    "form.type": "Tipo",
    "form.brand": "Marca",
    "form.model": "Modelo",
    "form.plate": "Matrícula",
    "form.color": "Cor",
    "form.year": "Ano",
    "form.addVehicle": "Adicionar veículo",
    "form.addGarage": "Adicionar garagem",
    "required.all": "Preencha os campos obrigatórios",
    "garage.name": "Nome da garagem",
    "garage.address": "Endereço",
    "garage.notes": "Notas",
  },
  "pt-BR": {
    "vehicles.title": "Veículos",
    "garages.title": "Garagens",
    "form.type": "Tipo",
    "form.brand": "Marca",
    "form.model": "Modelo",
    "form.plate": "Placa",
    "form.color": "Cor",
    "form.year": "Ano",
    "form.addVehicle": "Adicionar veículo",
    "form.addGarage": "Adicionar garagem",
    "required.all": "Preencha os campos obrigatórios",
    "garage.name": "Nome da garagem",
    "garage.address": "Endereço",
    "garage.notes": "Observações",
  },
  es: {
    "vehicles.title": "Vehículos",
    "garages.title": "Garajes",
    "form.type": "Tipo",
    "form.brand": "Marca",
    "form.model": "Modelo",
    "form.plate": "Placa",
    "form.color": "Color",
    "form.year": "Año",
    "form.addVehicle": "Agregar vehículo",
    "form.addGarage": "Agregar garaje",
    "required.all": "Complete los campos obligatorios",
    "garage.name": "Nombre del garaje",
    "garage.address": "Dirección",
    "garage.notes": "Notas",
  },
  fr: {
    "vehicles.title": "Véhicules",
    "garages.title": "Garages",
    "form.type": "Type",
    "form.brand": "Marque",
    "form.model": "Modèle",
    "form.plate": "Plaque",
    "form.color": "Couleur",
    "form.year": "Année",
    "form.addVehicle": "Ajouter un véhicule",
    "form.addGarage": "Ajouter un garage",
    "required.all": "Remplissez les champs obligatoires",
    "garage.name": "Nom du garage",
    "garage.address": "Adresse",
    "garage.notes": "Notes",
  },
  zh: {
    "vehicles.title": "车辆",
    "garages.title": "车库",
    "form.type": "类型",
    "form.brand": "品牌",
    "form.model": "型号",
    "form.plate": "车牌",
    "form.color": "颜色",
    "form.year": "年份",
    "form.addVehicle": "添加车辆",
    "form.addGarage": "添加车库",
    "required.all": "请填写必填字段",
    "garage.name": "车库名称",
    "garage.address": "地址",
    "garage.notes": "备注",
  },
  ar: {
    "vehicles.title": "المركبات",
    "garages.title": "الكراجات",
    "form.type": "النوع",
    "form.brand": "العلامة",
    "form.model": "الطراز",
    "form.plate": "اللوحة",
    "form.color": "اللون",
    "form.year": "السنة",
    "form.addVehicle": "إضافة مركبة",
    "form.addGarage": "إضافة كراج",
    "required.all": "يرجى ملء الحقول المطلوبة",
    "garage.name": "اسم الكراج",
    "garage.address": "العنوان",
    "garage.notes": "ملاحظات",
  },
  it: {
    "vehicles.title": "Veicoli",
    "garages.title": "Garage",
    "form.type": "Tipo",
    "form.brand": "Marca",
    "form.model": "Modello",
    "form.plate": "Targa",
    "form.color": "Colore",
    "form.year": "Anno",
    "form.addVehicle": "Aggiungi veicolo",
    "form.addGarage": "Aggiungi garage",
    "required.all": "Compila i campi obbligatori",
    "garage.name": "Nome garage",
    "garage.address": "Indirizzo",
    "garage.notes": "Note",
  },
};

const I18nCtx = createContext({
  t: (k) => k,
  locale: "en",
  setLocale: () => {},
  SUPPORTED,
});

function detect() {
  const saved = localStorage.getItem("qs_locale");
  if (saved) return saved;
  const nav = navigator.language || "en";
  if (M[nav]) return nav;
  const base = nav.split("-")[0];
  if (M[base]) return base;
  return "en";
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(detect);

  useEffect(() => {
    localStorage.setItem("qs_locale", locale);
    document.documentElement.lang = locale;
    // RTL básico para árabe
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const t = useMemo(() => {
    const table = M[locale] || M.en;
    return (key) => table[key] ?? M.en[key] ?? key;
  }, [locale]);

  const value = useMemo(() => ({ t, locale, setLocale, SUPPORTED }), [t, locale]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  return useContext(I18nCtx);
}
