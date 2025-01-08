// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  var today = new Date();
  
  res.json({
    unix: today.getTime(),
    utc: new Date(today).toUTCString(),
  });
})

app.get("/api/:date?", (req, res) => {
  if (!req.params.date) {
    var input = new Date()
  }else {
    if (/\D/g.test(req.params.date)) {
      var input = req.params.date;
    } else {
      var input = parseInt(req.params.date);
    }
  }

  unix = new Date(input).getTime();
  utc = new Date(input).toUTCString();

  console.log(req.params.date, "unix:" + unix, "utc:" + utc)

  if (!unix | (utc == "Invalid Date Invalid Date GMT")) {
    res.send({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: unix,
      utc: utc,
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
