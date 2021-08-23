const puppeteer = require("puppeteer");
const fs = require("fs");
const request = require("request");
const { exec } = require("child_process");

exports.scrape = async (req, res, html) => {
  const dataObj = {
    profileName: null,
    profilePhoto: null,
    profileInfo: [],
    images: [],
    imagesCount: null
  };
  try {
    const instagram = {
      browser: null,
      page: null,
      initialize: async () => {
        instagram.browser = await puppeteer.launch({
          headless: false
        });
        instagram.page = await instagram.browser.newPage();
      },
      login: async () => {
        await instagram.page.goto(process.env.NODE_APP_BASE_URL, {
          waitUntil: ["load", "networkidle0"]
        });

        await instagram.page.type(
          'input[name="username"]',
          process.env.NODE_APP_INSTAGRAM_USERNAME,
          { delay: 50 }
        );

        await instagram.page.type(
          'input[name="password"]',
          process.env.NODE_APP_INSTAGRAM_PASSWORD,
          {
            delay: 50
          }
        );

        await instagram.page.click(
          "#loginForm > div > div:nth-child(3) > button > div"
        );

        await instagram.page.waitForSelector("[placeholder=Search]", {
          state: "visible"
        });

        await instagram.page.goto(
          `${process.env.NODE_APP_INSTAGRAM_URL}/${process.argv[2]}`,
          {
            waitUntil: ["load", "networkidle2"]
          }
        );
      },

      getProfileInfo: async () => {
        await instagram.page.waitForSelector(".zwlfE", {
          state: "visible"
        });

        dataObj.profileName = await instagram.page.$eval(
          ".nZSzR > ._7UhW9",
          el => el.textContent
        );

        dataObj.profilePhoto = await instagram.page.evaluate(() => {
          const el = document.querySelector("._6q-tv");
          return el.src;
        });

        dataObj.profileInfo = await instagram.page.evaluate(() =>
          Array.from(
            document.querySelectorAll(".-nal3"),
            element => element.textContent
          )
        );

        const postsDataString = dataObj.profileInfo.find(p =>
          p.includes("posts")
        );
        dataObj.imagesCount = parseInt(postsDataString.replace(" posts", ""));
      },

      getImagesUrl: async maxItemsSize => {
        this.maxItemsSize = maxItemsSize;
        let previousHeight;
        const media = new Set();

        while (maxItemsSize == null || media.size < maxItemsSize) {
          previousHeight = await instagram.page.evaluate(
            `document.body.scrollHeight`
          );
          await instagram.page.evaluate(
            `window.scrollTo(0, document.body.scrollHeight)`
          );
          await instagram.page.waitForFunction(
            `document.body.scrollHeight > ${previousHeight}`
          );
          await instagram.page.waitForTimeout(1000);

          const nodes = await instagram.page.evaluate(() => {
            const images = document.querySelectorAll(
              `a > div > div.KL4Bh > img`
            );

            return [].map.call(images, img => img.src);
          });

          nodes.forEach(element => {
            if (media.size < maxItemsSize) {
              media.add(element);
            }
          });
        }
        dataObj.images = Array.from(media);
        instagram.browser.close();
      },

      writeImages: async images => {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();

        const writeImagesCallback = async (url, name) => {
          const viewSource = await page.goto(url);
          await page.waitForTimeout(400);

          fs.writeFile(
            `../client/src/assets/images/${name}.png`,
            await viewSource.buffer(),
            e => {
              if (e) {
                return console.log(e);
              }
            }
          );
        };

        await writeImagesCallback(dataObj.profilePhoto, "profilePhoto");

        for (let i = 0; i < images.length; i++) {
          await writeImagesCallback(images[i], i + 1);
        }

        browser.close();
      }
    };

    await instagram.initialize();
    await instagram.login();
    await instagram.getProfileInfo();
    await instagram.getImagesUrl(dataObj.imagesCount);
    await instagram.writeImages(dataObj.images);

    delete dataObj.images;
    delete dataObj.profilePhoto;

    fs.writeFileSync(
      "../client/src/data/instaScrapeResult.json",
      JSON.stringify(dataObj)
    );

    exec("npm run start:react", e => {
      if (e) {
        return console.log(e);
      }

      console.log("Data scraping finished, running React app.");
    });

    return res.send("Instagram data scraper");
  } catch (err) {
    return res.status(500).send(`Server error: ${err}`);
  }
};
