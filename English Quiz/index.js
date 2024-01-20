const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./Routes/user');
const adminRoutes = require('./Routes/admin');

const port = 3000;
app.set('view engine', 'ejs');
app.use("/libs", express.static("node_modules"));
app.use("/static", express.static("public"));
app.use(userRoutes);
// app.use("/admin",adminRoutes);





app.listen(port, () => {
    console.log("App is listening on " + port);
})