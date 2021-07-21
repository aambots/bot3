const jdenticon = require("jdenticon");
const fs = require("fs");

const size = 200;
const value = "Liam";

const png = jdenticon.toPng(value, size);
fs.writeFileSync("./bot3.png", png);
