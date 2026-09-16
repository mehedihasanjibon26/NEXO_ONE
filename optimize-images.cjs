const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const folder = path.join(
  process.cwd(),
  "public",
  "images",
  "product"
);

const files = [
  "nexo-one-hero.png",
  "nexo-one-onyx.png",
  "nexo-one-chalk.png",
  "nexo-one-silver.png",
  "nexo-one-volt.png",
];

async function convert() {
  for (const file of files) {
    const input = path.join(folder, file);
    const output = path.join(
      folder,
      file.replace(".png", ".webp")
    );

    await sharp(input)
      .webp({
        quality: 90,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(output);

    const oldSize = fs.statSync(input).size / 1024 / 1024;
    const newSize = fs.statSync(output).size / 1024 / 1024;

    console.log(
      `${file}: ${oldSize.toFixed(2)} MB -> ${newSize.toFixed(2)} MB`
    );
  }
}

convert().catch((error) => {
  console.error(error);
  process.exit(1);
});
