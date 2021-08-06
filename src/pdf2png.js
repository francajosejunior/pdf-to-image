const { fromBase64 } = require("pdf2pic");
const fs = require("fs");

module.exports.convert = pdf => {
  const options = {
    density: 100,
    //saveFilename: "untitled",
    format: "png",
  };

  return fromBase64(safeInput(pdf), options)
    .bulk(-1, true)
    .then(safeArray)
    .then(mapResult)
    .then(createFiles);
};

const safeInput = strBase64 =>
  strBase64.replace(/data:.*\/.*;base64,(.*)/gi, "$1");

const safeArray = x => {
  return !x.map ? [x] : x;
};

const mapResult = x =>
  x.map(x => ({ ...x, base64: `data:image/png;base64,${x.base64}` }));

const createFiles = x => x.map(createFile);

const createFile = (item, index) => {
  if (process.env.NODE_ENV === "development")
    fs.writeFileSync(`${__dirname}/image_${index}.txt`, item.base64);

  return item;
};
