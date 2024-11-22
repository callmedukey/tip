import sharp from "sharp";
import * as fs from "fs";

async function generateSplashScreens() {
  const sizes = [
    { width: 2048, height: 2732 },
    { width: 2732, height: 2048 },
    { width: 1668, height: 2388 },
    { width: 2388, height: 1668 },
    { width: 1536, height: 2048 },
    { width: 2048, height: 1536 },
    { width: 1668, height: 2224 },
    { width: 2224, height: 1668 },
    { width: 1620, height: 2160 },
    { width: 2160, height: 1620 },
    { width: 1290, height: 2796 },
    { width: 2796, height: 1290 },
    { width: 1179, height: 2556 },
    { width: 2556, height: 1179 },
    { width: 1284, height: 2778 },
    { width: 2778, height: 1284 },
    { width: 1170, height: 2532 },
    { width: 2532, height: 1170 },
    { width: 1125, height: 2436 },
    { width: 2436, height: 1125 },
    { width: 1242, height: 2688 },
    { width: 2688, height: 1242 },
  ];

  fs.mkdir("./public/splash", (err) => {
    if (err) {
      console.error("Error creating directory:", err);
    }
  });

  for (const size of sizes) {
    await sharp({
      create: {
        width: size.width,
        height: size.height,
        channels: 4,
        background: { r: 24, g: 157, b: 251 }, // #189DFB
      },
    })
      .jpeg({ quality: 100 })
      .toFile(`./public/splash/apple-splash-${size.width}-${size.height}.jpg`);
  }
}

generateSplashScreens();
