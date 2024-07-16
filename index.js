// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function(req,res){
  const crrDate = new Date();
  res.json({unix: crrDate.valueOf(), utc: crrDate.toUTCString()});
})

app.get("/api/:date", function (req, res) {
  const reqDate = req.params.date;
  const unixRegex = /^(\d{13})?$/;
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if(unixRegex.test(reqDate)){
    let convertedDate = new Date(parseInt(reqDate));
    res.json({unix: convertedDate.valueOf(), utc: convertedDate.toUTCString()})
  } else if(dateRegex.test(reqDate)) {
    const convertedDate = new Date(reqDate);
    res.json({unix: convertedDate.valueOf(), utc: convertedDate.toGMTString()})
  }else if (Date.parse(reqDate)){
    const convertedDate = new Date(reqDate);
    res.json({unix: convertedDate.valueOf(), utc: convertedDate.toGMTString()})
  } else if(reqDate == ''){

  }else {
    res.json({ error : "Invalid Date" });
  }

});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
