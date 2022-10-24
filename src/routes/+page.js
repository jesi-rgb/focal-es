// @ts-nocheck

import fs from "fs";

function csvToObjs(data) {
  const lines = data.split(/\r\n|\n/);
  let [headings, ...entries] = lines;
  headings = headings.split(",");
  const objs = [];
  entries.map((entry) => {
    let obj = entry.split(",");
    objs.push(Object.fromEntries(headings.map((head, i) => [head, obj[i]])));
  });
  return objs;
}

let processData = (content) => {
  return csvToObjs(content);
};

/** @type {import('./$types').PageLoad} */
export function load(event) {
  let realData;
  const data = fs.readFileSync(
    "./static/focal-es.csv",
    "utf-8",
    (error, data) => {
      if (error) {
        throw error;
      }
      realData = processData(data);
    }
  );

  console.log(realData);

  return {
    realData: realData,
  };
}
