const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();

const PORT = process.env.PORT || 3001;

// Set up the session with cookies

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
});
