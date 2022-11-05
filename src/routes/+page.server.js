// @ts-nocheck

import fs from "fs";

export function load() {
  let data = fs.readFileSync("./focal-es.tsv", "utf-8", (error, data) => {
    if (error) throw error;
    return data;
  });

  return { data };
}
