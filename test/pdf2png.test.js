const fs = require("fs");
const { convert } = require("../src/pdf2png");
const pdf = require("./pdfBase64");
test("Convert pdf to image", async () => {
  const image = await convert(pdf);
  expect(image[0]).toHaveProperty("base64");
  image.map(x => x.base64).forEach(createFile);
});

const createFile = (text, name) => {
  fs.writeFileSync(`${__dirname}/image_${name}.txt`, text);
};
