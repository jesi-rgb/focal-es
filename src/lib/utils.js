// @ts-nocheck
export function intersection(a, b) {
  const setA = new Set(a);
  return b.filter((value) => setA.has(value));
}

export const particleOptions = [
  "inclusive",
  "incluso",
  "ni aun",
  "ni siquiera",
  "también",
  "tampoco",
  "todavía",
];
export const mediumOptions = ["Oral", "Escrito"];
export const elementOptions = [
  "Sintagma verbal",
  "Sintagma nominal",
  "Sintagma pronominal",
  "Sintagma adjetival",
  "Sintagma adverbial",
  "Sintagma preposicional",
  "Oración",
  "Oración subordinada",
  "Cláusula de infinitivo",
  "Cláusula de gerundio",
  "Cláusula de participio",
  "Dentro de una perífrasis",
];
export const directionOptions = ["Derecha", "Izquierda"];
