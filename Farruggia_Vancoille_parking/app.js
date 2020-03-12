let express = require("express");
let app = express();
let server = require("http").createServer(app);
let bodyParser = require("body-parser");
let dirname = "C:/xampp5555/htdocs/CC19/";

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://root:root@cluster0-emsxl.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static("/public"));
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//redirection vers la page principale
app.get("/", function(req, res) {
  res.sendFile(dirname + "index.html");
});

app.get("/parking", function(req, res) {
  client.connect(err => {
    const db = client.db("projet_gestion");
    const collection = db.collection("parking");
    collection.find({}).toArray(function(err, docs) {
      res.send(docs);

      console.log(docs);
    });
    client.close();
  });
});
client.connect(err => {
  const db = client.db("projet_gestion");
  const collection = db.collection("parking");
  app.get("/parking", function(req, res) {
    collection.find({}).toArray(function(err, docs) {
      res.send(docs);
    });
  });
});

server.listen(process.env.PORT || 3000);
