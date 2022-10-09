// @ts-nocheck
import { particleOptions, elementOptions } from "./utils";

function rand(min, max) {
  return min + ~~(Math.random() * (max - min));
}

function fill(len, fn) {
  return Array(len)
    .fill()
    .map((_, i) => fn(i));
}

function getParticle() {
  return particleOptions[rand(0, particleOptions.length)];
}
function getElement() {
  return elementOptions[rand(0, elementOptions.length)];
}

function createRandomGarbage() {
  const numWords = rand(8, 12);
  return fill(numWords, () => {
    const numLetters = rand(3, 12);
    return fill(numLetters, () => String.fromCharCode(rand(97, 122))).join("");
  }).join(" ");
}

export default fill(10000, (i) => {
  return {
    key: `${i}`,
    particle: getParticle(),
    medium: Math.random() < 0.5 ? "Oral" : "Escrito",
    element: getElement(),
    direction: Math.random() < 0.5 ? "Derecha" : "Izquierda",
    example: createRandomGarbage(),
  };
});
