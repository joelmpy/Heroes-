// Importation de mes modules //
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { response } = require("express");
// Importation de mes modules //

// Application de ma base de données //
const app = express();
const port = 3006;
mongoose.connect("mongodb://localhost:27017/marvel");

app.use(cors());
app.use(morgan());
app.use(express.json());

// Creation de mon schema pour ma base de données //
const HeroSchema = mongoose.Schema({
  slug: String,
  name: String,
  power: [String],
  color: String,
  isAlive: Boolean,
  age: Number,
  image: String,
});

// Creation de mon model pour ma base de données et transmettre les information //
const HeroModel = mongoose.model("Marvel", HeroSchema);

// vERIFICATION DE MA PAGE //
app.get("/", function (req, res) {
  res.send("bonjour a tous");
});

// premier chemin de ma page // 
app.get("/heroes", function (req, res, next) {
  HeroModel.find({})
    .exec()
    .then(function (responseList) {
      res.json(responseList);
    });
});

// Deuxieme chemin de ma page pour recuperer un hero //
app.get("/heroes/:slug", function (req, res , next) {
        const slug = req.params.slug
        HeroModel.findOne({
            slug : slug
        }).exec()
            .then(function (oneHeros) {
                // console.log('un seul heros ici ====> ', oneHeros);
                res.json(oneHeros)
            })
})

// Troiseme chemin de ma page pour recuperer les pouvoir selon //

app.get("/heroes/:slug/powers", function (req, res, next) {
    const slug = req.params.slug
    HeroModel.find({slug})
    .exec()
        .then( function (powerHeros) {
             console.log('un seul pouvoir ====> ', powerHeros);
             res.json(powerHeros[0].power);

        })
})


















// HeroModel.insertMany([
//     {
// 		slug: "iron-man",
//         name: "Iron Man",
//         power: ["money"],
//         color: "red",
//         isAlive: true,
//         age: 46,
//         image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
//     },
//     {
// 		slug: "thor",
//         name: "Thor",
//         power: ["electricty", "worthy"],
//         color: "blue",
//         isAlive: true,
//         age: 300,
//         image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
//     },
//     {
// 		slug: "dardevil",
//         name: "Daredevil",
//         power: ["blind"],
//         color: "red",
//         isAlive: false,
//         age: 30,
//         image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
//     }
// ])

// le localhost 3006 //
app.listen(port, function () {
  console.log("mon port fonctionne", port);
});
