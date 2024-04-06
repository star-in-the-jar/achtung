const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("./data"));

app.listen(port, () => {
  console.log(`Express listening ${port}`);
});
