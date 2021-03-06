import express, { Request, Response } from 'express';
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import config from "./config/config";
import api from "./routes/api.routes";

const app = express();

/*------------------------------------------------------------------*/
// Settings
/*------------------------------------------------------------------*/

app.set('pkg', require('../package.json'));
app.set("trust proxy", true);
app.set("env", config.ENV);
app.set("port", process.env.PORT || 4000);
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) =>
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase()),
});

/*------------------------------------------------------------------*/
// Middlewares
/*------------------------------------------------------------------*/

if (app.get("env") === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  multer({
    storage,
    dest: path.join(__dirname, "uploads"),
    fileFilter(req, file, cb: Function) {
      var filetypes = /jpeg|jpg|png|gif/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(
        path.extname(file.originalname).toLowerCase(),
      );
      if (mimetype && extname) return cb(null, true);
      cb(`Error: File upload only supports the following filetypes - ${filetypes}`);
    },
    limits: { fileSize: 1000000 },
  }).single("image"),
);

/*------------------------------------------------------------------*/
// Routes
/*------------------------------------------------------------------*/

app.get('/', (req: Request, res: Response) => res.json({
  name: app.get('pkg').name,
  version: app.get('pkg').version,
  author: app.get('pkg').author,
  contributors: app.get('pkg').contributors,
  deprecated: app.get('pkg').deprecated,
}));

app.use("/api", api);

/*------------------------------------------------------------------*/

export default app;
