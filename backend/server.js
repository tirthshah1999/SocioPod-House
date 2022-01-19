require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes");
const DbConnect = require("./database");
const cors = require('cors');
// React working on 3000 and Node working on 5000 so browser dont do cross site throws cors error so we are handling like this
const corsOption = {
    origin: ['http://localhost:3000'],
};

app.use(cors(corsOption));

const PORT = process.env.PORT || 5500;
DbConnect();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
    res.send("Hello From Express")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})