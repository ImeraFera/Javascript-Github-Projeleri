const express = require('express');
const router = express.Router();

router.use("/admin/", (req, res) => {
    res.render("./admin/index");
});

module.exports = router;