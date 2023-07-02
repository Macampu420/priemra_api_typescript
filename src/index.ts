import express, { urlencoded } from "express";
import pool from "./conexion";

// routes importing
import router from "./routes/index";

const port = 3000;
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes settings
app.use('/api', router);

app.listen(port, () => console.log(`app running on port ${port}`));
