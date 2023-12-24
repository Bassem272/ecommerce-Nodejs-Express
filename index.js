import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cors from "cors";
import connectToDatabase from "./db.js";
import dotenv from "dotenv"; // Import dotenv
import user from "./routes/user.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDatabase();

app.use('/api/user',user);
app.use('/api/product',product);
app.use('/api/admin',admin);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// app.use(express.static(path.join(__dirname, 'public')));
