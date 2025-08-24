import * as express from "express";
import { Request, Response, Application } from "express";
import bodyParser = require("body-parser");
import { router } from "./Router/Router";
import cookieParser = require("cookie-parser");
import * as cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
    secure: true,
});

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
console.log("Cloudinary configured with cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
const app: Application = express();
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
app.use(cors())
app.use(router);

app.get('/', (req: Request, res: Response) => {
    return res.send("hello vicky");

})

app.listen(4000, () => {
    console.log("app listion posrt 4000")
})