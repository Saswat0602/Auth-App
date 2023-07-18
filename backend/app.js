const express = require ('express')
const morgan = require ('morgan')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const router = require('./router/route')
const cors = require("cors");

const app = express();



dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(router);



const PORT = 4000;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server is connected on ${PORT}`));
  })
  .catch((error) => console.log(`server not connected :: ${error}`));
