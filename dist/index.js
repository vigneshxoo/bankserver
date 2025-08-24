"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const Router_1 = require("./Router/Router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
    secure: true,
});
console.log("Cloudinary configured with cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
// app.use(cors({
//     origin: process.env.FR_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }))
app.use(cors());
app.use(Router_1.router);
app.get('/', (req, res) => {
    return res.send("hello vicky");
});
app.listen(4000, () => {
    console.log("app listion posrt 4000");
});
//# sourceMappingURL=index.js.map