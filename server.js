const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { mergePdfs } = require("./testfile");

const upload = multer({ dest: "uploads/" });
const app = express();

const port = 8080;

app.use(cors());
app.use("/static", express.static("public"));

app.post("/upload", upload.array("pdfs", 2), async (req, res, next) => {
  //   res.send({data: req.files});
  try {
    console.log(req.files);
    await mergePdfs(
      path.join(__dirname, req.files[0].path),
      path.join(__dirname, req.files[1].path)
    );
    res.redirect("/download-merged-pdf");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error merging PDFs");
  }
});

app.get("/download-merged-pdf", (req, res) => {
  const mergedPdf = fs.readFileSync("merged.pdf");
  res.contentType("application/pdf");
  res.send(mergedPdf);
});

app.listen(port, () => {
  console.log(`server is running at http://127.0.0.1:${port}`);
});
