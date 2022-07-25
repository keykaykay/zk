import { resolve } from "path";
import { existsSync, mkdir } from "fs-extra";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/date", async (req, res) => {
  res.status(200).json({
    time: Date.now(),
  });
});

app.post("/upload", async (req: any, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "没有文件上传" });
    }

    const savePath = resolve(__dirname, "./uploads");
    const jsonPath = resolve(__dirname, "./datas");

    if (!existsSync(savePath)) {
      await mkdir(savePath);
    }
    if (!existsSync(jsonPath)) {
      await mkdir(jsonPath);
    }
    const file = req.files.file;
    const fileName = req.body.name;
    file.mv(`${__dirname}/uploads/${fileName}`, async (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      const jsonSavePath = `${fileName.slice(
        0,
        fileName.lastIndexOf(".")
      )}.json`;
      res.json({ fileName: fileName, filePath: `/datas/${jsonSavePath}` });
    });
  } catch (error) {
    res.status(400).json({ msg: "错误" });
  }
});

const port = 6666;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
