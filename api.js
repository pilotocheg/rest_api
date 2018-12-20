const Express = require("express");
const bodyParser = require("body-parser");
const Debug = require("debug");
const router = require("./router");
const cors = require("./middlewares/cors");
const dbConnect = require("./db/connect");
const errorHandler = require("./middlewares/error_handler");

const debug = Debug("test_api");

const app = new Express();

const PORT = 3000;

app.use(cors);
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

dbConnect.then(() => app.listen(PORT, () => debug("Listen port", PORT)))
  .catch(err => {
    debug(err);
    process.exit(1);
  });
