const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const PORT = 3020;
const url = "https://www.theguardian.com/uk";

axios(url)
  .then((response) => {
    const html = response.data;
    //   console.log(html);
    const $ = cheerio.load(html);
    const articles = [];
    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

const app = express();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
