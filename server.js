const express = require("express");
const exphbs = require("express-handlebars");

const routes = require("./controllers");
const sequelize = require("./config/connection");
const hbs = exphbs.create();

const app = express();

const PORT = process.env.PORT || 3001;

// Set up the session with cookies

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
});
