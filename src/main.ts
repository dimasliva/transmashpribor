
import express from "express";
import fileRouter from "./routes/file.routes.js";
import path from 'path';
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express()
const port:number = 3000

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json())
app.use(fileUpload())
app.use('/api', fileRouter)
app.use(cors());
app.get('/', (req, res) => {
  console.log(path.resolve())
  res.sendFile(path.resolve() + '/src/public/index.html')
})

app.get('/src/public/index.js', (req, res) => {
  console.log(path.resolve())
  res.sendFile(path.resolve() + '/src/public/index.js')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
