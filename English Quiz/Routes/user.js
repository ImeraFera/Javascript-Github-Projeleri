const express = require('express');
const router = express.Router();
const db = require('../DB/db');


router.get("/sorulariGetir", (req, res) => {
    db.all("SELECT * FROM sorular", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('İç Sunucu Hatası');
        } else {
            res.json(rows);
        }
    });
});


router.get("/resimliSorulariGetir", (req, res) => {
    db.all("SELECT * FROM RIY", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('İç Sunucu Hatası');
        } else {
            res.json(rows);
        }
    });
});


router.use("/resimlerin-ingilizce-yazilisi", (req, res) => {
    res.render("./user/riy");
});


router.use("/dogru-cevabi-bul", (req, res) => {
    res.render("./user/dcb");
});

 



router.use("/", (req, res) => {
    res.render("./user/index");
});

module.exports = router;