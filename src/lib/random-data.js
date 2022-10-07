// @ts-nocheck
function rand(min, max) {
  return min + ~~(Math.random() * (max - min));
}

function fill(len, fn) {
  return Array(len)
    .fill()
    .map((_, i) => fn(i));
}

function getParticle() {
  let options = [
    "inclusive",

    "incluso",

    "ni aun",

    "ni siquiera",

    "también",

    "tampoco",

    "todavía",
  ];

  return options[rand(0, options.length)];
}
function getElement() {
  let options = [
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

  return options[rand(0, options.length)];
}

export default fill(100000, (i) => {
  return {
    key: `${i}`,
    particle: getParticle(),
    medium: Math.random() < 0.5 ? "Oral" : "Escrito",
    element: getElement(),
    direction: Math.random() < 0.5 ? "Derecha" : "Izquierda",
  };
});
