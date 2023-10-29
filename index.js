const express = require('express');
const path = require("path");
const queries = require("./model/queries")

// Initialize express app and port number
const server = express();
const port = 8081;
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Allow public directory to be accessible by the client.
server.use(express.static(path.join(__dirname, "public")));
// Configure pug for template rendering
server.set('views', path.join(__dirname, "public/pages"));
server.set("view engine", "pug")

// Page Endpoints
server.get("/", (_, res) => {
  data = {nextUrl: '/', count: 0};
  queries.selectUnclaimed()
  .then(unclaimedGifts => {

    if (Object.keys(unclaimedGifts).length == 0) { //if unclaimedGifts is empty
      data.nextUrl = "/claimed/";
    } else {
      data.nextUrl = '/gift/' + unclaimedGifts[Math.floor(Math.random() * unclaimedGifts.length)]["id"];
    }

    queries.countClaimed()
    .then(count => {
      data.count = count;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      res.render("index", data);
    })
  })
  .catch(err => {
    console.log(err);
    res.render("index", data);
  })
});

server.get("/contribute/", (_, res) => {
  res.sendFile(__dirname + "/public/pages/contribute.html");
});

server.get("/claimed/", (_, res) => {
  res.sendFile(__dirname + "/public/pages/all_claimed.html");
});

function renderGift(id, res) {
  queries.select(id)
  .then(gift => {
    queries.selectUnclaimed(exclude=id)
    .then(unclaimedGifts => {
      if (Object.keys(unclaimedGifts).length == 0) { //if unclaimedGifts is empty
        gift.nextUrl = "/claimed/";
      } else {
        gift.nextUrl = '/gift/' + unclaimedGifts[Math.floor(Math.random() * unclaimedGifts.length)]["id"];
      }
    })
    .catch(err => {
      console.log(err);
      gift.nextUrl = '/'
    })
    .finally(() => {
      if (gift["venmo"] != null) {
        res.render("claimed", gift);
      } else {
        res.render("gift", gift);
      }
    })
  })
  .catch(err => {
    console.log(err);
    //TODO: add error page
  })
}

server.get("/gift/:id", (req, res) => {
  renderGift(req.params.id, res);
});

server.post("/gift/:id", (req, res) => {
  queries.update(req.params.id, req.body)
  renderGift(req.params.id, res);
});

// REST Endpoints (Temp)
// gift/id
server.get("/api/gift/:id", (req, res) => {
  queries.select(req.params.id)
  .then(gift => {
    res.status(200).json(gift);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "Query select failed. GET /api/gift/"+req.params.id});
  })
});

server.patch("/api/gift/:id", (req, res) => {
  queries.update(req.params.id, req.body)
  .then(gift => {
    if (gift) {
      res.status(204).json();
    } else {
      res.status(404).json({message: "Record not found. PATCH /api/gift/"+req.params.id});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "Query update failed. PATCH /api/gift/"+req.params.id});
  })
});

server.delete("/api/gift/:id", (req, res) => {
  queries.del(req.params.id)
  .then(_ => {
    res.status(204).json();
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "Query del failed. DELETE /api/gift/"+req.params.id});
  })
});

// gift
server.post("/api/gift", (req, res) => {
  queries.create(req.body)
  .then(gift => {
    res.status(200).json(gift);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "Query create failed. POST /api/gift"});
  })
});

server.get("/api/gift", (_, res) => {
  queries.selectAll()
  .then(gifts => {
    res.status(200).json(gifts);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "Query selectAll failed. GET /api/gift"});
  })
});

server.delete("/api/gift", (_, res) => {
  queries.truncate()
  .then(_ => {
    res.status(204).json();
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "Query truncate failed. DELETE /api/gift"});
  })
});

// Start server.
server.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});