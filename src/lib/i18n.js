import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const DEFAULT = "pt";
const SUPPORTED = ["pt","pt-BR","en","es","fr","zh","ar","de"];

const dict = {
  // chaves mínimas que usamos nas telas de veículos/garagens/dashboard
  "vehicles.title": { pt:"Veículos", "pt-BR":"Veículos", en:"Vehicles", es:"Vehículos", fr:"Véhicules", zh:"车辆", ar:"المركبات", de:"Fahrzeuge" },
  "garages.title":  { pt:"Garagens", "pt-BR":"Garagens", en:"Garages", es:"Garajes", fr:"Garages", zh:"车库", ar:"الكراجات", de:"Garagen" },
  "form.type":   { pt:"Tipo", "pt-BR":"Tipo", en:"Type", es:"Tipo", fr:"Type", zh:"类型", ar:"النوع", de:"Typ" },
  "form.brand":  { pt:"Marca", "pt-BR":"Marca", en:"Brand", es:"Marca", fr:"Marque", zh:"品牌", ar:"العلامة", de:"Marke" },
  "form.model":  { pt:"Modelo", "pt-BR":"Modelo", en:"Model", es:"Modelo", fr:"Modèle", zh:"型号", ar:"الطراز", de:"Modell" },
  "form.plate":  { pt:"Matrícula", "pt-BR":"Placa", en:"Plate", es:"Placa", fr:"Immatriculation", zh:"车牌", ar:"اللوحة", de:"Kennzeichen" },
  "form.color":  { pt:"Cor", "pt-BR":"Cor", en:"Color", es:"Color", fr:"Couleur", zh:"颜色", ar:"اللون", de:"Farbe" },
  "form.year":   { pt:"Ano", "pt-BR":"Ano", en:"Year", es:"Año", fr:"Année", zh:"年份", ar:"السنة", de:"Baujahr" },
  "form.addVehicle": { pt:"Adicionar veículo", "pt-BR":"Adicionar veículo", en:"Add Vehicle", es:"Agregar vehículo", fr:"Ajouter véhicule", zh:"添加车辆", ar:"إضافة مركبة", de:"Fahrzeug hinzufügen" },
  "form.addGarage":  { pt:"Adicionar garagem", "pt-BR":"Adicionar garagem", en:"Add Garage", es:"Agregar garaje", fr:"Ajouter garage", zh:"添加车库", ar:"إضافة كراج", de:"Garage hinzufügen" },
  "garage.name":   { pt:"Nome", "pt-BR":"Nome", en:"Name", es:"Nombre", fr:"Nom", zh:"名称", ar:"الاسم", de:"Name" },
  "garage.address":{ pt:"Endereço", "pt-BR":"Endereço", en:"Address", es:"Dirección", fr:"Adresse", zh:"地址", ar:"العنوان", de:"Adresse" },
  "garage.notes":  { pt:"Notas", "pt-BR":"Notas", en:"Notes", es:"Notas", fr:"Notes", zh:"备注", ar:"ملاحظات", de:"Notizen" },
  "required.all":  { pt:"Preencha todos os campos obrigatórios.", "pt-BR":"Preencha todos os campos obrigatórios.", en:"Please fill all required fields.", es:"Complete todos los campos obligatorios.", fr:"Veuillez remplir tous les champs obligatoires.", zh:"请填写所有必填字段。", ar:"يرجى تعبئة جميع الحقول المطلوبة.", de:"Bitte alle Pflichtfelder ausfüllen." },
  "parking.save":  { pt:"Salvar local", "pt-BR":"Salvar local", en:"Save location", es:"Guardar ubicación", fr:"Enregistrer l'emplacement", zh:"保存位置", ar:"حفظ الموقع", de:"Standort speichern" },
  "parking.update":{ pt:"Atualizar", "pt-BR":"Atualizar", en:"Update", es:"Actualizar", fr:"Mettre à jour", zh:"更新", ar:"تحديث", de:"Aktualisieren" },
  "parking.clear": { pt:"Limpar", "pt-BR":"Limpar", en:"Clear", es:"Borrar", fr:"Effacer", zh:"清除", ar:"مسح", de:"Löschen" },
};

const I18nCtx = createContext({ t: (k)=>k, locale: DEFAULT, setLocale: ()=>{} });

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => localStorage.getItem("queroSair_locale") || DEFAULT);

  useEffect(() => {
    if (!SUPPORTED.includes(locale)) setLocaleState(DEFAULT);
  }, [locale]);

  useEffect(() => {
    localStorage.setItem("queroSair_locale", locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = (locale === "ar") ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = (l) => setLocaleState(SUPPORTED.includes(l) ? l : DEFAULT);

  const t = (key) => dict[key]?.[locale] || dict[key]?.en || key;
  const value = useMemo(() => ({ t, locale, setLocale, SUPPORTED }), [t, locale]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
