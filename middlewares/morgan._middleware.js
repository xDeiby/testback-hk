const morgan = require("morgan");

morgan.token("type", (req, res) => req.headers["content-type"]);
morgan.token("body", (req, res) => JSON.stringify(req.body));

module.exports = morgan((tokens, req, res) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens.type(req, res),
    tokens.body(req, res),
  ].join(" ")
);
