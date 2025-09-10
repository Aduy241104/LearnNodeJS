const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars"); // <-- IMPORT ĐÚNG CÁCH
const path = require('path');
const errorHandler = require('./middlewares/error/errorHandlingMiddleware');
// const connectDB = require("./config/index")

const connectMongose = require("./config/connectTest")
connectMongose();

const app = express();
require("dotenv").config();
const route = require("./routes/index");

app.use(express.json());
route(app);

app.use(errorHandler);

app.use(morgan("combined"));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
