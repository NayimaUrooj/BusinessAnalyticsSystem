import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import User from "./models/User.js";
import {dataUser} from "./data/index.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import {dataProduct} from "./data/index.js";
import {dataProductStat, dataTransaction, dataOverallStat} from "./data/index.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";


dotenv.config();
const app = express();
app.use(express.json());

const passport = require('passport');
const session = require('express-session');
app.use(helmet());                   
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); 
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    //User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    //  ProductStat.insertMany(dataProductStat);
    // //Transaction.insertMany(dataTransaction);
    //  OverallStat.insertMany(dataOverallStat);


  })
  .catch((error) => console.log(`${error} did not connect`));
