// @ts-nocheck
export function intersection(a, b) {
  const setA = new Set(a);
  return b.filter((value) => setA.has(value));
}

// https://www.consolelog.io/group-by-in-javascript/
Array.prototype.groupBy = function (prop) {
  return this.reduce(function (groups, item) {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
};

// https://stackoverflow.com/questions/56602742/javascript-use-reduce-to-construct-a-function-intersection-that-compares-inp
export function intersections(arrays) {
  return arrays.reduce((a, b) => {
    const set = new Set(b);
    return a.filter((c) => set.has(c));
  });
}

export function tsvToObjs(data) {
  const lines = data.split(/\r\n|\n/);
  let [headings, ...entries] = lines;
  headings = headings.split("\t");
  const objs = [];
  entries.map((entry) => {
    let obj = entry.split("\t");
    objs.push(Object.fromEntries(headings.map((head, i) => [head, obj[i]])));
  });
  return objs;
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
