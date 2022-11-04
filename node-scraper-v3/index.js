const PORT = 3015;
const axios = require("axios");
const express = require("express");
const app = express();
const { JSDOM } = require("jsdom");

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const { document } = new JSDOM('<h2 class="title">Hello world</h2>').window;

const heading = document.querySelector(".title");
heading.textContent = "Hello there!";
heading.classList.add("welcome");

heading.innerHTML;
// <h2 class="title welcome">Hello there!</h2>
