"use strict";

const fs = require("fs");

let rawEmojis = fs.readFileSync("emojis.txt", "utf8");
rawEmojis = rawEmojis.split("###");

const emojis = [];

rawEmojis.forEach((line) => {
  const arr = line.trim().split("\n");
  const parsed = {
    name: "",
    description: "",
    illustration: "",
    emojis: [],
  };
  arr.forEach((x, index) => {
    x = x.trim();
    if (index == 0) {
      const rawTitle = x.split(" ");
      const [ill, ...rest] = rawTitle;
      parsed.name = rest.join(" ");
      parsed.illustration = ill;
    } else if (index == 1) {
      parsed.description = x;
    } else {
      const emoji = x.split(" ");
      const [e, ...name] = emoji;
      parsed.emojis.push({
        name: name.join(" "),
        emoji: e,
      });
    }
  });
  emojis.push(parsed);
});

const jsonEmojis = JSON.stringify(emojis, null, 2);
fs.writeFileSync("emojis.json", jsonEmojis, "utf8");
