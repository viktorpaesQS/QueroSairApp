// src/data/brands.js
export const brands = [
  { id: "chevrolet", name: "Chevrolet", models: ["Onix", "Prisma", "Tracker", "S10"] },
  { id: "volkswagen", name: "Volkswagen", models: ["Gol", "Polo", "T-Cross", "Saveiro"] },
  { id: "fiat", name: "Fiat", models: ["Argo", "Cronos", "Strada", "Toro"] },
  { id: "toyota", name: "Toyota", models: ["Corolla", "Yaris", "Hilux", "RAV4"] },
  { id: "honda", name: "Honda", models: ["Civic", "City", "HR-V", "Fit"] },
  { id: "renault", name: "Renault", models: ["Kwid", "Sandero", "Duster"] },
  { id: "peugeot", name: "Peugeot", models: ["208", "2008", "3008"] },
  { id: "bmw", name: "BMW", models: ["118i", "320i", "X1", "X3"] },
  { id: "mercedes", name: "Mercedes-Benz", models: ["A 200", "C 180", "GLA 200"] },
  { id: "audi", name: "Audi", models: ["A3", "A4", "Q3", "Q5"] },
];
// util simples
export const getModelsByBrand = (brandId) =>
  (brands.find(b => b.id === brandId)?.models || []).map(m => ({ id: m.toLowerCase().replace(/\s+/g, "-"), name: m }));
